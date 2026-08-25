"use client";

import { useEffect } from "react";

import { PRACTICE_PHONE } from "@/constants/practice";

/**
 * Fires when the root layout itself fails, which means it replaces the layout
 * rather than rendering inside it: no header, no footer, and none of the data
 * the layout fetches. It also renders its own `html` and `body`, so it never
 * inherits the `lang` attribute or the fonts set there.
 *
 * That is also why the styling is inline rather than Tailwind. The stylesheet
 * is imported by the layout this boundary is standing in for, so nothing
 * guarantees it has loaded by the time this renders. Inline styles keep the
 * page readable no matter what went wrong upstream.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="nl">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "#ffffff",
          color: "#18181b",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
          lineHeight: 1.5,
        }}
      >
        <main style={{ maxWidth: "560px" }}>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: 800,
              lineHeight: 1.1,
              margin: "0 0 15px",
            }}
          >
            Er is iets misgegaan
          </h1>
          <p style={{ fontSize: "18px", margin: "0 0 25px" }}>
            Door een technische storing kon de website niet worden geladen.
            Probeer het opnieuw. Lukt dat niet, neem dan telefonisch contact op
            met de praktijk.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                fontSize: "18px",
                fontFamily: "inherit",
                color: "inherit",
                border: 0,
                borderRadius: "8px",
                padding: "15px 40px",
                backgroundColor: "#80bddf",
                cursor: "pointer",
              }}
            >
              Probeer opnieuw
            </button>
            <a
              href={PRACTICE_PHONE.href}
              style={{
                fontSize: "18px",
                color: "inherit",
                borderRadius: "8px",
                padding: "15px 40px",
                backgroundColor: "#ff88c2",
                textDecoration: "none",
              }}
            >
              Bel {PRACTICE_PHONE.display}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
