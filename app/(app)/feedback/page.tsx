'use client';

<<<<<<< HEAD
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession, signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import sendFeedback from "@/helpers/send_feeback";

export default function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [feedbackType, setFeedbackType] = useState('general');
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  const user_id = session?.user._id ?? '';
  const email = session?.user.email ?? '';

  // Check if user came from diagnosis page
  const source = searchParams.get('source');
  const isFromDiagnosis = source === 'diagnosis';

  useEffect(() => {
    if (isFromDiagnosis) {
      setFeedbackType('diagnosis');
      setDescription('The diagnosis was helpful and accurate.');
    }
  }, [isFromDiagnosis]);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(email, user_id)
    if (email === '' || !email || !user_id) {
      signIn('google');
=======
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FeedbackForm from '@/components/feedback/FeedbackForm';

export default function FeedbackPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
>>>>>>> 95b30fb1578ab2214345ca531e6edd7792f94137
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

<<<<<<< HEAD
    try {
      await sendFeedback({ 
        email, 
        userID: user_id, 
        description: `${feedbackType === 'diagnosis' ? '[Diagnosis Feedback] ' : ''}${description}`, 
        stars: rating 
      });
      setDescription('');
      setRating(0);
      setFeedbackType('general');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center py-8 px-2 relative overflow-hidden">
      {/* Leaf image */}
      <div className="hidden lg:block absolute right-96 bottom-20 z-0 opacity-70 pointer-events-none select-none">
        <Image
          src="/leaf_image.png"
          alt="Leaf"
          width={200}
          height={200}
          className="select-none opacity-10 rotate-45"
          priority
        />
      </div>

      {/* Feedback Card */}
      <div
        className="relative z-10 max-w-md w-full mx-auto rounded-2xl shadow-xl p-6 sm:p-10 space-y-7"
        style={{
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          border: "1px solid rgba(180,220,180,0.08)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-2">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-2 overflow-hidden">
            <Image src="/logo.jpeg" alt="Logo" width={40} height={40} />
          </div>
          <span className="text-green-700 text-xl font-bold tracking-wide">
            PLANT MD
          </span>
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-700">
            {isFromDiagnosis ? 'How was your diagnosis?' : 'Share Your Feedback'}
          </h2>
          <p className="text-gray-500 text-center -mt-2">
            {isFromDiagnosis 
              ? 'Help us improve our plant disease detection accuracy'
              : 'Help us improve your plant health experience'
            }
          </p>
        </div>

        {/* Feedback Type Selector */}
        {!isFromDiagnosis && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Feedback Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFeedbackType('general')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  feedbackType === 'general'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm font-medium">General</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setFeedbackType('diagnosis')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  feedbackType === 'diagnosis'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium">Diagnosis</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Feedback Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {feedbackType === 'diagnosis' ? 'Tell us about your diagnosis experience' : 'Your feedback'}
            </label>
            <textarea
              placeholder={feedbackType === 'diagnosis' ? 'Was the diagnosis accurate? Any suggestions for improvement?' : 'Share your thoughts with us...'}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-200 focus:border-green-400 px-4 py-3 outline-none resize-none bg-white/80"
            />
          </div>

          {/* Star Rating */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              {feedbackType === 'diagnosis' ? 'How accurate was the diagnosis?' : 'Rate your experience'}
            </label>
            <div className="flex items-center justify-center space-x-1 pt-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setRating(i)}
                  className="focus:outline-none transform hover:scale-110 transition-transform"
                  aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
                >
                  <svg
                    width="32"
                    height="32"
                    fill={i <= rating ? "#22c55e" : "none"}
                    stroke="#22c55e"
                    strokeWidth="2"
                    className="transition-all duration-200"
                  >
                    <polygon
                      points="16,3 19.09,10.9 27.51,11.18 20.94,16.51 23.18,24.02 16,19.5 8.82,24.02 11.06,16.51 4.49,11.18 12.91,10.9"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>
            <div className="text-center text-sm text-gray-500">
              {rating === 0 && 'Click to rate'}
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold rounded-lg py-3 mt-4 text-lg shadow focus:outline-none transform hover:scale-105 transition-transform"
          >
            Send Feedback
          </button>
        </form>

        {/* Appreciation Note */}
        <div className="text-center text-gray-600 text-sm pt-3 flex items-center justify-center">
          We value every leaf of your opinion
          <svg width="18" height="18" fill="none" className="ml-1">
            <path
              d="M16 4C13 5 8 10 7 14C6.5 16.5 3 15 3 11C3 7.5 6 3.5 12 2"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <ellipse
              cx="13"
              cy="5.5"
              rx="2"
              ry="2.5"
              fill="#22c55e"
              fillOpacity={0.3}
            />
          </svg>
=======
  if (!session?.user?.email || !session?.user?._id) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full mx-auto">
        <h2 className="text-4xl sm:text-4xl lg:text-5xl mt-3 font-oswald font-bold text-gray-700 md:mb-6 text-center sm:text-left">
          Give Your Feedback
        </h2>

        <FeedbackForm
          userEmail={session.user.email}
          userId={session.user._id}
        />

        <div className="text-center mt-10">
          <p className="text-sm sm:text-base text-gray-500">
            Your feedback helps us create a better experience for everyone.
          </p>
>>>>>>> 95b30fb1578ab2214345ca531e6edd7792f94137
        </div>

        {/* Back to Diagnosis Button */}
        {isFromDiagnosis && (
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg py-2 transition-colors"
            >
              ← Back to Diagnosis
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
