"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, AlertTriangle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Full name required"),
  email: z.string().email("Valid email required"),
  dob: z.string().min(1, "Date of birth required"),
  emergencyName: z.string().min(2, "Emergency contact name required"),
  emergencyPhone: z.string().min(7, "Emergency contact phone required"),
  agree: z.literal(true, { message: "You must accept the waiver to participate" }),
});
type FormData = z.infer<typeof schema>;

export default function RideWaiverPage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center animate-fade-in">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-black text-gray-900 mb-2">Waiver Submitted</h1>
        <p className="text-gray-500 mb-2">Thank you. Your ride waiver has been recorded.</p>
        <p className="text-xs text-gray-400 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 inline-block">
          🔔 Demo mode — no data was saved.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 pt-[88px] pb-12">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Ride Waiver</h1>
        <p className="text-gray-500">All participants in DOCLSE organised rideouts must complete this waiver before riding.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p className="font-bold mb-1">Important Notice</p>
          <p>By submitting this waiver, you acknowledge the inherent risks of motorcycle riding and agree to participate at your own risk. DOCLSE, its committee members, and affiliated partners accept no liability for personal injury, accident, or loss during organised rides.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-200 rounded-2xl p-8 space-y-5">
        <h2 className="font-black text-gray-900 text-lg">Personal Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input {...register("name")} placeholder="Jonathan Tait"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input {...register("email")} type="email" placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input {...register("dob")} type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent" />
            {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <h2 className="font-black text-gray-900 text-lg mb-4">Emergency Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
              <input {...register("emergencyName")} placeholder="Jane Tait"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent" />
              {errors.emergencyName && <p className="text-red-500 text-xs mt-1">{errors.emergencyName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input {...register("emergencyPhone")} type="tel" placeholder="+44 7700 900000"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#cc0000] focus:border-transparent" />
              {errors.emergencyPhone && <p className="text-red-500 text-xs mt-1">{errors.emergencyPhone.message}</p>}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input {...register("agree")} type="checkbox" className="mt-1 w-4 h-4 accent-[#cc0000]" />
            <span className="text-sm text-gray-600 leading-relaxed">
              I have read and understood the waiver notice above. I acknowledge the risks associated with motorcycle riding and agree to participate in DOCLSE organised events at my own risk. I confirm that I hold a valid motorcycle licence and appropriate insurance for any rides I participate in.
            </span>
          </label>
          {errors.agree && <p className="text-red-500 text-xs mt-2">{errors.agree.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}
          className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#990000] disabled:opacity-70 text-white font-semibold px-6 py-3 rounded-md transition-colors">
          {isSubmitting ? "Submitting..." : "Submit Waiver"}
        </button>
      </form>
    </div>
  );
}
