import { TextField, TextFieldProps } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
} & Pick<TextFieldProps, "label">;

const RHFTextFields = <T extends FieldValues>({ name, ...props }: Props<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            {...field}
            {...props}
            helperText={error?.message}
            error={!!error}
          />
        </>
      )}
    />
  );
};

export default RHFTextFields;
