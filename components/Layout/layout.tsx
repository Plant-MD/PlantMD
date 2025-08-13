'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Poppins } from "next/font/google";
import { SessionProvider } from 'next-auth/react';
// import { SessionProvider } from 'next-auth/react'; // Temporarily disabled for static export


interface LayoutProps {
  children: React.ReactNode;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});


const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isCoreStep = ['/scan', '/processing', '/diagnosis'].includes(pathname);

  return (
    <SessionProvider>
      <div className={` bg-gradient-to-br from-cream via-white to-pale ${poppins.variable}`}>
        <main className="">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
};

export default Layout;