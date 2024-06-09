import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formSchema } from "../types/schema";
import axios from "axios";
import omit from "lodash/omit";

import { mapData } from "../utils/mapData";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: formSchema) => {
      console.log(data);
      await axios.post(
        "http://localhost:8080/users",
        omit(mapData(data), "variant")
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      alert("User Created");
    },
  });
}

export function useEditUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: formSchema) => {
      if (data.variant === "edit") {
        await axios.put(
          `http://localhost:8080/users/${data.id}`,
          omit(mapData(data), "variant")
        );
        alert("User Edited Successfully");
      }
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      if (variables.variant === "edit") {
        await queryClient.invalidateQueries({
          queryKey: ["user", { id: variables.id }],
        });
      }
    },
  });
}
