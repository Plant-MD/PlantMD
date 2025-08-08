'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Roboto, Lato, Oswald } from "next/font/google";
import { SessionProvider } from 'next-auth/react';
import Header from './Header';
import { SidebarProvider } from '../ui/sidebar';
// import { SessionProvider } from 'next-auth/react'; // Temporarily disabled for static export

interface LayoutProps {
  children: React.ReactNode;
}

const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-roboto",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-oswald",
});

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lato',
})


const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isCoreStep = ['/scan', '/processing', '/diagnosis'].includes(pathname);

  return (

      <div className={` bg-gradient-to-br from-cream via-white to-pale ${roboto.variable} ${lato.variable} ${oswald.variable}`}>

        <SidebarProvider>
          <main className="">
            {children}
          </main>
        </SidebarProvider>
      </div>
    </SessionProvider>
  );
};

export default Layout;