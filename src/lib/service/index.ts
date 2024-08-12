
'use server';

import { decryptPassword } from "../crypt";
import { clientRevalidateTag } from "./helper";
import { datasource_mapping } from "@/constant/datasource";

export type Datasource_type = 'database' | 'memory' | 'cache';
export type Apps_label = 'SP' | 'Client';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const apiPassword = decryptPassword(process.env.NEXT_PUBLIC_API_PASSWORD);

export const getApplicationList = async () => {
  const endpoint = '/businessProcess/listAppsBizProcess';
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
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
  apps_label?: Apps_label;
  datasource_type: Datasource_type;
}) => {
  if (!apps_label) return [];
  if (!datasource_type) return [];


  const endpoint = `${datasource_mapping[datasource_type]}/listCycleProcess?apps_label=${apps_label}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {

    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['cyclelist'] },
    cache: 'no-store'
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to fetch cycle list.');
  }
  const data = await response.json();

  const stringifyObjectValues =
    data.result?.map((item: {
      app_label: string;
      app_name: string;
      app_sys_code: string;
      app_uuid: string;
      cycle_active: number,
      cycle_created: string;
      cycle_description: string;
      cycle_id: number,
      cycle_name: string;
      cycle_updated: string;
      cycle_uuid: string;
      no_of_stages: number
    }) => ({
      ...item,
      cycle_created: new Date(item.cycle_created).toDateString(),
      cycle_updated: new Date(item.cycle_updated).toDateString(),
      app_label: item.app_label ?? 'N/A',
      app_name: item.app_name ?? 'N/A',
      cycle_name: item.cycle_name ?? 'N/A',
      no_of_stages: (item.no_of_stages).toString() ?? 'N/A',
      cycle_active: getStatusRef(item.cycle_active),
      cycle_id: typeof (item.cycle_id) === 'number' ? (item.cycle_id).toString() : item.cycle_id,
      cycle_uuid: item.cycle_uuid ?? 'N/A',
      cycle_description: item.cycle_description ?? 'N/A',
      app_sys_code: item.app_sys_code ?? 'N/A',
      app_uuid: item.app_uuid ?? 'N/A',
    }));

  return await stringifyObjectValues;
};

export const getCycleInfo = async ({
  apps_label,
  cycle_id,
  datasource_type = 'database'
}: {
  apps_label: Apps_label;
  cycle_id: string;
  datasource_type?: Datasource_type;
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
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['cycleinfo'] },
  });
  if (response.status === 404) {
    return [];
  }
  // if (!response.ok) {
  //   throw new Error('Failed to fetch cycle info.');
  // }
  const data = await response.json();

  const stringifyObjectValues =
    data.result?.reduce((acc: any, item: {
      app_label: Apps_label;
      app_name: string;
      app_sys_code: string;
      app_uuid: string;
      cycle_active: number,
      cycle_created: string;
      cycle_description: string;
      cycle_id: number,
      cycle_name: string;
      cycle_updated: string;
      cycle_uuid: string;
      no_of_stages: number
    }) => ({
      ...acc,
      cycle_created: new Date(item.cycle_created).toDateString(),
      cycle_updated: new Date(item.cycle_updated).toDateString(),
      app_label: item.app_label ?? 'N/A',
      app_name: item.app_name ?? 'N/A',
      cycle_name: item.cycle_name ?? 'N/A',
      no_of_stages: (item.no_of_stages).toString() ?? 'N/A',
      cycle_active: item.cycle_active.toString(),
      cycle_id: typeof (item.cycle_id) === 'number' ? (item.cycle_id).toString() : item.cycle_id,
      cycle_uuid: item.cycle_uuid ?? 'N/A',
      cycle_description: item.cycle_description ?? 'N/A',
      app_sys_code: item.app_sys_code ?? 'N/A',
      app_uuid: item.app_uuid ?? 'N/A',
    }), {});

  return await stringifyObjectValues;
};

export const getStatusRef = async (status_code: number) => {
  const endpoint = `/businessProcessTmp/statusRef?status_code=${status_code}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {

    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['statusref'] },
    cache: 'no-store'
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to fetch status reference.');
  }
  const data = await response.json();
  return data.result.descriptions;
};

