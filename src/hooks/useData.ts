'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { getApplicationList, getCycleList, getStageInfo, getStageList, updateCycle } from "@/lib/services";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const useData = () => {
  return {
    get: {
      application: {
        all: async () => {
          return useQuery({
            queryKey: ["applications"],
            queryFn: () => getApplicationList(),
          });
        },
      },
      cycle: {
        all: async ({
          apps_label,
          cycle_id
        }: {
          apps_label?: string;
          cycle_id?: number
        }) => {
          return useQuery({
            queryKey: ["cycles", apps_label, cycle_id],
            queryFn: () => getCycleList({
              apps_label,
              cycle_id
            }),
          });
        },
        one: async ({
          apps_label,
          cycle_id
        }: {
          apps_label: string;
          cycle_id: number | undefined;
        }) => {
          return useQuery({
            queryKey: ["cycles", apps_label, cycle_id],
            queryFn: () => getCycleList({
              apps_label,
              cycle_id
            }),
          });
        }
      },
      stage: {
        all: async ({
          cycle_id,
          apps_label
        }: {
          cycle_id: number | undefined;
          apps_label: string;
        }) => {
          return useQuery({
            queryKey: ["stages", cycle_id, apps_label],
            queryFn: () => getStageList({
              cycle_id,
              apps_label
            }),
          });
        },
        one: async ({
          stage_uuid,
          cycle_id,
          apps_label
        }: {
          stage_uuid: string;
          cycle_id: number | undefined;
          apps_label: string;
        }) => {
          return useQuery({
            queryKey: ["stages", stage_uuid, cycle_id, apps_label],
            queryFn: () => getStageInfo({
              stage_uuid,
              cycle_id,
              apps_label
            }),
          });
        },
      },
    },
    set: {
      cycle: {
        one: async () => {
          return useMutation({
            mutationFn: updateCycle,
          });
        },
      },
      stage: {
        one: async () => {
          return useMutation({
            mutationFn: getStageInfo,
          });
        },
      },
    }
  };
};