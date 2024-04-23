'use client';

/* eslint-disable react-hooks/rules-of-hooks */
import { getApplicationList, getCycleInfo, getCycleList, getStageInfo, getStageList, updateCycle } from "@/lib/service/client";
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
          datasource_type
        }: {
          apps_label?: string;
          datasource_type: string;
        }) => {
          return useQuery({
            queryKey: ["cycles", apps_label],
            queryFn: () => getCycleList({
              apps_label,
              datasource_type
            }),
          });
        },
        one: async ({
          apps_label,
          cycle_id,
          datasource_type
        }: {
          apps_label: string;
          cycle_id: string;
          datasource_type: string;
        }) => {
          return useQuery({
            queryKey: ["cycles", apps_label, cycle_id],
            queryFn: () => getCycleInfo({
              apps_label,
              cycle_id,
              datasource_type
            }),
          });
        }
      },
      stage: {
        all: async ({
          cycle_id,
          apps_label,
          datasource_type
        }: {
          cycle_id: string;
          apps_label: string;
          datasource_type: string;
        }) => {
          return useQuery({
            queryKey: ["stages", cycle_id, apps_label],
            queryFn: () => getStageList({
              cycle_id,
              apps_label,
              datasource_type
            }),
          });
        },
        one: async ({
          stage_uuid,
          cycle_id,
          apps_label,
          datasource_type
        }: {
          stage_uuid: string;
          cycle_id: string;
          apps_label: string;
          datasource_type: string;
        }) => {
          return useQuery({
            queryKey: ["stages", stage_uuid, cycle_id, apps_label],
            queryFn: () => getStageInfo({
              stage_uuid,
              cycle_id,
              apps_label,
              datasource_type
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