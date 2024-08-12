import type { Config } from "tailwindcss";
import { defaultThemeFontSizeInRems, defaultThemeScreensInRems, fluidCorePlugins, fluidExtractor } from 'fluid-tailwind'

const config: Config = {
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  content: {
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      './node_modules/onborda/dist/**/*.{js,ts,jsx,tsx}',
    ],
    extract: fluidExtractor()
  },
  theme: {
    fontSize: defaultThemeFontSizeInRems,
    screens: defaultThemeScreensInRems,
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        fc: {
          neutral: {
            50: "var(--fc-neutral-50)",
            100: "var(--fc-neutral-100)",
            200: "var(--fc-neutral-200)",
            300: "var(--fc-neutral-300)",
            400: "var(--fc-neutral-400)",
            500: "var(--fc-neutral-500)",
            600: "var(--fc-neutral-600)",
            700: "var(--fc-neutral-700)",
            800: "var(--fc-neutral-800)",
            900: "var(--fc-neutral-900)",
          },
          basic: {
            black: "var(--fc-basic-black)",
            white: "var(--fc-basic-white)",
          },
          brand: {
            50: "var(--fc-brand-50)",
            100: "var(--fc-brand-100)",
            200: "var(--fc-brand-200)",
            300: "var(--fc-brand-300)",
            400: "var(--fc-brand-400)",
            500: "var(--fc-brand-500)",
            600: "var(--fc-brand-600)",
            700: "var(--fc-brand-700)",
            800: "var(--fc-brand-800)",
            900: "var(--fc-brand-900)",
          },
          status: {
            rose: {
              50: "var(--fc-status-rose-50)",
              400: "var(--fc-status-rose-400)",
              600: "var(--fc-status-rose-600)",
            },
            amber: {
              100: "var(--fc-status-amber-100)",
              400: "var(--fc-status-amber-400)",
              600: "var(--fc-status-amber-600)",
            },
            teal: {
              50: "var(--fc-status-teal-50)",
              400: "var(--fc-status-teal-400)",
              600: "var(--fc-status-teal-600)",
            },
          },
          border: {
            gray: "var(--fc-border-gray)",
          },
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        notoSans: ["var(--font-noto-sans)", "sans-serif"],
      },
    },
    plugins: [fluidCorePlugins],
    corePlugins: {
      preflight: false,
    },
  },
};

export default config;
