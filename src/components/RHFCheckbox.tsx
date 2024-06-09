import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import type { Option } from "../types/option";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  FormHelperText,
} from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

const RHFCheckbox = <T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <FormLabel>{label}</FormLabel>
          <FormGroup>
            {options?.map((option) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value.includes(option.id)}
                    onChange={() => {
                      if (value.includes(option.id)) {
                        onChange(
                          (value as string[]).filter(
                            (item) => item !== option.id
                          )
                        );
                      } else {
                        onChange([...value, option.id]);
                      }
                    }}
                  />
                }
                key={option.id}
                label={option.label}
              />
            ))}
          </FormGroup>
          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default RHFCheckbox;
