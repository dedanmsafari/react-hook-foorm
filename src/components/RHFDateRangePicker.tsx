import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
};

const RHFDateRangePicker = <T extends FieldValues>({ name }: Props<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...restFields } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            {...restFields}
            value={Array.isArray(value) ? value : [null, null]}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default RHFDateRangePicker;
