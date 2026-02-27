"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, CheckCircle, Send } from "lucide-react";
import type { Metadata } from "next";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(3, "Subject required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
  }

  return (
    <div>
      <section className="bg-black text-white pt-[72px] pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-[#cc0000] font-semibold uppercase tracking-widest text-sm mb-3">Get In Touch</p>
          <h1 className="text-5xl font-black mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg max-w-xl">
            Questions, ideas, or just want to say hello? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5">
                <Mail className="w-6 h-6 text-[#cc0000] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Email</p>
                  <a href="mailto:info@doclse.club" className="text-sm text-gray-500 hover:text-[#cc0000] transition-colors">
                    info@doclse.club
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5">
                <MapPin className="w-6 h-6 text-[#cc0000] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 mb-1">Head Office</p>
                  <address className="text-sm text-gray-500 not-italic leading-relaxed">
                    Arch 70<br />
                    Albert Embankment<br />
                    London, SE1 7TP
                  </address>
                  <a href="https://maps.app.goo.gl/RYFV9c3YYr7h2Hyx9" target="_blank" rel="noopener noreferrer"
                    className="text-xs text-[#cc0000] hover:underline mt-2 block">
                    View on map →
                  </a>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="font-bold text-gray-900 mb-3">Follow Us</p>
                <div className="flex gap-4">
                  {[
                    { label: "Facebook", href: "https://www.facebook.com/doclse.club/" },
                    { label: "Instagram", href: "https://www.instagram.com/doclse.club/" },
                    { label: "X / Twitter", href: "https://www.x.com/DOCLSECLUB" },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-[#cc0000] hover:underline">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center animate-fade-in">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h2 className="text-2xl font-black text-gray-900 mb-2">Message Sent!</h2>
                  <p className="text-gray-500">Thanks for getting in touch. We&apos;ll get back to you soon.</p>
                  <p className="text-xs text-gray-400 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 mt-4">
                    🔔 Demo mode — no message was actually sent.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-200 rounded-2xl p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input {...register("name")} placeholder="Your name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent" />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input {...register("email")} type="email" placeholder="you@example.com"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input {...register("subject")} placeholder="How can we help?"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent" />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea {...register("message")} rows={6} placeholder="Tell us what's on your mind..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent resize-none" />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#990000] disabled:opacity-70 text-white font-semibold px-6 py-3 rounded-md transition-colors">
                    {isSubmitting ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
