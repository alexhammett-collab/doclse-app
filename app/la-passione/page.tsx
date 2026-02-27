import Link from "next/link";
import { BookOpen, Lock, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "La Passione Magazine" };

const ISSUES = [
  { issue: "Issue 3", season: "Autumn/Winter 2025", description: "WDW preview, track day reports, member spotlights and the best roads in Kent." },
  { issue: "Issue 2", season: "Summer 2025", description: "Our first full riding season — rideout reports, new member profiles and gear reviews." },
  { issue: "Issue 1", season: "Spring 2025", description: "The inaugural issue. Club launch story, founding committee interviews, and the road ahead." },
];

export default function LaPassionePage() {
  return (
    <div>
      <section className="bg-black text-white pt-[72px] pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-[#cc0000] font-semibold uppercase tracking-widest text-sm mb-3">Full Members</p>
          <h1 className="text-5xl font-black mb-4">La Passione</h1>
          <p className="text-gray-300 text-lg max-w-xl">
            The official DOCLSE club magazine. Ride reports, reviews, member stories, event previews and more — for Full Members.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-10 flex items-start gap-4">
            <Lock className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-900 mb-1">Full Members Only</p>
              <p className="text-sm text-amber-700">
                La Passione is available exclusively to Full Members.{" "}
                <Link href="/membership" className="font-semibold underline">Upgrade your membership</Link> to read every issue.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {ISSUES.map((mag) => (
              <div key={mag.issue} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-all group">
                <div className="bg-gradient-to-br from-black to-[#1a0000] h-52 flex flex-col items-center justify-center text-white">
                  <BookOpen className="w-12 h-12 text-[#cc0000] mb-3" />
                  <p className="font-black text-xl">{mag.issue}</p>
                  <p className="text-gray-400 text-sm">{mag.season}</p>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{mag.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Full Members only</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-black text-white rounded-2xl p-8 text-center">
            <BookOpen className="w-10 h-10 text-[#cc0000] mx-auto mb-3" />
            <h2 className="text-2xl font-black mb-2">Want to read La Passione?</h2>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Upgrade to Full Member for just £30/year and get access to every issue, plus all other member benefits.
            </p>
            <Link href="/membership"
              className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#990000] text-white font-semibold px-8 py-3 rounded-md transition-colors">
              Upgrade Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
