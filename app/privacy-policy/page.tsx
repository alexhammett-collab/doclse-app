import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pt-[88px] pb-12">
      <h1 className="text-4xl font-black text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-gray-400 text-sm mb-8">Last updated: January 2025</p>
      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Who We Are</h2>
          <p>Ducati Official Club London &amp; South East (DOCLSE) is a motorcycle club based at Arch 70, Albert Embankment, London SE1 7TP. We can be contacted at info@doclse.club.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. What Data We Collect</h2>
          <p>We collect information you provide when registering, purchasing membership, completing a ride waiver, or contacting us. This includes your name, email address, date of birth, emergency contact details, and payment information (processed securely — we do not store card details).</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Data</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To manage your club membership</li>
            <li>To communicate about events, news and club activities</li>
            <li>To process payments and send receipts</li>
            <li>To maintain ride waiver records for safety purposes</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Sharing</h2>
          <p>We do not sell your personal data. We may share data with payment processors and email service providers solely to operate club services. We may share aggregated anonymised data with our sponsor, Ducati London.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at info@doclse.club.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cookies</h2>
          <p>Our website uses essential cookies to maintain your session and preferences. No third-party advertising cookies are used.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact</h2>
          <p>For any privacy-related queries, email us at <a href="mailto:info@doclse.club" className="text-[#cc0000] hover:underline">info@doclse.club</a>.</p>
        </section>
      </div>
    </div>
  );
}
