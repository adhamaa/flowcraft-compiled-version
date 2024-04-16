'use server';

import { revalidateTag } from "next/cache";

// export const getStageList = async ({
//   cycle_id,
//   apps_label
// }: {
//   cycle_id: number | undefined;
//   apps_label: string;
// }) => {
//   if (!cycle_id) return [];
//   if (!apps_label) return [];
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   const endpoint = `/businessProcessTmp/mAllStage?cycle_id=${cycle_id}&app_type=${apps_label}`;
//   const url = `${baseUrl}${endpoint}`;
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
//     },
//     next: { tags: ['stagelist'] }
//     // cache: 'no-store'
//   });
//   if (response.status === 404) {
//     return [];
//   }
//   if (!response.ok) {
//     throw new Error('Failed to fetch stage list.');
//   }
//   const data = await response.json();
//   return data;
// };

// export const updateCycle = async ({
//   cycle_uuid,
//   body
// }: {
//   cycle_uuid: string;
//   body: { cycle_active: number; cycle_description: string };
// }) => {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   const endpoint = `/businessProcess/updateCycle?cycle_uuid=${cycle_uuid}`;
//   const url = `${baseUrl}${endpoint}`;
//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
//     },
//     body: (JSON.stringify({ active: body.cycle_active, descriptions: body.cycle_description })),
//     next: { tags: ['updatecycle'] }
//   });
//   if (response.status === 404) {
//     return [];
//   }
//   // if (!response.ok) {
//   //   throw new Error('Failed to update cycle.');
//   // }
//   revalidateTag('cyclelist');
//   return response;
// };

// export const updateStage = async ({
//   stage_uuid,
//   field_name,
//   body
// }: {
//   stage_uuid: string;
//   field_name: string;
//   body: { value: string };
// }) => {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   const endpoint = `/businessProcess/update?field_name=${field_name}&stage_uuid=${stage_uuid}`;
//   const url = `${baseUrl}${endpoint}`;
//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
//     },
//     body: JSON.stringify({ value: body.value }),
//     next: { tags: ['updatestage'] }
//   });
//   if (response.status === 404) {
//     return [];
//   }
//   // if (!response.ok) {
//   //   throw new Error('Failed to update stage.');
//   // }
//   revalidateTag('stagelist');
//   return response;
// };

// export const setConsoleLog = async (data: any) => {
//   console.log(JSON.stringify(data));
// }

// export const revalidateGetStageInfo = async () => {
//   revalidateTag('stageinfo');
// }

// export const revalidateGetStageList = async () => {
//   revalidateTag('stagelist');
// }

export const clientRevalidateTag = (tag: string) => {
  revalidateTag(tag);
}