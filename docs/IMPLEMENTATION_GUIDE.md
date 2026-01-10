# 🛡️ Guide d'Implémentation des Mesures de Sécurité

Basé sur le rapport [SECURITY.md](./SECURITY.md), voici comment implémenter rapidement les protections recommandées.

## ⏱️ Timeline Recommandée

### Jour 1: Critiques (1-2h)

#### ✅ P0: SIRET Rate Limiting
**Fichier:** `app/api/generate/route.ts`

Remplacer la fonction `extractSirets` (ligne 34-55):

```typescript
const MAX_SIRETS_PER_REQUEST = 10;

// Regex validant un SIRET
const isValidSiret = (siret: string): boolean => {
  const cleaned = siret.replace(/[\s.]/g, '');
  if (!/^\d{14}$/.test(cleaned)) return false;
  
  // Validation Luhn
  let sum = 0, alt = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let n = parseInt(cleaned[i], 10);
    if (alt) n *= 2;
    if (n > 9) n -= 9;
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
};

function extractSiretsSecure(text: string): string[] {
  const sirets = new Set<string>();
  const siretRegex = /\b(\d{3}[\s.]?\d{3}[\s.]?\d{3}[\s.]?\d{5})\b/g;
  
  let match;
  while ((match = siretRegex.exec(text)) !== null) {
    const cleaned = match[0].replace(/[\s.]/g, '');
    if (isValidSiret(cleaned)) {
      sirets.add(cleaned);
    }
  }
  
  return Array.from(sirets).slice(0, MAX_SIRETS_PER_REQUEST);
}
```

Puis remplacer l'utilisation (ligne 406):
```typescript
const foundSirets = extractSiretsSecure(combinedText);
```

---

### Semaine 1: Importants (2-3h)

#### ✅ P1: Rate Limiting par IP

**Installation:**
```bash
npm install rate-limiter-flexible
```

**Implémentation:** Ajouter à `app/api/generate/route.ts` (après imports):

```typescript
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60, // 10 requests per minute
});

export async function POST(request: NextRequest) {
  // ... existing code ...
  
  // Add this after line 345 (after parsing JSON)
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
  try {
    await rateLimiter.consume(clientIp);
  } catch (rateLimiterRes) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Max 10 requests per minute.' },
      { status: 429 }
    );
  }
  
  // ... rest of code ...
}
```

---

#### ✅ P2: Jailbreak Pattern Detection

**Ajouter après rate limiting:**

```typescript
// Input validation & jailbreak detection
if (userContent.length > 50000) {
  return NextResponse.json(
    { error: 'Input too large. Max 50KB.' },
    { status: 400 }
  );
}

const jailbreakPatterns = [
  /ignore.*instructions/gi,
  /forget.*system/gi,
  /new instructions/gi,
  /override.*prompt/gi,
];

for (const pattern of jailbreakPatterns) {
  if (pattern.test(userContent)) {
    console.warn('⚠️ Potential jailbreak detected:', pattern);
    // Log for monitoring - continue processing normally
    // LLM will handle the rest
  }
}
```

---

#### ✅ P2b: URL Validation

**Ajouter function avant POST:**

```typescript
function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    
    if (!['http:', 'https:'].includes(url.protocol)) return false;
    
    const hostname = url.hostname;
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.')
    ) {
      console.warn('⚠️ SSRF attempt detected:', hostname);
      return false;
    }
    
    if (urlString.length > 2048) return false;
    
    return true;
  } catch (error) {
    return false;
  }
}
```

**Utilisation (ligne 375):**

```typescript
if ((toolId === 'legal-analyzer' || toolId === 'tech-stack-modernizer') && 
    (userContent.startsWith('http://') || userContent.startsWith('https://'))) {
  
  if (!isValidUrl(userContent)) {
    return NextResponse.json(
      { error: 'Invalid or unsafe URL provided' },
      { status: 400 }
    );
  }
  
  // ... continue scraping ...
}
```

---

### Semaine 2: Nice-to-Have (3-4h)

#### ✅ P3: Logging & Monitoring

**Ajouter simple logger:**

```typescript
interface SecurityLog {
  timestamp: Date;
  toolId: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  event: string;
}

const securityLogs: SecurityLog[] = [];

function logSecurityEvent(
  toolId: string,
  event: string,
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
) {
  const log: SecurityLog = {
    timestamp: new Date(),
    toolId,
    riskLevel,
    event,
  };
  
  securityLogs.push(log);
  
  if (riskLevel === 'HIGH') {
    console.error('🚨 SECURITY ALERT:', log);
  }
}

// Usage examples:
logSecurityEvent('legal-analyzer', 'SIRET count limited to 10', 'LOW');
logSecurityEvent('legal-analyzer', 'Jailbreak pattern detected', 'MEDIUM');
logSecurityEvent('api', 'Rate limit exceeded', 'HIGH');
```

---

## 📊 Avant/Après

### Avant (Vulnérable)
```
100 SIRETs injectés → 100 requêtes API Gouv → Potentiel DDOS
```

### Après (Protégé)
```
100 SIRETs injectés → Validation → Max 10 SIRETs conservés → 10 requêtes API
```

---

## ✅ Checklist de Vérification

Après implémentation, vérifier:

- [ ] P0 implémenté: SIRET validés + limités à 10
- [ ] P1 implémenté: Rate limiting par IP (10/min)
- [ ] P2 implémenté: Jailbreak detection + URL validation
- [ ] P3 implémenté: Logging des événements de sécurité
- [ ] Tests manuels: Relire [SECURITY.md](./SECURITY.md) Test 3 (SIRET DDOS)
- [ ] Documentation: Mettre à jour README avec mention de sécurité

---

## 🧪 Tests d'Injection à Refaire

Après implémentation, tester ces scénarios:

### Test 3 Revisité: SIRET DDOS (Devrait être bloqué)

```javascript
// Avant: 100 SIRETs → 100 requêtes API
// Après: 100 SIRETs → validés → max 10 → 10 requêtes API
```

✅ **Résultat attendu:** Seulement 10 premières requêtes API exécutées

---

## 📞 Support

Si bloqué:
1. Voir [SECURITY.md](./SECURITY.md) pour context complet
2. Tester localement: `npm run dev`
3. Vérifier les logs: `console.warn()` / `console.error()`

---

**Temps total estimé: 1-2 jours pour P0-P2**  
**Résultat: Application sécurisée pour production légère**
