"use client";

import { useEffect } from "react";

import { Button, LinkButton } from "@/components/Button/Button";
import { ErrorPage } from "@/features/ErrorPage/ErrorPage";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The message is stripped from production builds, so the digest is what
    // ties a visitor's report back to a server-side log entry.
    console.error(error);
  }, [error]);

  return (
    <ErrorPage
      title="Er is iets misgegaan"
      description="Door een technische storing konden we deze pagina niet laden. Probeer het opnieuw. Lukt dat niet, neem dan telefonisch contact op met de praktijk."
    >
      <Button onClick={reset} type="button">
        Probeer opnieuw
      </Button>
      <LinkButton isExternal={false} href="/" variant="secondary">
        Terug naar de homepage
      </LinkButton>
    </ErrorPage>
  );
}
