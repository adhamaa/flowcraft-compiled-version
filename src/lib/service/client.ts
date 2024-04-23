
import { clientRevalidateTag } from "./server";
import { datasource_mapping } from "@/constant/datasource";

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
  datasource_type = 'database'
}: {
  apps_label?: string;
  datasource_type: string;
}) => {
  if (!apps_label) return [];
  if (!datasource_type) return [];

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const endpoint = `${datasource_mapping[datasource_type]}/listCycleProcess?apps_label=${apps_label}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {

    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    next: { tags: ['cyclelist'] },
    // cache: 'no-store'
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to fetch cycle list.');
  }
  const data = await response.json();

  const stringifyObjectValues =
    data.result?.map((item: any) => ({
      ...item,
      cycle_created: new Date(item.cycle_created).toDateString(),
      cycle_updated: new Date(item.cycle_updated).toDateString(),
      app_label: item.app_label ?? 'N/A',
      app_name: item.app_name ?? 'N/A',
      cycle_name: item.cycle_name ?? 'N/A',
      no_of_stages: (item.no_of_stages).toString() ?? 'N/A',
      cycle_active: item.cycle_active == 1 ? 'Active' : 'Inactive',
      cycle_id: typeof (item.cycle_id) === 'number' ? (item.cycle_id).toString() : item.cycle_id,
    }));

  return await stringifyObjectValues;
};

export const getCycleInfo = async ({
  apps_label,
  cycle_id,
  datasource_type = 'database'
}: {
  apps_label?: string;
  cycle_id?: string;
  datasource_type: string;
}) => {
  // if (!apps_label) return {};
  // if (!cycle_id) return {};
  // if (!datasource_type) return {};

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const endpoint = `${datasource_mapping[datasource_type]}/listCycleProcess?apps_label=${apps_label}&cycle_id=${cycle_id}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    next: { tags: ['cycleinfo'] },
    // cache: 'no-store'
  });
  if (response.status === 404) {
    return [];
  }
  // if (!response.ok) {
  //   throw new Error('Failed to fetch cycle info.');
  // }
  const data = await response.json();

  const stringifyObjectValues =
    data.result?.reduce((acc: any, item: any) => ({
      ...acc,
      cycle_created: new Date(item.cycle_created).toDateString(),
      cycle_updated: new Date(item.cycle_updated).toDateString(),
      app_label: item.app_label ?? 'N/A',
      app_name: item.app_name ?? 'N/A',
      cycle_name: item.cycle_name ?? 'N/A',
      no_of_stages: (item.no_of_stages).toString() ?? 'N/A',
      cycle_active: item.cycle_active.toString(),
      cycle_id: typeof (item.cycle_id) === 'number' ? (item.cycle_id).toString() : item.cycle_id,
    }), {});

  return await stringifyObjectValues;
};


export const getStageList = async ({
  cycle_id,
  apps_label,
  datasource_type = 'database'
}: {
  cycle_id: string;
  apps_label: string;
  datasource_type: string;
}) => {
  if (!cycle_id) return [];
  if (!apps_label) return [];
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = `${datasource_mapping[datasource_type]}/mAllStage?cycle_id=${cycle_id}&app_type=${apps_label}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    next: { tags: ['stagelist'] },
    // cache: 'no-store'
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
  stage_uuid,
  cycle_id,
  apps_label,
  datasource_type = 'database'
}: {
  stage_uuid: string;
  cycle_id: string;
  apps_label: string;
  datasource_type: string;
}) => {
  // if (!stage_uuid) return {};
  console.log('stage_uuid:', stage_uuid)
  // if (!cycle_id) return {};
  console.log('cycle_id:', cycle_id)
  // if (!apps_label) return {};
  console.log('apps_label:', apps_label)
  // if (!datasource_type) return {};
  console.log('datasource_type:', datasource_type)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  //! have to change the endpoint 
  const endpoint = `${datasource_type === 'memory' ? '/businessProcessV2' : datasource_mapping[datasource_type]}/mCurrentStage?process_stage_uuid=${stage_uuid}&cycle_id=${cycle_id}&app_type=${apps_label}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    next: { tags: ['stageinfo', stage_uuid] },
    // cache: 'no-store'
  });
  if (response.status === 404) {
    return {};
  }
  // if (!response.ok) {
  //   throw new Error('Failed to fetch stage info.');
  // }
  const data = await response.json();
  return data;
};

