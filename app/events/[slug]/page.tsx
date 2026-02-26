import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowLeft, Users } from "lucide-react";
import { EVENTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  return { title: event?.title ?? "Event" };
}

const CATEGORY_COLOURS: Record<string, string> = {
  Rideout: "bg-blue-100 text-blue-800",
  Training: "bg-green-100 text-green-800",
  Social: "bg-purple-100 text-purple-800",
  Special: "bg-yellow-100 text-yellow-800",
};

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) notFound();

  const related = EVENTS.filter((e) => e.slug !== slug && e.category === event.category).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/events" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#cc0000] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Events
      </Link>

      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl h-64 flex items-center justify-center mb-8">
        <Calendar className="w-20 h-20 text-[#cc0000]" />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${CATEGORY_COLOURS[event.category] ?? "bg-gray-100 text-gray-700"}`}>
          {event.category}
        </span>
      </div>

      <h1 className="text-4xl font-black text-gray-900 mb-6">{event.title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
          <Calendar className="w-5 h-5 text-[#cc0000] shrink-0" />
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Date</p>
            <p className="font-semibold text-gray-900 text-sm">{formatDate(event.date)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
          <Clock className="w-5 h-5 text-[#cc0000] shrink-0" />
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Time</p>
            <p className="font-semibold text-gray-900 text-sm">{event.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
          <MapPin className="w-5 h-5 text-[#cc0000] shrink-0" />
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Location</p>
            <p className="font-semibold text-gray-900 text-sm">{event.location}</p>
          </div>
        </div>
      </div>

      <div className="prose prose-gray max-w-none mb-10">
        <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-[#cc0000]" />
          <div>
            <p className="font-semibold text-gray-900">Want to join this event?</p>
            <p className="text-sm text-gray-500">Login or register to RSVP and get updates.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#990000] text-white font-semibold px-5 py-2.5 rounded-md transition-colors text-sm">
            Login to RSVP
          </Link>
          <Link href="/register" className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-5 py-2.5 rounded-md transition-colors text-sm">
            Register
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">More {event.category} Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/events/${r.slug}`}
                className="border border-gray-200 rounded-xl p-4 hover:border-[#cc0000]/30 hover:shadow-md transition-all group">
                <p className="text-xs text-gray-400 mb-1">{formatDate(r.date)}</p>
                <p className="font-semibold text-gray-900 text-sm group-hover:text-[#cc0000] transition-colors">{r.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
