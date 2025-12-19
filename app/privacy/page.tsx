"use client";

import { Axe, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-brand-black text-gray-300 font-sans selection:bg-brand-red selection:text-white">
      {/* Marble Texture Overlay */}
      <div className="marble-overlay fixed inset-0 z-50 mix-blend-overlay pointer-events-none"></div>

      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-brand-black/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
                <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
                    <ChevronLeft className="w-6 h-6 text-brand-red group-hover:-translate-x-1 transition-transform" />
                    <span className="font-serif font-bold text-xl tracking-wider text-white">BACK TO HOME</span>
                </Link>
                <div className="flex items-center gap-2">
                    <Axe className="w-6 h-6 text-brand-brightRed" />
                    <span className="font-serif font-bold text-xl tracking-wider text-white hidden sm:block">IRON <span className="text-brand-brightRed">CLEAVER</span></span>
                </div>
            </div>
        </div>
      </nav>

      {/* Header Image */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <Image 
            src="https://picsum.photos/1920/600?grayscale"
            alt="Privacy Policy Header"
            fill
            className="object-cover opacity-50"
            priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
            <div className="max-w-4xl mx-auto">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-serif text-4xl md:text-6xl font-bold text-white mb-4"
                >
                    Privacy Policy
                </motion.h1>
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: 100 }}
                    className="h-1 bg-brand-red"
                ></motion.div>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="prose prose-invert prose-lg max-w-none">
            <p className="lead text-xl text-gray-400 mb-8">
                At Iron Cleaver, we respect your privacy as much as we respect the craft of butchery. This policy outlines how we handle your personal information.
            </p>

            <h3 className="text-white font-serif text-2xl mt-12 mb-6">1. Information We Collect</h3>
            <p>
                We collect information you provide directly to us, such as when you create an account, place an order, subscribe to our newsletter, or contact us for support. This may include your name, email address, shipping address, and payment information.
            </p>

            <h3 className="text-white font-serif text-2xl mt-12 mb-6">2. How We Use Your Information</h3>
            <p>
                We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Process your orders and send you order confirmations.</li>
                <li>Communicate with you about products, services, and promotions.</li>
                <li>Improve our website and customer service.</li>
                <li>Detect and prevent fraud.</li>
            </ul>

            <h3 className="text-white font-serif text-2xl mt-12 mb-6">3. Sharing of Information</h3>
            <p>
                We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf, such as payment processing and shipping.
            </p>

            <h3 className="text-white font-serif text-2xl mt-12 mb-6">4. Data Security</h3>
            <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
            </p>

            <h3 className="text-white font-serif text-2xl mt-12 mb-6">5. Contact Us</h3>
            <p>
                If you have any questions about this Privacy Policy, please contact us at <span className="text-brand-orange">privacy@ironcleaver.com</span>.
            </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-brand-black pt-16 pb-8 border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-600 text-xs">&copy; 2024 Iron Cleaver Butchery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
