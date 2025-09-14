import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";

interface InputItemProps {
  label: string;
  value: string;
}

interface RadioProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> {
  errorMessage?: string;
  field: ControllerRenderProps<TFieldValues, TName>;
  inputKey: string;
  items: InputItemProps[];
}

const constructInputID = (inputKey: string, value: InputItemProps["value"]) => {
  return `${inputKey}-${value}`;
};

export const RadioGroup = <
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
>({
  inputKey,
  items,
  field,
  errorMessage,
}: RadioProps<TFieldValues, TName>) => {
  const errorTextId = `${inputKey}-error`;

  return (
    <div className="flex flex-col gap-5">
      <RadixRadioGroup.Root
        className="flex gap-15"
        name={field.name}
        onValueChange={field.onChange}
        aria-describedby={errorMessage ? errorTextId : undefined}
      >
        {items.map(({ value, label }) => {
          return (
            <div key={value} className="flex content-center gap-10">
              <RadixRadioGroup.Item
                value={value}
                className="data-[state=checked]:bg-primary size-[24px] rounded-full border border-gray-300"
                id={constructInputID(inputKey, value)}
              >
                <RadixRadioGroup.Indicator className="relative flex justify-center after:block after:h-[10px] after:w-[10px] after:rounded-full after:bg-white after:content-['']" />
              </RadixRadioGroup.Item>
              <label htmlFor={constructInputID(inputKey, value)}>{label}</label>
            </div>
          );
        })}
      </RadixRadioGroup.Root>
      {errorMessage && (
        <span className="text-red-600" id={errorTextId}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};
