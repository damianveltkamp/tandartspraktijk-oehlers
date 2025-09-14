interface InputLabelProps {
  inputKey: string;
  label: string;
  required: boolean;
}
export const InputLabel = ({ label, required, inputKey }: InputLabelProps) => {
  return (
    <label className="typography-body" htmlFor={inputKey}>
      {required ? (
        <>
          {label} <span aria-describedby="form-required-input">*</span>
        </>
      ) : (
        label
      )}
    </label>
  );
};
