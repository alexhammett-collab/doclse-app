import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { RIDE_REPORTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return RIDE_REPORTS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const report = RIDE_REPORTS.find((r) => r.slug === slug);
  return { title: report?.title ?? "Ride Report" };
}

export default async function ReportDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = RIDE_REPORTS.find((r) => r.slug === slug);
  if (!report) notFound();

  const related = RIDE_REPORTS.filter((r) => r.slug !== slug).slice(0, 3);

  return (
    <div className="bg-black min-h-screen text-white" style={{ paddingTop: 72 }}>
      {/* Hero image */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${report.image})` }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.5) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pb-10">
          <Link href="/news" className="inline-flex items-center gap-2 text-white/30 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> News
          </Link>
          <span className="block text-[0.6rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 bg-[#cc0000] text-white w-fit mb-4">{report.category}</span>
          <h1 className="font-black text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, letterSpacing: "-0.03em" }}>
            {report.title}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
        {/* Author bar */}
        <div className="flex items-center gap-3 mb-8 pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center">
            <User className="w-4 h-4 text-white/40" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">{report.author}</p>
            <div className="flex items-center gap-2 text-[0.6rem] text-white/25">
              <Calendar className="w-3 h-3" />
              {formatDate(report.date)}
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="space-y-6">
          <p className="text-white/60 text-lg leading-relaxed">{report.excerpt}</p>
          <p className="text-white/40 leading-relaxed">
            This is a demonstration of the ride report content. In the full implementation with Sanity CMS, 
            the complete article body — including photos, route maps, and rider commentary — would be 
            rendered here using rich text from the CMS.
          </p>
          <p className="text-white/40 leading-relaxed">
            The DOCLSE community documents every ride, from the inaugural rideout in June 2024 through 
            to the latest adventures. Every road tells a story, and every story brings us closer together 
            as a club.
          </p>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-[0.65rem] font-black text-white/20 uppercase tracking-[0.2em] mb-5">More Reports</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/news/${r.slug}`}
                  className="group block bg-[#0e0e0e] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div className="h-28 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${r.image})` }} />
                    <div className="absolute inset-0 bg-black/50" />
                  </div>
                  <div className="p-4">
                    <p className="text-[0.6rem] text-white/25 mb-1">{formatDate(r.date)} · {r.author}</p>
                    <p className="font-bold text-white text-sm group-hover:text-[#cc0000] transition-colors">{r.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
