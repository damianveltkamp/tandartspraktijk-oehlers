import z from "zod";

/**
 * The anti-abuse fields that travel alongside an enrollment submission.
 *
 * Deliberately kept out of `enrollValidationSchema`: that schema models the
 * patient data the practice actually receives, and `EnrollFormValues` is
 * threaded through the form, the family-member dialog and the mail template.
 * Widening it with spam plumbing would put a honeypot in the shape of a
 * patient.
 */
export const enrollGuardSchema = z.object({
  /**
   * Must be empty. A visitor never sees this field, so anything in it was put
   * there by something filling in every input it could find.
   */
  honeypot: z.string(),
  token: z.string(),
});

export type EnrollGuardValues = z.infer<typeof enrollGuardSchema>;

/**
 * Shown for every reason a submission is refused -- filled honeypot, bad
 * signature, too fast, expired. Uniform on purpose: a bot must not be able to
 * tell which check caught it and tune around it. The reason is written to the
 * server log instead.
 */
export const ENROLL_REJECTED_MESSAGE =
  "Uw aanmelding kon niet worden verwerkt. Probeer het over een paar minuten opnieuw, of neem telefonisch contact op met de praktijk.";
