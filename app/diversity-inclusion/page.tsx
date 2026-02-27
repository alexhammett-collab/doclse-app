import type { Metadata } from "next";

export const metadata: Metadata = { title: "Diversity & Inclusion Policy" };

export default function DiversityInclusionPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pt-[88px] pb-12">
      <h1 className="text-4xl font-black text-gray-900 mb-2">Diversity &amp; Inclusion Policy</h1>
      <p className="text-gray-400 text-sm mb-8">Last updated: January 2025</p>
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Our Commitment</h2>
          <p>DOCLSE is committed to creating an inclusive environment where all members, regardless of age, gender, race, ethnicity, disability, religion, sexual orientation, or background, feel welcome, respected, and valued.</p>
          <p className="mt-3">We believe that diversity makes our community stronger, and we actively work to remove barriers to participation in motorcycling and club activities.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">We Ride as One</h2>
          <p>Our &ldquo;We Ride as One&rdquo; ethos reflects our belief that passion for Ducati unites us all. You don&apos;t need to own a Ducati to join us — you just need to share the love.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Zero Tolerance</h2>
          <p>DOCLSE has zero tolerance for discrimination, harassment, or bullying of any kind. Any behaviour that makes another member feel unwelcome or unsafe will result in immediate investigation and may lead to membership being revoked.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Reporting</h2>
          <p>If you experience or witness behaviour that contradicts this policy, please contact us confidentially at <a href="mailto:info@doclse.club" className="text-[#cc0000] hover:underline">info@doclse.club</a>. All reports are taken seriously and handled with discretion.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Continuous Improvement</h2>
          <p>We review this policy annually and welcome suggestions from members on how we can improve inclusivity within the club.</p>
        </section>
      </div>
    </div>
  );
}
