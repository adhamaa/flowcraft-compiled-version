
import { clientRevalidateTag } from "./server";
import { datasource_mapping } from "@/constant/datasource";

// const baseUrl = process.env.NEXT_PUBLIC_M1_API_URL;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getApplicationList = async () => {
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
  // if (!cycle_id) return {};
  // if (!apps_label) return {};
  // if (!datasource_type) return {};
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

export const getSyntaxErrorMessages = async ({ params }: { params: { error_message_uuid: string } }) => {
  const urlParams = new URLSearchParams({ error_message_uuid: params.error_message_uuid });
  const endpoint = `/syntaxEngine/getErrorMessage/?${urlParams.toString()}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
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

export const evaluateSemantics = async ({ body }: { body: { str_test_semantic: string } }) => {
  const endpoint = `/semanticEngine/`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    body: JSON.stringify({ str_test_semantic: body.str_test_semantic }),
    next: { tags: ['evaluateSemantics'] }
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

export const getSemanticsErrorMessages = async ({ params }: { params: { error_message_uuid: string } }) => {
  const urlParams = new URLSearchParams({ error_message_uuid: params.error_message_uuid });
  const endpoint = `/semanticEngine/getErrorMessage/?${urlParams.toString()}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
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

export const reloadBizProcess = async (baseUrlIndex = 0): Promise<{ message: string }> => {
  const baseUrl = [process.env.NEXT_PUBLIC_M1_API_URL, process.env.NEXT_PUBLIC_M2_API_URL]

  if (baseUrlIndex >= baseUrl.length) {
    return { message: 'Business process reloaded successfully.' };
  }

  const url = baseUrl[baseUrlIndex];
  await uploadNCreate(url);

  // Call recursively with the next index
  return reloadBizProcess(baseUrlIndex + 1);
};


async function uploadNCreate(baseUrl: string | undefined) {
  const uploadTableProcessPath = `/businessProcess/uploadTableProcess/`;
  const reCreateProcessPath = `/businessProcess/reCreateProcess`;
  const uploadTableProcessPathUrl = `${baseUrl}${uploadTableProcessPath}`;
  const reCreateProcessPathUrl = `${baseUrl}${reCreateProcessPath}`;

  return await fetch(uploadTableProcessPathUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
    },
    next: { tags: ['uploadTableProcess'] }
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error('Failed to reload business process (uploadTableProcess).');
    }

    return await fetch(reCreateProcessPathUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + process.env.NEXT_PUBLIC_API_PASSWORD).toString('base64')}`
      },
      next: { tags: ['reCreateProcess'] }
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('Failed to reload business process (reCreateProcess).');
      }

      return {
        url: baseUrl,
        message: 'Business process reloaded successfully.',
        result: await (await response.json()).result
      };
    });
  });
}



const isValidJSON = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};