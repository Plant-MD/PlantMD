/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'forest-green': '#1C463A',
        'forest-green-dark': '#56B86F',
        'soft-beige': '#F8F6F1',
        'leaf-green': '#6FBF73',
        'warning-red': '#E57373',
        'neutral-gray': '#A8A8A8',
        'light-green': '#CDE8D5',
        'deep-mint': '#55A276',
        'sky-leaf': '#A4D4AE',

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          bg: 'var(--success-bg)',
          border: 'var(--success-border)',
          text: 'var(--success-text)'
        },
        warning: {
          bg: 'var(--warning-bg)',
          border: 'var(--warning-border)',
          text: 'var(--warning-text)'
        },
        error: {
          bg: 'var(--error-bg)',
          border: 'var(--error-border)',
          text: 'var(--error-text)'
        },
        "plant-dark": "#011606",
        "primary-dark": "#0B2113",
        "forest": "#257440",
        "mint": "#6BB183",
        "pale": "#DFF0E5",
        "sage": "#8FA68E",
        "cream": "#F8FAF9",
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'Roboto', 'Nunito', 'system-ui', 'sans-serif'],
        'primary': 'var(--font-family-primary)',
        roboto: ['var(--font-roboto)', 'sans-serif'],
        oswald: ['var(--font-oswald)', 'sans-serif'],
        bebas_neue: ['var(--font-bebas_neue)', 'sans-serif'],
        lato: ['var(--font-lato)', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)'
      },
      fontWeight: {
        'regular': 'var(--font-weight-regular)',
        'semi-bold': 'var(--font-weight-semi-bold)',
        'bold': 'var(--font-weight-bold)'
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        'card': 'var(--card-padding)',
        'section': 'var(--section-spacing)',
        'section-lg': 'var(--section-spacing-lg)',
        'touch': 'var(--touch-target-min)'
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)'
      },
      transitionDuration: {
        'fast': 'var(--transition-fast)',
        'base': 'var(--transition-base)',
        'slow': 'var(--transition-slow)'
      },
      zIndex: {
        'dropdown': 'var(--z-dropdown)',
        'sticky': 'var(--z-sticky)',
        'fixed': 'var(--z-fixed)',
        'modal-backdrop': 'var(--z-modal-backdrop)',
        'modal': 'var(--z-modal)',
        'popover': 'var(--z-popover)',
        'tooltip': 'var(--z-tooltip)'
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'bounce-subtle': {
          '0%, 100%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(0.95)'
          }
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(107, 177, 131, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(107, 177, 131, 0.6)" },
        },
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'bounce-subtle': 'bounce-subtle 0.3s ease-in-out',
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "scan": "scan 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};