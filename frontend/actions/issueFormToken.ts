"use server";

import { createFormToken } from "@/utils/formToken";

/**
 * Hands the enrollment form a freshly signed token.
 *
 * This exists as an action rather than a prop on the page because
 * `/inschrijven` is statically prerendered: a token produced while rendering
 * that page would be a build-time constant, identical for every visitor and
 * stale within the hour. Minting it on mount keeps the page static and gives
 * the server an honest render time to check against.
 */
export async function issueFormToken(): Promise<string> {
  return createFormToken();
}
