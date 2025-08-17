"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const allNavLinks = [
    { label: "About Us", href: "#about", homeOnly: true, external: false },
    { label: "Contact", href: "#footer", homeOnly: false, external: false },

    {
      label: "Plant Calendar",
      href: "/plant-calendar",
      homeOnly: false,
      external: false,
    },
    {
      label: "Plantbook",
      href: "/plantbook",
      homeOnly: false,
      external: false,
    },
    {
      label: "GeoCrop Guessr",
      href: "https://geocrop-guessr.vercel.app/",
      homeOnly: true,
      external: true,
    },
  ];

  const navLinks = allNavLinks.filter((link) =>
    isHomePage ? true : !link.homeOnly
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav id="header" className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-sage/20 py-2">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link
            href="/"
            className="flex items-center space-x-2 sm:space-x-3 group justify-around"
          >
            <div className="">
              <Image src="logo.png" alt="PlantMD Logo" width={64} height={64} />
            </div>
                  <div className="hidden sm:block mr-4" style={{ marginLeft: '-12px' }}>
                    <h1 className="text-xl sm:text-2xl font-extrabold font-oswald tracking-wider text-left bg-black bg-clip-text text-transparent">
                      PlantMD
                    </h1>
                  </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
            {navLinks.map(({ label, href, external }) => (
              <Link
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="relative group text-gray-600 transition-colors duration-200 hover:text-green-600 font-roboto"
              >
                <span className="capitalize">{label}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-green-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {session && (
              <Link
                href="/feedback"
                className="bg-white border-2 border-green-600 text-green-700 px-4 lg:px-6 py-1 transition-all duration-300 shadow-sm hover:shadow-md font-roboto rounded-md"
              >
                Give Feedback
              </Link>
            )}

            {session ? (
              <Button
                onClick={() => signOut()}
                className="bg-deep-mint hover:bg-deep-mint text-white px-4 lg:px-6 py-2 rounded-md transition-colors font-roboto text-md"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <Button
                onClick={() => signIn("google")}
                className="bg-deep-mint hover:bg-deep-mint text-white px-4 lg:px-6 py-2 rounded-md transition-colors font-roboto text-md"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </nav>

          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center w-8 h-8 text-gray-600 hover:text-green-600 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-12 w-12" />
            ) : (
              <Menu className="h-12 w-12" />
            )}
          </button>
        </div>
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 visible"
              : "max-h-0 opacity-0 invisible overflow-hidden"
          }`}
        >
          <div className="py-4 space-y-4 border-t border-sage/20 bg-white/90 backdrop-blur-sm">

            <Link
              href="/"
              onClick={closeMenu}
              className="block px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors duration-200 font-roboto"
            >
              Home
            </Link>
            {navLinks.map(({ label, href, external }) => (
              <Link
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                onClick={closeMenu}
                className="block px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors duration-200 font-roboto"
              >
                <span className="capitalize">{label}</span>
              </Link>
            ))}
            {session && (
              <Link
                href="/feedback"
                onClick={closeMenu}
                className="block mx-4 bg-white border-2 border-green-600 text-leaf-green px-4 py-2 rounded-md transition-colors font-roboto text-center"
              >
                Give Feedback
              </Link>
            )}

            <div className="px-4">
              {session ? (
                <Button
                  onClick={() => {
                    signOut();
                    closeMenu();
                  }}
                  className="w-full bg-deep-mint hover:bg-deep-mint text-white px-4 py-2 rounded-md transition-colors font-roboto"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    signIn("google");
                    closeMenu();
                  }}
                  className="w-full bg-deep-mint hover:bg-deep-mint text-white px-4 py-2 rounded-md transition-colors font-roboto"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
