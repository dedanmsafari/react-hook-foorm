import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import type { Option } from "../types/option";
import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options?: Option[];
};

const RHFAutocomplete = <T extends FieldValues>({
  name,
  label,
  options,
}: Props<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <Autocomplete
          options={options || []}
          value={value.map((id: string) =>
            options?.find((item) => item.id === id)
          )}
          getOptionLabel={(option) =>
            options?.find((item) => item.id === option.id)?.label ?? ""
          }
          isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
          onChange={(_, newValue) => {
            onChange(newValue.map((item) => item.id));
          }}
          disableCloseOnSelect
          multiple
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              inputRef={ref}
              error={!!error}
              helperText={error?.message}
              label={label}
            />
          )}
          renderOption={(props, option, { selected }) => (
            <Box component="li" key={option.label} {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                checked={selected}
              />
              {option.label}
            </Box>
          )}
        />
      )}
    />
  );
};

export default RHFAutocomplete;
