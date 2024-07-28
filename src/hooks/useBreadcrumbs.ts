import * as React from 'react';
import { useParams, useSearchParams, useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation';
import useQueryString from './useQueryString';
import { Apps_label, Datasource_type, getDeletedStageList, getStageList } from '@/lib/service/client';

export type Breadcrumb = {
  title: string;
  icon?: React.ReactNode;
  href: string;
};

type FilterBreadcrumbsArgs = {
  segment: string;
  cycle_id: string;
  stage_uuid: string;
  segments: string[];
};

type FilterBreadcrumbs = (args: FilterBreadcrumbsArgs) => string;

const DEFAULT_BREADCRUMBS = [
  { // add home to the list
    title: 'Home',
    icon: 'heroicons:home-solid',
    href: '/',
    disabled: false
  }, { // add cycle to the list
    title: 'cycle',
    href: '/cycle',
    disabled: false
  }]


const useBreadcrumbs = (): {
  breadcrumbs: Breadcrumb[];
  filterBreadcrumbs: FilterBreadcrumbs;
} => {
  const [stageData, setStageData] = React.useState<any[]>();
  const [deletedStageData, setDeletedStageData] = React.useState<any[]>();
  const { createQueryString, removeQueryString, remainQueryString } = useQueryString();
  const segments = useSelectedLayoutSegments();
  const segment = useSelectedLayoutSegment();
  const params = useParams();
  const searchParams = useSearchParams();

  const cycle_id = params.cycle_id;
  const stage_uuid = params.stage_uuid;
  const selected_app = searchParams.get('selected_app');
  const datasource_type = searchParams.get('data_source');

  React.useEffect(() => {
    async function getStageListData() {
      const stageListDeletedDataRes = await getDeletedStageList({
        cycle_id: cycle_id as string,
        apps_label: selected_app as Apps_label,
        datasource_type: datasource_type as Datasource_type
      });
      const stageListDataRes = await getStageList({
        cycle_id: cycle_id as string,
        apps_label: selected_app as Apps_label,
        datasource_type: datasource_type as Datasource_type
      });

      setStageData(stageListDataRes)
      setDeletedStageData(stageListDeletedDataRes)
    }

    if (cycle_id && selected_app && datasource_type) {
      getStageListData()
    }
  }, [cycle_id, datasource_type, selected_app])

  const filteredBreadcrumbs = filterBreadcrumbs({ segments } as FilterBreadcrumbsArgs);

  const breadcrumbs = React.useMemo(() => {

    const mergedList = [
      ...DEFAULT_BREADCRUMBS,
      {
        title: filteredBreadcrumbs,
        href: "",
        disabled: true
      }];

    return mergedList;

  }, [segments]);

  function filterBreadcrumbs({ segments }: { segments: string[] }) {
    let selectedMenu = "General Information"; // Default value

    // Check if segments is not empty
    if (segments.length) {
      if (segments.includes("stage")) {
        if (segments.includes("deleted")) {
          selectedMenu = "Deleted Stages";
        } else {
          selectedMenu = "Stages";
        }
      }
    }

    return selectedMenu;
  }

  return { breadcrumbs, filterBreadcrumbs };
};

export default useBreadcrumbs;





