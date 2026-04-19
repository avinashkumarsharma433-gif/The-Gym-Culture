import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, Share2 } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-6 block font-bold">Legal</span>
          <h1 className="font-display text-6xl md:text-8xl uppercase tracking-tight mb-12">Privacy Policy</h1>
          
          <div className="space-y-12 text-paper/60 font-light text-lg leading-relaxed">
            <section className="glass p-8 md:p-12 rounded-[2.5rem]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="font-display text-4xl uppercase text-white">1. Introduction & Commitment</h2>
              </div>
              <p className="mb-6">
                Welcome to THE GYM CULTURE. We value your presence in our community and understand that you trust us with your personal information. This Privacy Policy is designed to explain, in the most transparent way possible, how we collect, store, use, and protect your data. Our commitment is simple: your privacy is a fundamental right, and we treat your information with the same respect and discipline we bring to our training floors.
              </p>
              <p>
                By enrolling in a membership, visiting our website, or using our mobile services, you consent to the practices described in this document. We have crafted this guide to ensure that every member of the THE GYM CULTURE family feels secure and informed.
              </p>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-brand">
                  <Eye className="w-5 h-5" />
                </div>
                <h2 className="font-display text-3xl uppercase text-white">2. Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">A. Personal Identification Information</h3>
                <p>
                  To manage your account effectively and ensure safety, we collect:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>Contact Details:</strong> Full name, verified email address, permanent and current residential addresses, and primary/secondary phone numbers.</li>
                  <li><strong>Aadhar/ID Verification:</strong> We may require a copy of a government-issued identification card to verify age and identity for insurance and security purposes.</li>
                  <li><strong>Biometric Data:</strong> In some branches, fingerprint or facial recognition data is used strictly for secure facility access control. This data is encrypted and stored locally on secure hardware.</li>
                </ul>

                <h3 className="text-xl font-bold text-white uppercase tracking-wider">B. Health & Fitness Data</h3>
                <p>
                  Because your safety is paramount, we collect information regarding:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>Medical History:</strong> Pre-existing conditions, allergies, cardiovascular health history, and recent surgeries.</li>
                  <li><strong>Body Metrics:</strong> BMI, body fat percentage, muscular weight, and metabolic rate (collected through our advanced bio-impedance scanners).</li>
                  <li><strong>Training Progress:</strong> Exercise logs, personal bests, and workout frequencies to help tailor your fitness journey.</li>
                </ul>

                <h3 className="text-xl font-bold text-white uppercase tracking-wider">C. Financial Information</h3>
                <p>
                  For subscription management:
                </p>
                <ul className="list-disc pl-6 space-y-3">
                  <li><strong>Payment Tokens:</strong> We do not store raw credit card numbers. All payments are processed via PCI-DSS compliant third-party gateways. We only store anonymized tokens for recurring billings.</li>
                  <li><strong>Transaction History:</strong> Logs of all payments, renewals, and product purchases within our facilities.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-brand">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="font-display text-3xl uppercase text-white">3. How We Use Your Data</h2>
              </div>
              
              <div className="space-y-6">
                <p>
                  THE GYM CULTURE utilizes your information for multi-faceted operational requirements:
                </p>
                <ul className="space-y-6">
                  <li className="p-6 glass rounded-2xl">
                    <span className="block text-white font-bold mb-2 uppercase tracking-tight">Service Optimization</span>
                    Your check-in data helps us understand peak hours at different branches (like Borivali or Orlem). We use this to adjust staff schedules, maintenance routines, and ensure you never have to wait too long for a squat rack.
                  </li>
                  <li className="p-6 glass rounded-2xl">
                    <span className="block text-white font-bold mb-2 uppercase tracking-tight">Personalization & Growth</span>
                    By analyzing your fitness data, our AI-driven systems and certified trainers can suggest specific programs (like HIIT Blast or Elite Strength) that align with your current progress and metabolic needs.
                  </li>
                  <li className="p-6 glass rounded-2xl bg-brand/5 border-brand/20">
                    <span className="block text-brand font-bold mb-2 uppercase tracking-tight font-display text-xl">Marketing Commitment</span>
                    We use your contact data to send you news about THE GYM CULTURE—exclusive offers, branch inaugurations, and motivational content. We believe in high-value communication, not spam.
                  </li>
                </ul>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-brand">
                  <Share2 className="w-5 h-5" />
                </div>
                <h2 className="font-display text-3xl uppercase text-white">4. Zero-Sharing Policy & Security</h2>
              </div>
              
              <div className="space-y-8">
                <div className="p-10 border-2 border-brand/40 bg-ink rounded-[3rem]">
                  <p className="text-white text-2xl font-display uppercase tracking-widest leading-relaxed mb-6">
                    "WE DO NOT SELL, RENT, OR TRADE YOUR PERSONAL DATA TO THIRD PARTIES."
                  </p>
                  <p className="text-paper/60 font-light">
                    This is our non-negotiable vow. Unlike many tech-driven industries, THE GYM CULTURE operates on a closed-circuit data model. Your information is never shared with external advertisers, data brokers, or non-affiliated corporate partners. The only exception is if forced by legal subpoena from a recognized government authority, in which case we will follow strict legal protocols.
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">A. Technical Safeguards</h3>
                  <p>
                    All digital data is encrypted using AES-256 bit encryption at rest and TLS 1.3 for data in transit. Our servers are hosted in high-security data centers with biometric access control and 24/7 surveillance.
                  </p>
                  
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">B. Physical Safeguards</h3>
                  <p>
                    Manual forms and physical membership records are kept in locked fire-proof cabinets accessible only by authorized branch managers.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="font-display text-3xl uppercase text-white">5. User Rights & Data Retention</h2>
              <p>
                As a THE GYM CULTURE member, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-4">
                <li><strong>Access:</strong> Request a full copy of the data we hold about you.</li>
                <li><strong>Rectification:</strong> Correction of any inaccurate personal details or health metrics.</li>
                <li><strong>Erasure:</strong> Request the deletion of your account (subject to active contract status).</li>
                <li><strong>Opt-out:</strong> You can unsubscribe from our marketing emails at any time via the link provided in the footer of our newsletters.</li>
              </ul>
              <p>
                We retain your data for as long as your membership is active plus 5 years for legal and audit compliance in India. Anonymous metabolic data may be retained indefinitely for statistical research and brand improvement.
              </p>
            </section>

            <section className="space-y-8">
              <h2 className="font-display text-3xl uppercase text-white">6. Cookies & Digital Tracking</h2>
              <p>
                Our website uses minimal cookies to enhance your experience. These cookies remember your branch preferences and login state. We do not use third-party tracking pixels to follow you across other websites. Our digital footprint is clean, focused solely on your fitness journey within our ecosystem.
              </p>
            </section>

            <section className="space-y-8">
              <h2 className="font-display text-3xl uppercase text-white">7. Changes to this Policy</h2>
              <p>
                THE GYM CULTURE reserves the right to update this policy as we grow and adopt new technologies. We will notify all members via email 30 days before any significant changes take effect.
              </p>
            </section>

            <section className="space-y-8 glass p-10 rounded-[2.5rem] border-brand/10">
              <h2 className="font-display text-3xl uppercase text-white">8. Contact Us</h2>
              <p>
                If you have concerns about your privacy or wish to report a data issue, please reach out to our dedicated Data Protection Officer:
              </p>
              <div className="p-6 glass bg-white/5 rounded-2xl">
                <p className="font-mono text-brand font-bold mb-2">Email: privacy@thegymculture.in</p>
                <p className="font-mono text-paper/40 text-sm">Corporate Office: Orlem Malad West, Mumbai, Maharashtra.</p>
              </div>
            </section>

            <div className="pt-12 border-t border-white/5 text-sm">
              <p>Last Updated: April 2026</p>
              <p>If you have any questions regarding our privacy practices, please contact us at privacy@thegymculture.in</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
