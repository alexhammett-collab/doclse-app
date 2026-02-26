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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/news" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#cc0000] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to News
      </Link>

      <div className="h-64 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center mb-8">
        <span className="text-7xl">🏍️</span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
          {report.category}
        </span>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(report.date)}
        </div>
      </div>

      <h1 className="text-4xl font-black text-gray-900 mb-4">{report.title}</h1>

      <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
          <User className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{report.author}</p>
          <p className="text-xs text-gray-400">DOCLSE Member</p>
        </div>
      </div>

      <div className="prose prose-gray max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed mb-6">{report.excerpt}</p>
        <p className="text-gray-600 leading-relaxed">
          This is a demonstration of the ride report content. In the full implementation with Sanity CMS, 
          the complete article body — including photos, route maps, and rider commentary — would be 
          rendered here using rich text from the CMS.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          The DOCLSE community documents every ride, from the inaugural rideout in June 2024 through 
          to the latest adventures. Every road tells a story, and every story brings us closer together 
          as a club.
        </p>
      </div>

      {related.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">More Ride Reports</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/news/${r.slug}`}
                className="border border-gray-200 rounded-xl p-4 hover:border-[#cc0000]/30 hover:shadow-sm transition-all group">
                <p className="text-xs text-gray-400 mb-1">{formatDate(r.date)}</p>
                <p className="font-semibold text-gray-900 text-sm group-hover:text-[#cc0000] transition-colors">{r.title}</p>
                <p className="text-xs text-gray-400 mt-1">By {r.author}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
