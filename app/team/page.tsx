import { TEAM } from "@/lib/data";
import { User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "The Team" };

export default function TeamPage() {
  return (
    <div>
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#cc0000] font-semibold uppercase tracking-widest text-sm mb-3">Our Team</p>
          <h1 className="text-5xl font-black mb-4">Meet the Committee</h1>
          <p className="text-gray-300 text-lg max-w-xl">
            The passionate volunteers who keep DOCLSE running — organising rides, managing the club, and building our community.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-md transition-shadow">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="font-black text-gray-900 text-xl mb-1">{member.name}</h2>
                <p className="text-[#cc0000] font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-black text-gray-900 mb-3">Want to get involved?</h2>
          <p className="text-gray-500 mb-6">We&apos;re always looking for enthusiastic members to help run the club. Get in touch!</p>
          <a href="mailto:info@doclse.club"
            className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#990000] text-white font-semibold px-6 py-3 rounded-md transition-colors">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
