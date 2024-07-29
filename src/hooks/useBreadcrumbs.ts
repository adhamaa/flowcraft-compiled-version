import * as React from 'react';
import { useSelectedLayoutSegments } from 'next/navigation';

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
  }]


const filterBreadcrumbsCylePage: FilterBreadcrumbs = ({ segments }) => {
  if (segments.includes("stage")) {
    return segments.includes("deleted") ? "Deleted Stages" : "Stages";
  }
  return "General Information";
};

const useBreadcrumbs = ({
  route,
}: {
  route?: string;
}): { breadcrumbs: Breadcrumb[]; } => {
  const segments = useSelectedLayoutSegments();

  const getCycleBreadcrumbs = React.useMemo(() => {
    const filteredBreadcrumbsTitle = filterBreadcrumbsCylePage({ segments } as FilterBreadcrumbsArgs);
    const mergedList = [
      ...DEFAULT_BREADCRUMBS,
      { // add cycle to the list
        title: 'cycle',
        href: '/cycle',
        disabled: false
      },
      {
        title: filteredBreadcrumbsTitle,
        href: "",
        disabled: true
      }];

    return mergedList;

  }, [segments]);

  const breadcrumbs = route === "cycle" ? getCycleBreadcrumbs : [];


  return { breadcrumbs };
};

export default useBreadcrumbs;





