const plugin = require("tailwindcss/plugin");
const {default: flattenColorPalette} = require('tailwindcss/lib/util/flattenColorPalette');

module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          1: 'rgb(var(--color-primary-1) / <alpha-value>)',
        },
        accent: {
          1: 'rgb(var(--color-accent-1) / <alpha-value>)',
          5: 'rgb(var(--color-accent-5) / <alpha-value>)',
        },
        n: {
          1: 'rgb(var(--color-n-1) / <alpha-value>)',
          2: 'rgb(var(--color-n-2) / <alpha-value>)',
          3: 'rgb(var(--color-n-3) / <alpha-value>)',
          4: 'rgb(var(--color-n-4) / <alpha-value>)',
          5: 'rgb(var(--color-n-5) / <alpha-value>)',
          6: 'rgb(var(--color-n-6) / <alpha-value>)',
          7: 'rgb(var(--color-n-7) / <alpha-value>)',
          8: 'rgb(var(--color-n-8) / <alpha-value>)',
        },
        body: {
          DEFAULT: 'rgb(var(--color-n-1) / <alpha-value>)',
          dark: 'rgb(var(--color-n-8) / <alpha-value>)',
        }
      },
      padding: {
        lg: "8rem",
      },
      borderRadius: {
        default: "0.75rem",
      },
      fontFamily: {
        default: ["var(--font-lexend)", "system-ui", "sans-serif"],
        // default: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      aspectRatio: {
        'banner': '3 / 1',
      },
      animation: {
        // Hue rotate
        hue: "hue 1s ease-out",
        // Shimmer
        shimmer: "shimmer 1s ease-out infinite",
        // Fade up and down
        "fade-up": "fade-up 0.5s",
        "fade-down": "fade-down 0.5s",
        // Tooltip
        "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        hue: {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        // Fade up and down
        "fade-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: 0,
            transform: "translateY(-10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        // Tooltip
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: 0, transform: "translateY(-6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-inner-border"),
    plugin(({ addVariant }) => {
      addVariant("radix-side-top", '&[data-side="top"]');
      addVariant("radix-side-bottom", '&[data-side="bottom"]');
    }),
    plugin(function ({ addVariant }) {
      addVariant('low-fidelity', 'html.low-fidelity &')
    }),
    function ({ matchUtilities, theme }) {
      matchUtilities(
          {
            highlight: (value) => ({boxShadow: `inset 0 1px 0 0 ${value}`}),
          },
          {
            values: flattenColorPalette(theme('backgroundColor')),
            type: 'color',
          },
      )
    },
  ],
};
