'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { getApplicationList } from "@/lib/services";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const useData = () => {
  return {
    get: {
      applications: async () => {
        return useQuery({
          queryKey: ["applications"],
          queryFn: () => getApplicationList(),
        });
      },
      
    },
    set: {},
  };
};