export const updateCycle = async ({
  cycle_uuid,
  body
}: {
  cycle_uuid: string;
  body: { cycle_active: number; cycle_description: string };
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = `/businessProcessTmp/updateCycle?cycle_uuid=${cycle_uuid}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    body: (JSON.stringify({ active: body.cycle_active, descriptions: body.cycle_description })),
    next: { tags: ['updatecycle'] }
  });
  if (response.status === 404) {
    return [];
  }
  // if (!response.ok) {
  //   throw new Error('Failed to update cycle.');
  // }
  clientRevalidateTag('cyclelist');
  return response;
};

export const updateStage = async ({
  stage_uuid,
  field_name,
  body
}: {
  stage_uuid: string;
  field_name: string;
  body: { value: string };
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = `/businessProcessTmp/updateStage?field_name=${field_name}&stage_uuid=${stage_uuid}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    body: JSON.stringify({ value: body.value }),
    next: { tags: ['updatestage'] }
  });
  if (response.status === 404) {
    return [];
  }
  // if (!response.ok) {
  //   throw new Error('Failed to update stage.');
  // }
  // revalidateTag('stagelist');
  clientRevalidateTag('stagelist');
  return response;
};

export const verifySyntax = async ({ body }: { body: { str_test_syntax: string } }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = `/syntaxEngine/`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    body: JSON.stringify({ str_test_syntax: body.str_test_syntax }),
    next: { tags: ['evaluateSyntax'] }
  });
  if (response.status === 404) {
    return [];
  }
  // if (!response.ok) {
  //   throw new Error('Failed to evaluate semantic.');
  // }

  const data = await response.json();
  return data;
}

export const getErrorMessages = async ({ body }: { body: { list_error_no: number[] } }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = `/syntaxEngine/getErrorMessage/`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    body: JSON.stringify({ list_error_no: body.list_error_no }),
    next: { tags: ['errorMessages'] }
  });
  if (response.status === 404) {
    return [];
  }
  // if (!response.ok) {
  //   throw new Error('Failed to evaluate semantic.');
  // }

  const data = await response.json();
  return data;
}

export const testStageName = async ({ params }: { params: { stage_name: string; } }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = `/syntaxEngine/testStageName/?strText=${params.stage_name}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    next: { tags: ['testStageName'] }
  });
  if (response.status === 404) {
    return [];
  }
  // if (!response.ok) {
  //   throw new Error('Failed to evaluate semantic.');
  // }

  const data = await response.json();
  return data;
}

export const evaluateSemantics = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const endpoint = `/semanticEngine/`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    next: { tags: ['evaluateSemantics'] }
  });
  if (response.status === 404) {
    return [];
  }
  // if (!response.ok) {
  //   throw new Error('Failed to evaluate semantic.');
  // }

  const data = await response.text();
  return data;
}

export const reloadBizProcess = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const endpoint1 = `/businessProcess/uploadTableProcess/`;
  const endpoint2 = `/businessProcess/reCreateProcess`;
  const url1 = `${baseUrl}${endpoint1}`;
  const url2 = `${baseUrl}${endpoint2}`;

  const response1 = await fetch(url1, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    next: { tags: ['reloadBizProcess'] }
  });


  const data = await response1.json();

  if (data.status === 'success') {
    const response2 = await fetch(url2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
      },
      next: { tags: ['reloadBizProcess'] }
    })

    const data2 = await response2.json();
    return data2;
  }
}