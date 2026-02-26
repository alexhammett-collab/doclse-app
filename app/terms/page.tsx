import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black text-gray-900 mb-2">Terms &amp; Conditions</h1>
      <p className="text-gray-400 text-sm mb-8">Last updated: January 2025</p>
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Membership</h2>
          <p>Membership of DOCLSE is open to anyone with a passion for Ducati motorcycles. By registering, you agree to abide by our club rules and code of conduct. Membership fees are non-refundable.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Ride Participation</h2>
          <p>All participants in DOCLSE organised rides must hold a valid motorcycle licence, have appropriate insurance in place, and complete a ride waiver before joining. Participation is entirely at the rider&apos;s own risk.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Liability</h2>
          <p>DOCLSE, its committee, and affiliated partners accept no liability for any personal injury, accident, loss, or damage arising from participation in club activities. We strongly recommend all riders carry appropriate insurance.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Shop & Merchandise</h2>
          <p>All merchandise sales are final unless items are faulty. For queries regarding orders, contact info@doclse.club. Delivery times are estimates and may vary.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Code of Conduct</h2>
          <p>Members are expected to treat fellow riders, guests, and the public with respect at all times. DOCLSE reserves the right to revoke membership from any individual whose conduct is deemed to be harmful to the club or its members.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Changes to Terms</h2>
          <p>DOCLSE reserves the right to update these terms at any time. Members will be notified of significant changes via email.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact</h2>
          <p>Questions about these terms? Email us at <a href="mailto:info@doclse.club" className="text-[#cc0000] hover:underline">info@doclse.club</a>.</p>
        </section>
      </div>
    </div>
  );
}
