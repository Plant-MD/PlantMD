import Link from "next/link";

import { Instagram, Youtube, Github } from 'lucide-react';
import FooterNewsletter from "./FooterNewsletter";

import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-oswald",
});

type SocialIconProps = {
  Icon: React.ComponentType<React.ComponentProps<typeof Instagram>>;
  href: string;
};

const SocialIcon = ({ Icon, href }: SocialIconProps) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <Icon size={24} className="cursor-pointer text-white hover:text-white transition-colors duration-200" />
  </a>
);

type FooterLinkSectionProps = {
  title: string;
  links: { href: string; text: string }[];
};

const FooterLinkSection = ({ title, links }: FooterLinkSectionProps) => (
  <div>
    {/* Centered text on small screens, left-aligned on medium and larger */}
    <h3 className="text-base font-semibold mb-4 text-white text-center md:text-left">{title}</h3>
    {/* Centered list items on small screens, left-aligned on medium and larger */}
    <ul className="space-y-2 text-sm text-white text-center md:text-left">
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href} className="hover:text-white transition-colors duration-200">
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// ---
// Data for Links and Social Media
// ---

const Quick_Links = [
  { href: "", text: "About Us" },
  { href: "", text: "Frequently Asked Questions" },
  { href: "", text: "Contact Us" },
  { href: "", text: "About Our Team" },
  { href: "", text: "Incubate Nepal 2025" },
];
const Notices = [
  { href: "", text: "General News" },
  { href: "", text: "plantmd.xyz@gmail.com" },
];

const socialIcons = [
  { Icon: Instagram, href: "https://www.instagram.com/" },
  { Icon: Github, href: "https://github.com/plant-MD/" },
  { Icon: Youtube, href: "https://www.youtube.com/ " },
];

export default function Footer() {
  return (
    <footer className="relative bg-deep-mint text-white py-16 px-4 sm:px-6 md:px-8 lg:px-12" id="footer">
      {/* Wave SVG at the top */}
      <div className="absolute top-0 left-0 w-full">
        <svg
          className="relative block w-full h-20 md:h-24 lg:h-32 leading-none"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,243.8-84.81V0Z"
            className="fill-white"
          ></path>
        </svg>

      </div>
      <div className="h-[100px]"></div>

      <div className="max-w-4xl mx-auto relative z-10 ">
        {/* Main Footer Content */}
        <div className="flex flex-col mx-auto max-w-screen-lg"> {/* Removed justify-center here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 justify-center">
            {/* Logo and Description - occupies 1 column on small screens, 1 on medium+ */}
            <div className="md:col-span-1 ">
              <h2 className={`${oswald.className} text-4xl font-bold mb-4 font-oswald text-white text-center md:text-left`}>PlantMD</h2>
            <p className="text-sm text-white mb-6 font-roboto mx-auto md:mx-0 max-w-xs text-center md:text-left "> {/* Added mx-auto for centering */}
              Diagnose plant diseases instantly and get reliable treatment methods.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              {socialIcons.map(({ Icon, href }, index) => (
                <SocialIcon key={index} Icon={Icon} href={href} />
              ))}
            </div>
          </div>

          {/* Link Sections - occupies 2 columns on medium+ screens, side by side */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:ml-20  font-roboto text-center"> {/* Changed to grid for better control */}
            <FooterLinkSection title="Quick Links" links={Quick_Links} />
            <FooterLinkSection title="Contact Us" links={Notices} />
          </div>
        </div>

        {/* Newsletter - Full width at the bottom of the main content section */}
        <FooterNewsletter />
      </div>

    </div>
    </footer >
  );
}