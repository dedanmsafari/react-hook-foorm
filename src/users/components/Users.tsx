import {
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { Schema, defaultValues, formSchema } from "../types/schema";

import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";
import RHFAutocomplete from "../../components/RHFAutocomplete";
import { useEffect } from "react";
import {
  useGender,
  useLanguages,
  useSkills,
  useStates,
  useUsers,
  useUser,
} from "../services/queries";
import RHFToggleButtonGroup from "../../components/RHFToggleButtonGroup";
import RHFRadioGroup from "../../components/RHFRadioGroup";
import RHFCheckbox from "../../components/RHFCheckbox";
import RHFDateTime from "../../components/RHFDateTime";
import RHFDateRangePicker from "../../components/RHFDateRangePicker";
import RHFSlider from "../../components/RHFSlider";
import RHFSwitch from "../../components/RHFSwitch";
import RHFTextFields from "../../components/RHFTextFields";
import React from "react";
import { useCreateUser, useEditUser } from "../services/mutations";

const Users = () => {
  const {
    watch,
    control,
    unregister,
    reset,
    setValue,
    handleSubmit,
    getValues,
  } = useFormContext<formSchema>();

  useEffect(() => {
    const sub = watch((value) => console.log(value));

    return () => {
      sub.unsubscribe();
    };
  }, [watch]);

  const states = useStates();
  const languages = useLanguages();
  const genders = useGender();
  const skills = useSkills();
  const users = useUsers();

  const createUser = useCreateUser();
  const editUser = useEditUser();

  const isTeacher = useWatch({ control, name: "isTeacher" });
  const id = useWatch({ control, name: "id" });
  const variant = useWatch({ control, name: "variant" });
  const user = useUser(id);

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: "students",
  });

  const handleUserClick = (id: string) => {
    setValue("id", id);
  };

  React.useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister("students");
    }
  }, [isTeacher, replace, unregister]);
  React.useEffect(() => {
    if (user.data) {
      reset(user.data);
    }
  }, [reset, user.data]);

  const handleReset = () => reset(defaultValues);

  const onSubmit: SubmitHandler<formSchema> = (data) => {
    if (variant === "create") {
      createUser.mutate(data);
    } else {
      editUser.mutate(data);
    }
  };

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {users.data?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => {
                  handleUserClick(user.id);
                }}
                selected={id === user.id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Stack sx={{ gap: 2 }}>
          <RHFTextFields<formSchema> name="name" label="Name" />
          <RHFTextFields<formSchema> name="email" label="Email" />
          <RHFAutocomplete<formSchema>
            name="states"
            label="States"
            options={states.data}
          />
          <RHFToggleButtonGroup<formSchema>
            name="languagesSpoken"
            options={languages.data}
          />
          <RHFRadioGroup<formSchema>
            name="gender"
            label="Gender"
            options={genders.data}
          />
          <RHFCheckbox<formSchema>
            name="skills"
            label="Skills"
            options={skills.data}
          />
          <RHFDateTime<formSchema>
            name="registrationDateTime"
            label="Registration Date"
          />
          <Typography>Former Employment Period:</Typography>
          <RHFDateRangePicker<formSchema> name="formerEmploymentPeriod" />
          <RHFSlider<formSchema> name="salaryRange" label="Salary Range" />
          <RHFSwitch<formSchema> name="isTeacher" label="Are you a Teacher" />
          {isTeacher && (
            <Button onClick={() => append({ name: "" })} type="button">
              Add New Student
            </Button>
          )}

          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <RHFTextFields<formSchema>
                name={`students.${index}.name`}
                label="Name"
              />
              <Button color="error" onClick={() => remove(index)} type="button">
                Remove
              </Button>
            </React.Fragment>
          ))}
          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button variant="contained" type="submit">
              {variant === "create" ? "New User" : "Edit User"}
            </Button>

            <Button onClick={() => Schema.parse(getValues())}>Parse</Button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Users;

// import { SubmitHandler, useFormContext } from "react-hook-form";
// import { formSchema } from "../types/schema";

// const Users = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useFormContext<formSchema>();

//   const submitInput: SubmitHandler<formSchema> = (data) => console.log(data);
//   return (
//     <form onSubmit={handleSubmit(submitInput)}>
//       <label>FirstName</label>
//       <input {...register("firstName")} />
//       <p>{errors.firstName?.message}</p>
//       <br />
//       <label>LastName</label>
//       <input {...register("lastName")} />
//       <br />
//       <label>Password</label>
//       <input {...register("password")} />
//       <br />
//       <label>Email</label>
//       <input {...register("email")} />
//       <br />
//       <label>Gender</label>
//       <select {...register("gender")}>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//       </select>
//       <br />
//       <input type="submit" />
//     </form>
//   );
// };

// export default Users;
