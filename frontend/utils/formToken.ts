import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * A short-lived, HMAC-signed stamp handed to the enrollment form when it
 * mounts and handed back when it submits.
 *
 * What it buys is a trustworthy clock: a form completed in under
 * `MIN_FORM_AGE_MS` was not filled in by a human reading it, and the stamp is
 * signed rather than merely sent along because an unsigned timestamp is a
 * number the caller picks.
 *
 * What it does NOT buy, despite the temptation to claim otherwise: proof that
 * the submitter loaded the page. `issueFormToken` is itself an unauthenticated
 * server action whose id is discoverable in the client bundle, so a bot can
 * mint a token directly, wait, and submit. Nor is a token single-use -- there
 * is no nonce, so one mint is replayable for the whole hour. This raises the
 * cost of abuse; it does not prevent it. The rate limit that would is issue
 * #10, deliberately left unbuilt.
 */

const SEPARATOR = ".";

/**
 * A whole token: digits, a dot, and a SHA-256 hex digest.
 *
 * Matched in one pass rather than split and inspected piecemeal, because the
 * signature has to be known-good hex before it reaches
 * `Buffer.from(.., "hex")` -- that silently drops invalid characters and would
 * hand `timingSafeEqual` a short buffer, which throws rather than returning
 * false.
 */
const TOKEN_PATTERN = /^(\d+)\.([0-9a-f]{64})$/;

/** Nobody reads this form, fills it in and submits it inside three seconds. */
export const MIN_FORM_AGE_MS = 3_000;

/**
 * Generous on purpose. The form is long -- personal details plus a dialog per
 * family member -- and a visitor who takes their time must not be punished for
 * it. An hour caps how long a single harvested token stays useful.
 */
export const MAX_FORM_AGE_MS = 60 * 60 * 1_000;

/**
 * Why a token was refused. Logged server-side to tell abuse apart from a real
 * visitor tripping a limit; never surfaced to the caller, who gets one
 * undifferentiated message so a bot learns nothing from being refused.
 */
export type FormTokenRejection =
  "expired" | "malformed" | "signature" | "tooFast";

const getSecret = (): string => {
  const secret = process.env.ENROLL_FORM_SECRET;

  if (!secret) {
    throw new Error("ENROLL_FORM_SECRET is not configured in environment.");
  }

  return secret;
};

const sign = (issuedAt: string): string =>
  createHmac("sha256", getSecret()).update(issuedAt).digest("hex");

export const createFormToken = (issuedAt: number = Date.now()): string => {
  const stamp = `${issuedAt}`;

  return `${stamp}${SEPARATOR}${sign(stamp)}`;
};

/**
 * Returns `null` when the token is good, or the reason it is not.
 */
export const verifyFormToken = (
  token: string,
  now: number = Date.now(),
): FormTokenRejection | null => {
  const match = TOKEN_PATTERN.exec(token);

  if (!match) {
    return "malformed";
  }

  const [, stamp, signature] = match;

  // Compared in constant time so the comparison itself does not leak how much
  // of a guessed signature was correct.
  const matches = timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(sign(stamp), "hex"),
  );

  if (!matches) {
    return "signature";
  }

  const age = now - Number(stamp);

  if (age < MIN_FORM_AGE_MS) {
    return "tooFast";
  }

  if (age > MAX_FORM_AGE_MS) {
    return "expired";
  }

  return null;
};