export const getStatusRefList = async () => {
  const endpoint = '/businessProcessTmp/statusRef';
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {

    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['statusreflist'] },
    cache: 'no-store'
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to fetch status reference.');
  }
  const data = await response.json();
  return data.result;
};

export const getStageList = async ({
  cycle_id,
  apps_label,
  datasource_type = 'database'
}: {
  cycle_id: string;
  apps_label: Apps_label;
  datasource_type?: Datasource_type;
}) => {
  if (!cycle_id) return [];
  if (!apps_label) return [];
  const endpoint = `${datasource_mapping[datasource_type]}/mAllStage?cycle_id=${cycle_id}&app_type=${apps_label}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['stagelist'] },
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

export const getDeletedStageList = async ({
  cycle_id,
  apps_label,
  datasource_type = 'database'
}: {
  cycle_id: string;
  apps_label: Apps_label;
  datasource_type?: Datasource_type;
}) => {
  if (!cycle_id) return [];
  if (!apps_label) return [];
  const endpoint = `${datasource_mapping[datasource_type]}/deletedStage?cycle_id=${cycle_id}&app_type=${apps_label}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['deletedstagelist'] },
    // cache: 'no-store'
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to fetch deleted stage list.');
  }
  const data = await response.json();
  return data;
}

export const getStageInfo = async ({
  stage_uuid,
  cycle_id,
  apps_label,
  datasource_type = 'database'
}: {
  stage_uuid: string;
  cycle_id: string;
  apps_label: Apps_label;
  datasource_type: Datasource_type;
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
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['stageinfo', stage_uuid] },
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

export const getDiagramData = async ({
  cycle_id,
  apps_label,
  datasource_type = 'database'
}: {
  cycle_id: string;
  apps_label: Apps_label;
  datasource_type?: string;
}) => {
  const endpoint = `/businessProcess/diagramData?cycle_id=${cycle_id}&app_type=${apps_label}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['diagramdata'] },
  });
  if (response.status === 404) {
    return [];
  }
  // if (!response.ok) {
  //   throw new Error('Failed to fetch diagram data.');
  // }
  const data = await response.json();
  return data;
}

export const updateCycle = async ({
  cycle_uuid,
  body
}: {
  cycle_uuid: string;
  body: { cycle_active?: number; cycle_description: string };
}) => {
  const endpoint = `/businessProcessTmp/updateCycle?cycle_uuid=${cycle_uuid}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
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
  return await response.json();
};

export const updateStatusCycle = async ({
  cycle_id,
  status_code
}: {
  cycle_id: string;
  status_code: string;
}) => {
  const endpoint = `/businessProcessTmp/updateStatusCycle?cycle_id=${cycle_id}&status_code=${status_code}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['updatestatuscycle'] }
  });
  if (response.status === 404) {
    return [];
  }
  // if (!response.ok) {
  //   throw new Error('Failed to update cycle status.');
  // }
  clientRevalidateTag('cyclelist');
  return await response.json();
}

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
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
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
  return await response.json();
};

export const verifySyntax = async ({ body }: { body: { str_test_syntax: string } }) => {
  const endpoint = `/syntaxEngine/`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    body: JSON.stringify({ str_test_syntax: body.str_test_syntax }),
    next: { tags: ['evaluatesyntax'] }
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
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['errorsyntaxmessages'] }
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

export const testSyntaxStageName = async ({ params }: { params: { stage_name: string; } }) => {
  const endpoint = `/syntaxEngine/testStageName/?strText=${params.stage_name}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['testsyntaxstagename'] }
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

export const evaluateSemantics = async ({ body }: { body: { str_test_semantic: string; current_stage: string; current_key: string; } }) => {
  const endpoint = `/semanticEngine/`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    body: JSON.stringify({ str_test_semantic: body.str_test_semantic, current_stage: body.current_stage, current_key: body.current_key }),
    next: { tags: ['evaluatesemantics'] }
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
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['errorsemanticmessages'] }
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

export const testSemanticStageName = async ({ params }: { params: { stage_name: string; cycle_id: string; } }) => {
  const endpoint = `/semanticEngine/testStageName/?strText=${params.stage_name}&intCycleId=${params.cycle_id}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['testsemanticstagename'] }
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

export const reloadBizProcess = async (options?: {
  cycle_id?: string;
  apps_label?: Apps_label;
}, baseUrlIndex = 0): Promise<{ message: string }> => {
  const { cycle_id, apps_label } = options ?? {};
  const baseUrl = [process.env.NEXT_PUBLIC_M1_API_URL, process.env.NEXT_PUBLIC_M2_API_URL]

  async function uploadNCreate(baseUrl: string | undefined) {
    const uploadTableProcessPath = `/businessProcess/uploadTableProcess/`;
    const reCreateProcessPath = !!(cycle_id && apps_label)
      ? `/businessProcessV2/reCreateProcess?cycle_id=${cycle_id}&app_type=${apps_label}`
      : `/businessProcessV2/reCreateProcess`;

    const uploadTableProcessPathUrl = `${baseUrl}${uploadTableProcessPath}`;
    const reCreateProcessPathUrl = `${baseUrl}${reCreateProcessPath}`;

    return await fetch(uploadTableProcessPathUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
      },
      next: { tags: ['uploadtableprocess'] }
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('Failed to reload business process (uploadTableProcess).');
      }

      return await fetch(reCreateProcessPathUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
        },
        next: { tags: ['recreateprocess'] }
      }).then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error_message as string);
        }

        return {
          url: baseUrl,
          message: 'Business process reloaded successfully.',
          result: data.result
        };
      });
    });
  }

  if (baseUrlIndex >= baseUrl.length) {
    return { message: 'Business process reloaded successfully.' };
  }

  const url = baseUrl[baseUrlIndex];
  await uploadNCreate(url);

  // Call recursively with the next index
  return reloadBizProcess(options, baseUrlIndex + 1);
};

export const duplicateCycle = async ({
  cycle_id,
  apps_label,
}:
  {
    cycle_id: string;
    apps_label: Apps_label;
  }) => {
  const endpoint = `/businessProcessTmp/duplicateCycle?cycle_id=${cycle_id}&app_type=${apps_label}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['duplicatecycle'] }
  });
  if (response.status === 404) {
    return [];
  }
  // if (!response.ok) {
  //   throw new Error('Failed to duplicate cycle.');
  // }
  clientRevalidateTag('cyclelist');
  return await response.json();
};

