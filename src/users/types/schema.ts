import { z } from "zod";
import { patterns } from "../../constants";

export const Schema = z
  .intersection(
    z.object({
      name: z
        .string()
        .min(2, { message: "firstName cannot be less than 2 characters " }),
      email: z
        .string()
        .min(5, { message: "Email cannot be less than 5 character" })
        .refine((text) => patterns.email.test(text), {
          message: "Email is not a valid email",
        }),
      states: z.array(z.string()).min(1).max(2),
      languagesSpoken: z.array(z.string()),
      gender: z.string().min(1),
      skills: z.array(z.string()).max(2),
      registrationDateTime: z.date(),
      formerEmploymentPeriod: z.array(z.date()).min(2).max(2),
      salaryRange: z.array(z.number()).max(2),
    }),
    z.discriminatedUnion("variant", [
      z.object({ variant: z.literal("create") }),
      z.object({ variant: z.literal("edit"), id: z.string().min(1) }),
    ])
  )
  .and(
    z.union([
      z.object({ isTeacher: z.literal(false) }),
      z.object({
        isTeacher: z.literal(true),
        students: z.array(z.object({ name: z.string().min(4) })),
      }),
    ])
  );

export type formSchema = z.infer<typeof Schema>;

export const defaultValues: formSchema = {
  variant: "create",
  name: "",
  email: "",
  states: [],
  languagesSpoken: [],
  gender: "",
  skills: [],
  registrationDateTime: new Date(),
  formerEmploymentPeriod: [new Date(), new Date()],
  salaryRange: [0, 2000],
  isTeacher: false,
};
