import { Slider, Typography } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

const RHFSlider = <T extends FieldValues>({ name, label }: Props<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <Typography>{label}</Typography>
          <Slider {...field} valueLabelDisplay="auto" />
        </>
      )}
    />
  );
};

export default RHFSlider;
