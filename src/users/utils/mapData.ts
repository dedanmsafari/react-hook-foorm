import { ApiCommon, ApiCreateEdit } from "../types/apiTypes";
import { formSchema } from "../types/schema";

export const mapData = (data: formSchema): ApiCreateEdit => {
  const common: ApiCommon = {
    email: data.email,
    formerEmploymentPeriod: [
      data.formerEmploymentPeriod[0].toString(),
      data.formerEmploymentPeriod[1].toString(),
    ],
    name: data.name,
    gender: data.gender,
    languagesSpoken: data.languagesSpoken,
    registrationDateTime: data.registrationDateTime.toString(),
    salaryRange: [data.salaryRange[0], data.salaryRange[1]],
    skills: data.skills,
    states: data.states,
    isTeacher: data.isTeacher,
    students: data.isTeacher === true ? data.students : [],
  };

  switch (data.variant) {
    case "create": {
      return { ...common, variant: data.variant };
    }
    case "edit": {
      return { ...common, variant: data.variant, id: Number(data.id) };
    }
  }
};
