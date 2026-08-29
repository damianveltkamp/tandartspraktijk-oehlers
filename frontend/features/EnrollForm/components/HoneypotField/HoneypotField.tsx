/**
 * Named to look worth filling in. Exported so the form reads the value back out
 * of its own `FormData` under the same key.
 */
export const HONEYPOT_FIELD_NAME = "bedrijfsnaam";

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
 * - `autoComplete="off"` so a browser's own address autofill does not fill it
 *   in on a real visitor's behalf and get them refused
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
      <label htmlFor={HONEYPOT_FIELD_NAME}>Bedrijfsnaam</label>
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
