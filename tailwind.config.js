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
