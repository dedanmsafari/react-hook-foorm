import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import type { Option } from "../types/option";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

const RHFRadioGroup = <T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl {...field} error={!!error}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup>
            {options?.map((option) => (
              <FormControlLabel
                value={option.id}
                control={<Radio checked={field.value === option.id} />}
                label={option.label}
                key={option.id}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    />
  );
};

export default RHFRadioGroup;
