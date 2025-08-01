import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeroAuthNoticeProps {
  session: any;
}

const HeroAuthNotice: React.FC<HeroAuthNoticeProps> = ({ session }) => {
  const router = useRouter();

  return (
    <>
      {!session && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600 mb-2">
            Please sign in to use the plant diagnosis feature
          </p>
        </div>
      )}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          By uploading, you agree to our{" "}
          <Link href="/terms" className="text-green-600 underline hover:text-green-700">
            Terms
          </Link>{" "}
          &{" "}
          <Link href="/privacy" className="text-green-600 underline hover:text-green-700">
            Privacy Policy
          </Link>
        </p>
      </div>
    </>
  );
};

export default HeroAuthNotice;