export const setAuditTrail = async ({
  action,
  notes,
  object,
  process_state,
  sysapp,
  sysfunc,
  userid,
  json_object,
  location_url
}: {
  action: string;
  notes: string;
  object: string;
  process_state: string;
  sysapp: string;
  sysfunc: string;
  userid: string;
  json_object: Record<string, any>;
  location_url: string;
}) => {
  const encodedUrl = encodeURIComponent(process.env.AUTH_URL + location_url);
  const endpoint = `/auditrail/businessProcess/?action=${action}&notes=${notes}&object=${object}&process_state=${process_state}&sysapp=${sysapp}&sysfunc=${sysfunc}&userid=${userid}&json_object=${JSON.stringify(json_object)}&location_url=${encodedUrl}`;
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['audittrail'] },
  });
  if (response.status === 404) {
    return [];
  }
  // if (!response.ok) {
  //   throw new Error('Failed to fetch audit trail.');
  // }
  const data = await response.json();
  return data;
};

export const restructureBizProcess = async ({
  cycle_uuid,
  body
}: {
  cycle_uuid: string;
  body: Record<string, any>;
}) => {
  try {
    const endpoint = `/businessProcess/restructure?cycle_uuid=${cycle_uuid}`;
    const url = `${baseUrl}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
      },
      body: JSON.stringify(body),
      next: { tags: ['restructureprocess'] }
    });

    clientRevalidateTag('diagramdata');
    return await response.json();
  } catch (error) {
    console.error('Error occurred while restructuring business process:', error);
    throw error;
  }
};

// ----------------- Claim management ----------------- //
export const getAllClaim = async ({
  claim_id,
  per_page,
  page,
  stage_name,
  actor_name
}: {
  page?: number;
  per_page?: number;
  claim_id?: number;
  stage_name?: string;
  actor_name?: string;
}) => {
  const url = new URL('/businessProcess/allClaims', baseUrl);

  url.searchParams.set('claim_id', claim_id?.toString() || '');
  url.searchParams.set('per_page', per_page?.toString() || '');
  url.searchParams.set('page', page?.toString() || '');
  url.searchParams.set('stage_name', stage_name || '');
  url.searchParams.set('actor_name', actor_name || '');

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['allclaim'] }
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to fetch all claim.');
  }
  const data = await response.json();
  return data;
};

export const getUsersPending = async ({
  cycle_id,
  apps_label,
}: {
  cycle_id?: string;
  apps_label: Apps_label;
}) => {
  const url = new URL(`/businessProcess/usersPending`, baseUrl);

  url.searchParams.set('cycle_id', cycle_id || '');
  url.searchParams.set('app_type', apps_label || '');

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['userspending'] }
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to fetch users pending.');
  }
  const data = await response.json();
  return data;
};

export const getRestructurePendingsLog = async ({
  status = 'success',
}: {
  status?: "success" | "wip" | "failed";

}) => {
  const url = new URL(`/businessProcess/restructurePendingLogs`, baseUrl);

  url.searchParams.set('status', status);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['restructurependingslog'] }
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to fetch restructure pendings log.');
  }
  const data = await response.json();
  return data.data;
};

export const restructurePendings = async ({
  body
}: {
  body: { claim_id?: string[]; user_id: string[]; stage_uuid?: string[]; action: "recovery" | "send_pending" | "send_message" | "test" };
}) => {
  const url = new URL(`/businessProcess/restructurePendings`, baseUrl);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    body: JSON.stringify(body),
    next: { tags: ['restructurependings'] }
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to restructure pendings.');
  }
  return await response.json();
};

export const testPending = async ({
  body
}: {
  body: { claim_id: string[]; user_id: string[]; };
}) => {
  const url = new URL(`/businessProcess/testPending`, baseUrl);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    body: JSON.stringify(body),
    next: { tags: ['testpending'] }
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to test pending.');
  }
  return await response.json();
};

export const sendMessagePending = async ({
  body
}: {
  body: { claim_id: string[]; user_id: string[]; message: string; };
}) => {
  const url = new URL(`/businessProcess/sendMessage`, baseUrl);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    body: JSON.stringify(body),
    next: { tags: ['sendmessagepending'] }
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to send message pending.');
  }
  return await response.json();
};

export const getUserDetails = async ({ email }: { email: string }) => {
  const url = new URL(`/businessProcess/user`, baseUrl);
  url.searchParams.set('email', email);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    next: { tags: ['userdetails'] }
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to get user details.');
  }
  const data = await response.json();
  const [user] = data.data;
  return user;
};

export const updateUserDetails = async ({ email, body }: { email: string; body: Record<string, any> }) => {
  const url = new URL(`/businessProcess/userUpdate`, baseUrl);
  url.searchParams.set('email', email);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_API_USERNAME + ':' + apiPassword).toString('base64')}`
    },
    body: JSON.stringify(body)
  });
  if (response.status === 404) {
    return [];
  }
  if (!response.ok) {
    throw new Error('Failed to update user details.');
  }
  clientRevalidateTag('userdetails');
  return await response.json();
};