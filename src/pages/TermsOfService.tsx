import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, CreditCard, Dumbbell, ShieldAlert } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-6 block font-bold">Agreement</span>
          <h1 className="font-display text-6xl md:text-8xl uppercase tracking-tight mb-12">Terms of Service</h1>
          
          <div className="space-y-12 text-paper/60 font-light text-lg leading-relaxed">
            <section className="glass p-8 md:p-12 rounded-[2.5rem] border-brand/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center text-brand">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h2 className="font-display text-4xl uppercase text-white">1. Membership & Subscription</h2>
              </div>
              <p className="font-bold text-brand mb-4 uppercase tracking-widest underline decoration-2 underline-offset-8">
                Strict Non-Refundable Policy
              </p>
              <div className="space-y-6">
                <p>
                  By enrolling as a member of THE GYM CULTURE, you enter into a binding financial agreement. We take our operational planning seriously, and our facilities are maintained based on active membership counts. Therefore:
                </p>
                <ul className="list-disc pl-6 space-y-4 font-medium text-white/80">
                  <li><strong>Final Sale:</strong> All payments made for gym memberships, guest passes, personal training, and merchandise are final upon execution.</li>
                  <li><strong>No Refunds:</strong> We do not offer full or partial refunds for any reason, including relocation (unless it is to a city where THE GYM CULTURE has no presence, subject to branch manager approval and processing fees), physical injury, or personal time constraints.</li>
                  <li><strong>Non-Transferable:</strong> Memberships are personal and cannot be transferred to another individual, sold, or gifted without explicit written consent from the brand management and payment of a transfer fee.</li>
                </ul>
                <p className="p-4 bg-white/5 border-l-2 border-brand text-sm italic">
                  Note: In the event of a branch closure or significant renovation lasting more than 30 days, memberships will be automatically paused and extended by the duration of the closure.
                </p>
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-brand">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <h2 className="font-display text-3xl uppercase text-white">2. Facility Usage & Professional Conduct</h2>
              </div>
              <p>
                To maintain the high-performance environment that THE GYM CULTURE is known for, members must adhere to the following code of conduct:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-8 glass rounded-3xl space-y-4">
                  <h3 className="text-white font-bold uppercase tracking-tight">Access & Security</h3>
                  <p className="text-sm">Entry is permitted only via valid RFID tag or registered biometric data. Tailgating (letting someone else in) or sharing your access credentials will result in immediate permanent ban without refund. CCTV is 24/7 active.</p>
                </div>
                <div className="p-8 glass rounded-3xl space-y-4">
                  <h3 className="text-white font-bold uppercase tracking-tight">Attire & Hygiene</h3>
                  <p className="text-sm">Proper athletic footwear (clean soles) and fitness clothing are mandatory. Street clothes, jeans, or sandals are strictly forbidden on the workout floor. A personal gym towel is required for every session.</p>
                </div>
                <div className="p-8 glass rounded-3xl space-y-4">
                  <h3 className="text-white font-bold uppercase tracking-tight">Equipment Ethics</h3>
                  <p className="text-sm">Weights must be re-racked after use. Dropping dumbbells or excessive plate-clapping is prohibited. Members found damaging equipment through negligence will be held liable for replacement costs.</p>
                </div>
                <div className="p-8 glass rounded-3xl space-y-4">
                  <h3 className="text-white font-bold uppercase tracking-tight">Personal Grooming</h3>
                  <p className="text-sm">Personal hygiene must be maintained. Strong colognes or offensive body odors that disturb others are not allowed. Shaving or other such activities in the showers/locker rooms is prohibited.</p>
                </div>
              </div>
            </section>

            <section className="glass p-8 md:p-12 rounded-[2.5rem] border-red-500/20 bg-red-500/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h2 className="font-display text-4xl uppercase text-white">3. Total Release of Liability</h2>
              </div>
              <p className="font-display text-xl text-white mb-6 uppercase tracking-widest leading-relaxed p-6 border border-red-500/30 rounded-2xl">
                ASSUMPTION OF RISK, WAIVER, AND INDEMNITY AGREEMENT
              </p>
              <div className="space-y-6 text-paper/80">
                <p>
                  Fitness training, by its nature, involves significant physical exertion and use of specialized equipment. Participation in THE GYM CULTURE activities involves risks that include, but are not limited to, muscular strains, sprains, fractures, cardiac events, strokes, and even death.
                </p>
                <div className="p-8 bg-ink rounded-3xl border-l-4 border-red-600 space-y-4 shadow-xl shadow-black/50">
                  <p className="text-white font-bold text-lg uppercase leading-relaxed">
                    "THE MEMBER HEREBY KNOWINGLY AND VOLUNTARILY ASSUMES ALL RISK OF INJURY, ILLNESS, OR DEATH OCCURRING WHILE USING THE GYM FACILITIES."
                  </p>
                  <p className="text-sm italic">
                    By entering our premises, you agree that THE GYM CULTURE (including its Parent Company, Franchise Owners, Partners, Directors, Employees, and Trainers) shall NOT be liable for any injury, loss, damage, or death sustained by you or any third party on our premises, regardless of whether such incident arises from the use of equipment, participation in a programmed class, or the negligence of the staff.
                  </p>
                </div>
                <p>
                  Members agree to indemnify and hold harmless THE GYM CULTURE against any and all claims, actions, suits, or procedures that may be brought against the gym by any third party as a result of the member's actions orpresence inside the facility.
                </p>
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="font-display text-3xl uppercase text-white">4. Health Warranty & Medical Disclaimer</h2>
              <p>
                You represent that you are in good physical condition and have no medical reason or impairment that prevents you from participating in active or passive exercise. 
              </p>
              <div className="p-8 glass rounded-[2rem] space-y-4 border-white/5">
                <ul className="list-disc pl-6 space-y-4">
                  <li><strong>Medical Consultation:</strong> We strongly recommend that all members consult with a qualified physician before starting any training regime or using our facilities.</li>
                  <li><strong>Duty to Disclose:</strong> If your health condition changes (e.g., pregnancy, new cardiac diagnosis) during your membership, you are legally obligated to inform our staff immediately.</li>
                  <li><strong>Emergency Consent:</strong> In the event of a medical emergency on-site, you authorize THE GYM CULTURE staff to call for paramedical assistance at your own expense.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="font-display text-3xl uppercase text-white">5. Personal Property & Valuables</h2>
              <p>
                While we provide digital and manual lockers for your convenience during your workout, THE GYM CULTURE is not responsible for the loss, theft, or damage of personal property. 
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>Lockers must be cleared at the end of every session. Overnight storage is not permitted.</li>
                <li>Items left in lockers overnight will be removed and kept in lost & found for 48 hours only.</li>
                <li>Valuables (Cash, Jewelry, Electronics) should not be brought to the gym.</li>
              </ul>
            </section>

            <section className="space-y-8">
              <h2 className="font-display text-3xl uppercase text-white">6. Right to Terminate</h2>
              <p>
                Management reserves the absolute right to cancel or suspend a membership without refund for the following reasons:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>Harassment or unprofessional behavior toward staff or other members.</li>
                <li>Damage to gym property through reckless usage.</li>
                <li>Providing external coaching or business services inside THE GYM CULTURE premises without a partnership contract.</li>
                <li>Violation of branch-specific rules or timings.</li>
              </ul>
            </section>

            <section className="space-y-8 glass p-10 rounded-[2.5rem] border-white/5 bg-white/5">
              <h2 className="font-display text-3xl uppercase text-white">7. Governing Law</h2>
              <p>
                This agreement and the relationship between the member and THE GYM CULTURE shall be governed by the laws of India and the jurisdiction of the courts in Mumbai, Maharashtra.
              </p>
            </section>

            <div className="pt-12 border-t border-white/5 text-sm">
              <p className="mb-2">Last Updated: April 2026</p>
              <p className="text-paper/40">By proceeding to use THE GYM CULTURE services, you acknowledge that you have read, understood, and agreed to all detailed Clauses of our Terms of Service.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
