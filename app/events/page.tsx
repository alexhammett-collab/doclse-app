import Link from "next/link";
import { Calendar, MapPin, Clock } from "lucide-react";
import { EVENTS } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Events" };

const CATEGORY_COLOURS: Record<string, string> = {
  Rideout: "bg-blue-100 text-blue-800",
  Training: "bg-green-100 text-green-800",
  Social: "bg-purple-100 text-purple-800",
  Special: "bg-yellow-100 text-yellow-800",
};

export default function EventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Events</h1>
        <p className="text-gray-500 text-lg">All upcoming DOCLSE rides, socials and special events.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EVENTS.map((event) => (
          <Link
            key={event.slug}
            href={`/events/${event.slug}`}
            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-[#cc0000]/30 transition-all"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black h-44 flex items-center justify-center">
              <Calendar className="w-14 h-14 text-[#cc0000] group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLOURS[event.category] ?? "bg-gray-100 text-gray-700"}`}>
                  {event.category}
                </span>
              </div>
              <h2 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-[#cc0000] transition-colors leading-tight">
                {event.title}
              </h2>
              <div className="space-y-1.5 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 shrink-0 text-[#cc0000]" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0 text-[#cc0000]" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#cc0000]" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
