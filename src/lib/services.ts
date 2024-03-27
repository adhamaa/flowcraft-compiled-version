'use server';

export const getApplicationList = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = '/businessProcess/listAppsBizProcess';
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    next: { tags: ['applist'] }
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to fetch application list.');
  }
  const data = await response.json();
  return data.result;
};

export const getCycleList = async ({
  apps_label,
  cycle_id
}: {
  apps_label?: string;
  cycle_id?: number
}) => {
  if (!apps_label) return [];

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const endpoint = `/businessProcess/listCycleProcess?apps_label=${apps_label}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {

    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    next: { tags: ['cyclelist'] }
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to fetch cycle list.');
  }
  const data = await response.json();

  const stringifyObjectValues = cycle_id ?
    // data.result.map((item: any) => ({
    //   ...item,
    //   cycle_created: new Date(item.cycle_created).toDateString(),
    //   cycle_updated: new Date(item.cycle_updated).toDateString(),
    //   app_label: item.app_label ?? 'N/A',
    //   app_name: item.app_name ?? 'N/A',
    //   cycle_name: item.cycle_name ?? 'N/A',
    //   no_of_stages: (item.no_of_stages).toString() ?? 'N/A',
    //   cycle_active: (item.cycle_active).toString() ? 'Active' : 'Inactive',
    //   cycle_id: (item.cycle_id).toString(),
    // }))
    data.result.find((item: any) => item.cycle_id === cycle_id) :
    data.result.map((item: any) => ({
      ...item,
      cycle_created: new Date(item.cycle_created).toDateString(),
      cycle_updated: new Date(item.cycle_updated).toDateString(),
      app_label: item.app_label ?? 'N/A',
      app_name: item.app_name ?? 'N/A',
      cycle_name: item.cycle_name ?? 'N/A',
      no_of_stages: (item.no_of_stages).toString() ?? 'N/A',
      cycle_active: (item.cycle_active).toString() ? 'Active' : 'Inactive',
      cycle_id: (item.cycle_id).toString(),
    }));

  return stringifyObjectValues;
};

// const getCycleInfo = async ({ cycle_id }: { cycle_id: string }) => {
//   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
//   const endpoint = `/businessProcess/getCycleProcess?cycle_id=${cycle_id}`;
//   const url = `${baseUrl}${endpoint}`;
//   const response = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
//     },
//     next: { tags: ['cycleinfo'] }
//   });
//   if (!response.ok) {
//     throw new Error('Failed to fetch cycle info.');
//   }
//   const data = await response.json();
//   return data.result;
// };

export const getStageList = async ({
  cycle_id,
  apps_label
}: {
  cycle_id: number | undefined;
  apps_label: string;
}) => {
  if (!cycle_id) return [];
  if (!apps_label) return [];
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = `/businessProcessTmp/mAllStage?cycle_id=${cycle_id}&app_type=${apps_label}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    next: { tags: ['stagelist'] }
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to fetch stage list.');
  }
  const data = await response.json();
  return data;
};

export const getStageInfo = async ({
  stage_id,
  cycle_id,
  apps_label
}: {
  stage_id: string;
  cycle_id: string;
  apps_label: string;
}) => {
  if (!stage_id) return {};
  if (!cycle_id) return {};
  if (!apps_label) return {};
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = `/businessProcessTmp/mCurrentStage?process_stage_uuid=${stage_id}&cycle_id=${cycle_id}&app_type=${apps_label}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    next: { tags: ['stageinfo'] }
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to fetch stage info.');
  }
  const data = await response.json();
  return data;
};