import Link from "next/link";
import { RIDE_REPORTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "News & Ride Reports" };

export default function NewsPage() {
  const reviews = RIDE_REPORTS.filter((r) => r.category === "Review");
  const reports = RIDE_REPORTS.filter((r) => r.category === "Ride Report");

  return (
    <div>
      <section className="bg-black text-white pt-[72px] pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-[#cc0000] font-semibold uppercase tracking-widest text-sm mb-3">News</p>
          <h1 className="text-5xl font-black mb-4">Ride Reports &amp; Reviews</h1>
          <p className="text-gray-300 text-lg max-w-xl">Stories from the road, written by DOCLSE members.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {reviews.length > 0 && (
            <div className="mb-14">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((r) => <ReportCard key={r.slug} report={r} />)}
              </div>
            </div>
          )}
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Ride Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((r) => <ReportCard key={r.slug} report={r} />)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ReportCard({ report }: { report: typeof RIDE_REPORTS[0] }) {
  return (
    <Link href={`/news/${report.slug}`}
      className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#cc0000]/30 transition-all">
      <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <span className="text-5xl">🏍️</span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
            {report.category}
          </span>
          <span className="text-xs text-gray-400">{formatDate(report.date)}</span>
        </div>
        <h2 className="font-bold text-gray-900 mb-1 group-hover:text-[#cc0000] transition-colors">{report.title}</h2>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{report.excerpt}</p>
        <p className="text-xs text-gray-400">By {report.author}</p>
      </div>
    </Link>
  );
}
