import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RIDE_REPORTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "News & Ride Reports" };

export default function NewsPage() {
  const reviews = RIDE_REPORTS.filter((r) => r.category === "Review");
  const reports = RIDE_REPORTS.filter((r) => r.category === "Ride Report");

  return (
    <div className="bg-black min-h-screen text-white" style={{ paddingTop: 72 }}>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #1a0000 0%, #060606 60%)" }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1547549082-6bc09f2049ae?w=1400&q=80&fit=crop)",
        }} />
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-16 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/30 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <span className="text-[#cc0000] text-[0.65rem] font-bold tracking-[0.25em] uppercase">From the Road</span>
          <h1 className="font-black text-white mt-3" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}>
            Ride Reports &amp; Reviews
          </h1>
          <p className="text-white/40 text-sm font-light max-w-md mt-4 leading-relaxed">
            Stories from the road, written by DOCLSE members. Every ride has a tale.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {reviews.length > 0 && (
          <div className="mb-14">
            <p className="text-[0.65rem] font-black text-white/20 uppercase tracking-[0.2em] mb-6">Reviews</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.map((r) => <ReportCard key={r.slug} report={r} />)}
            </div>
          </div>
        )}
        <div>
          <p className="text-[0.65rem] font-black text-white/20 uppercase tracking-[0.2em] mb-6">Ride Reports</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reports.map((r) => <ReportCard key={r.slug} report={r} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportCard({ report }: { report: typeof RIDE_REPORTS[0] }) {
  return (
    <Link href={`/news/${report.slug}`} className="group block">
      <div className="h-52 relative overflow-hidden mb-4">
        <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{
          backgroundImage: `url(${report.image})`,
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.3) 100%)"
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#cc0000] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        <div className="absolute top-4 left-5">
          <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase px-3 py-1.5 bg-[#cc0000] text-white">{report.category}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-2 text-[0.65rem] text-white/25">
        <span>{formatDate(report.date)}</span>
        <span className="text-white/10">·</span>
        <span>{report.author}</span>
      </div>
      <h2 className="font-black text-white text-lg mb-2 group-hover:text-[#cc0000] transition-colors leading-tight">{report.title}</h2>
      <p className="text-white/35 text-sm leading-relaxed line-clamp-2">{report.excerpt}</p>
    </Link>
  );
}
