"use client";

import { Axe, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TermsOfService() {
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
            src="https://picsum.photos/1920/600?blur=2"
            alt="Terms Header"
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
                    Terms of Service
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
                Welcome to Iron Cleaver. By accessing our website and purchasing our products, you agree to be bound by these Terms of Service.
            </p>

            <h3 className="text-white font-serif text-2xl mt-12 mb-6">1. General Conditions</h3>
            <p>
                We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.
            </p>

            <h3 className="text-white font-serif text-2xl mt-12 mb-6">2. Products and Pricing</h3>
            <p>
                Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
            </p>

            <h3 className="text-white font-serif text-2xl mt-12 mb-6">3. Accuracy of Billing and Account Information</h3>
            <p>
                We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address.
            </p>

            <h3 className="text-white font-serif text-2xl mt-12 mb-6">4. Governing Law</h3>
            <p>
                These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the State of Illinois.
            </p>

            <h3 className="text-white font-serif text-2xl mt-12 mb-6">5. Changes to Terms of Service</h3>
            <p>
                You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website.
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
