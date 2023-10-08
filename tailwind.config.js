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
          1: 'rgba(0, 132, 255, 1)',
        },
        accent: {
          1: 'rgba(216, 76, 16, 1)',
          5: 'rgba(221, 167, 63, 1)',
        },
        n: {
          1: 'rgba(250, 250, 250, 1)',
          2: 'rgba(245, 245, 245, 1)',
          3: 'rgba(229, 229, 229, 1)',
          4: 'rgba(108, 114, 117, 1)',
          5: 'rgba(74, 74, 74, 1)',
          6: 'rgba(42, 42, 42, 1)',
          7: 'rgba(30, 30, 30, 1)',
          8: 'rgba(20, 20, 20, 1)',
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
