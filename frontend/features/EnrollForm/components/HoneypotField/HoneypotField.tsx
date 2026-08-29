/**
 * Exported so the form reads the value back out of its own `FormData` under the
 * same key.
 *
 * Deliberately not a name any browser recognises. The tempting choice was
 * `bedrijfsnaam`, but "organization" is a standard autofill category and this
 * decoy sits in a form that already asks for street, house number, postcode and
 * city -- prime territory for address autofill. `autoComplete="off"` is a hint
 * Chrome and Safari feel free to ignore on exactly those forms, so a real
 * visitor could have had this filled in on their behalf and been refused for
 * it, unable to see or clear a field that is off-screen and `aria-hidden`.
 * A meaningless name maps to no category and is still an input an
 * indiscriminate bot will fill.
 */
export const HONEYPOT_FIELD_NAME = "aanvraagcode";

/**
 * @component HoneypotField
 *
 * A decoy input no visitor ever sees. Anything that fills it in is filling in
 * every field it can find, which a person reading the form cannot do.
 *
 * Hidden three ways, each doing a different job:
 *
 * - positioned off-screen rather than `display: none` or `hidden`, because the
 *   crawlers worth catching skip fields the browser reports as invisible
 * - `aria-hidden` and `tabIndex={-1}` so it is unreachable by screen reader and
 *   by keyboard -- a decoy that traps assistive-technology users is a bug
 * - `autoComplete="off"` to discourage autofill -- only a hint, which is why
 *   the field name carries no autofill meaning either
 *
 * Left uncontrolled and read out of the form's own `FormData` at submit time,
 * which keeps it out of react-hook-form's state and out of the enrollment
 * payload's type.
 */
export const HoneypotField = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute top-0 -left-[9999px] h-px w-px overflow-hidden"
    >
      <label htmlFor={HONEYPOT_FIELD_NAME}>Aanvraagcode</label>
      <input
        id={HONEYPOT_FIELD_NAME}
        name={HONEYPOT_FIELD_NAME}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
};
