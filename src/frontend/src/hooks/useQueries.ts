import { useMutation } from "@tanstack/react-query";
import type { PropertyType } from "../backend.d";
import { useActor } from "./useActor";

export function useSubmitInquiry() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      address: string;
      propertyType: PropertyType;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.submitInquiry(
        data.name,
        data.email,
        data.phone,
        data.address,
        data.propertyType,
        data.message,
      );
    },
  });
}
