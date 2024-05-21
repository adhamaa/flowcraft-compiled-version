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
    },
  },
  plugins: [fluidCorePlugins],
  corePlugins: {
    preflight: false,
  },
};
export default config;
