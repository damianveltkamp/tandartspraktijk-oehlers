import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addVariant, addUtilities }) {
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("not-last", "&:not(:last-child)");
      addUtilities({
        ".main-grid": {
          "--main-grid-min-inline-space": "20px",
          "--main-grid-width": "1220px",
          "--main-grid-tracks": `[full-width-start] minmax(var(--main-grid-min-inline-space), 1fr) [content-start] clamp(0px, calc(100% - var(--main-grid-min-inline-space) * 2), var(--main-grid-width)) [content-end] minmax(var(--main-grid-min-inline-space), 1fr) [full-width-end]`,
          display: "grid",
          "grid-template-columns": "var(--main-grid-tracks)",
          "row-gap": "40px",
        },
        ".subgrid": {
          display: "grid",
          "grid-template-columns": "subgrid",
        },
        ".content-section": {
          "grid-column": "content",
        },
        ".full-width-section": {
          "grid-column": "full-width",
        },
        ".elevation-shadow": {
          "box-shadow": "3px 3px 4px rgba(24, 24, 27, 0.2);",
        },
        ".typography-hero-large": {
          "font-size": "var(--text-48)",
          "font-weight": "var(--font-weight-extra-bold)",
          "line-height": "1",
        },
        ".typography-headline-1": {
          "font-size": "var(--text-30)",
          "font-weight": "var(--font-weight-extra-bold)",
          "line-height": "1",
        },
        ".typography-headline-2": {
          "font-size": "var(--text-28)",
          "font-weight": "var(--font-weight-bold)",
          "line-height": "1",
        },
        ".typography-headline-3": {
          "font-size": "var(--text-22)",
          "font-weight": "var(--font-weight-bold)",
          "line-height": "1",
        },
        ".typography-body": {
          "font-size": "var(--text-18)",
          "font-weight": "var(--font-weight-regular)",
          "line-height": "1",
        },
        ".typography-body-emphasized": {
          "font-size": "var(--text-18)",
          "font-weight": "var(--font-weight-bold)",
          "line-height": "1",
        },
        ".typography-body-small": {
          "font-size": "var(--text-12)",
          "font-weight": "var(--font-weight-regular)",
          "line-height": "1",
        },
      });
    }),
  ],
} satisfies Config;
