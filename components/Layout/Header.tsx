"use client"
import { Leaf, Menu, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { LogIn, LogOut } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Oswald } from "next/font/google"

const oswald = Oswald({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-oswald",
})

function Header() {
    const { data: session } = useSession()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    
    const isHomePage = pathname === '/'

    const allNavLinks = [
        { label: "About Us", href: "/#about", homeOnly: false },
        { label: "Tutorial", href: "/#tutorial", homeOnly: false },
        { label: "Contact", href: "/#footer", homeOnly: false },

        { label: "PlantBook", href: "/plantbook", homeOnly: false },
        { label: "Plant Calendar", href: "/plant-calendar", homeOnly: false },

    ]

    const navLinks = allNavLinks

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    // Optimized navigation handler with preloading
    const handleNavigation = (href: string) => {
        closeMenu()
        
        // Preload the page for faster navigation
        if (href.startsWith('/') && !href.includes('#')) {
            router.prefetch(href)
        }
        
        // Use router.push for programmatic navigation
        if (href.startsWith('/')) {
            router.push(href)
        }
    }

    // Preload main pages on component mount for faster navigation
    React.useEffect(() => {
        const mainPages = ['/plant-calendar', '/plantbook', '/scan', '/feedback']
        mainPages.forEach(page => {
            router.prefetch(page)
        })
    }, [router])

    return (
        <nav className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-sage/20 py-2">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16">
                    <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group justify-around">
                        <div className="">
                            <Image
                                src="logo.png"
                                alt="PlantMD Logo"
                                width={64}
                                height={64}
                            />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className={`${oswald.className} text-xl sm:text-2xl font-bold tracking-wider text-left bg-black bg-clip-text text-transparent`}>
                                PlantMD
                            </h1>
                        </div>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
                        {navLinks.map(({ label, href }) => (
                            <button
                                key={label}
                                onClick={() => handleNavigation(href)}
                                className="relative group text-gray-600 transition-colors duration-200 hover:text-green-600 font-poppins cursor-pointer"
                            >
                                <span className="capitalize">{label}</span>
                                <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-green-500 transition-all duration-300 group-hover:w-full" />
                            </button>
                        ))}
                        
                        {session && (
                            <button
                                onClick={() => handleNavigation('/feedback')}
                                className="bg-white border-2 border-green-600 text-green-700 px-4 lg:px-6 py-1 transition-all duration-300 shadow-sm hover:shadow-md font-poppins cursor-pointer"
                            >
                                Give Feedback
                            </button>
                        )}

                        {session ? (
                            <Button
                                onClick={() => signOut()}
                                className="bg-deep-mint hover:bg-deep-mint text-white px-4 lg:px-6 py-2 rounded-md transition-colors font-poppins text-md"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Sign Out
                            </Button>
                        ) : (
                            <Button
                                onClick={() => signIn('google')}
                                className="bg-deep-mint hover:bg-deep-mint text-white px-4 lg:px-6 py-2 rounded-md transition-colors font-poppins text-md"
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
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen
                    ? 'max-h-96 opacity-100 visible'
                    : 'max-h-0 opacity-0 invisible overflow-hidden'
                    }`}>
                    <div className="py-4 space-y-4 border-t border-sage/20 bg-white/90 backdrop-blur-sm">
                        {navLinks.map(({ label, href }) => (
                            <button
                                key={label}
                                onClick={() => handleNavigation(href)}
                                className="block w-full text-left px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors duration-200 font-poppins cursor-pointer"
                            >
                                <span className="capitalize">{label}</span>
                            </button>
                        ))}

                        {session && (
                            <button
                                onClick={() => handleNavigation('/feedback')}
                                className="block mx-4 bg-white border-2 border-green-600 text-leaf-green px-4 py-2 rounded-md transition-colors font-poppins text-center cursor-pointer"
                            >
                                Give Feedback
                            </button>
                        )}

                        {!isHomePage && session && (
                            <button
                                onClick={() => handleNavigation('/scan')}
                                className="block mx-4 bg-plant-dark hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors font-poppins text-center cursor-pointer"
                            >
                                Use App
                            </button>
                        )}

                        <div className="px-4">
                            {session ? (
                                <Button
                                    onClick={() => {
                                        signOut()
                                        closeMenu()
                                    }}
                                    className="w-full bg-plant-dark hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors font-poppins"
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Sign Out
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        signIn('google')
                                        closeMenu()
                                    }}
                                    className="w-full bg-plant-dark hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors font-poppins"
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
    )
}

export default Header
