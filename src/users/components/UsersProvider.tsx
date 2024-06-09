import { useForm, FormProvider } from "react-hook-form";
import Users from "./Users";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, defaultValues, formSchema } from "../types/schema";

const UsersProvider = () => {
  const methods = useForm<formSchema>({
    mode: "all",
    resolver: zodResolver(Schema),
    defaultValues,
  });
  return (
    <FormProvider {...methods}>
      <Users />
      <DevTool control={methods.control} />
    </FormProvider>
  );
};

export default UsersProvider;
