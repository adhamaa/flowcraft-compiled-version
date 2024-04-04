/* eslint-disable react-hooks/rules-of-hooks */
import { getApplicationList } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";

export const useData = () => {
  return {
    get: {
      applications: async () => {
        return useQuery({
          queryKey: ["applications"],
          queryFn: async () => getApplicationList(),
        });
      }
    },
    set: {},
  };
};