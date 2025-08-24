export const inputGetAriaDescribedBy = (
  hasError: boolean,
  hasHintText: boolean,
  hintTextId: string,
  errorTextId: string,
) => {
  if (hasError && hasHintText) {
    return `${errorTextId} ${hintTextId}`;
  }

  if (hasError && !hasHintText) {
    return errorTextId;
  }

  return hintTextId;
};
