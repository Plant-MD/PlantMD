'use client';

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
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
        </div>
      </div>
    </div>
  );
}
