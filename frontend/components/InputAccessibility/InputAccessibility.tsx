interface InputErrorProps {
  errorMessage: string | undefined;
  errorTextId: string;
}

interface InputHintProps {
  hintText: string | undefined;
  hintTextId: string;
}

export const InputError = ({ errorMessage, errorTextId }: InputErrorProps) => {
  return (
    <>
      {errorMessage && (
        <span className="text-red-600" id={errorTextId}>
          {errorMessage}
        </span>
      )}
    </>
  );
};
export const InputHint = ({ hintText, hintTextId }: InputHintProps) => {
  return (
    <>
      {hintText && (
        <span className="typography-body-small" id={hintTextId}>
          {hintText}
        </span>
      )}
    </>
  );
};
