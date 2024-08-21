import * as React from 'react';
import { useParams, usePathname, useSelectedLayoutSegments } from 'next/navigation';

export type Breadcrumb = {
  title: string;
  icon?: React.ReactNode;
  href: string;
  disabled?: boolean;
};

type FilterBreadcrumbsArgs = {
  segment: string;
  cycle_id: string;
  stage_uuid: string;
  segments: string[];
};

type FilterBreadcrumbs = (args: FilterBreadcrumbsArgs) => string;

const DEFAULT_BREADCRUMBS: Breadcrumb[] = [
  { // add home to the list
    title: 'Home',
    icon: 'heroicons:home-solid',
    href: '/',
    disabled: false
  }]


const getTitles = (pathname: string) => {
  const segment = pathname.replace(/\//g, '');
  const replaceHyphen = segment.replace(/-/g, ' ');
  const capitalizedSegment = replaceHyphen.replace(/(^|\s)\S/g, (char) => char.toUpperCase());
  return capitalizedSegment;
}

const useBreadcrumbs = ({
  route,
}: {
  route?: string;
}): { breadcrumbs: Breadcrumb[]; } => {
  const segments = useSelectedLayoutSegments();
  const pathname = usePathname();
  const params = useParams();
  const cycle_id = params?.cycle_id as string;
  const stage_uuid = params?.stage_uuid as string;


  const getGeneralBreadcrumbs = React.useMemo(() => {
    const generalInformation = pathname === `/cycle/${cycle_id}`
    const stages = pathname === `/cycle/${cycle_id}/stage/${stage_uuid}`
    const deletedStages = pathname === `/cycle/${cycle_id}/stage/deleted/${stage_uuid}`
    const cycleCrumbsTitle = deletedStages ? "Deleted Stages" : stages ? "Stages" : generalInformation ? "General Information" : "";

    const pathTitles = !!segments.length && getTitles(pathname)

    return [
      ...DEFAULT_BREADCRUMBS, // add home|cycle to the list
      ...(!pathname.includes("cycle") && !pathname.includes("manage-cycle") && !pathname.includes("manage-account") ? [{
        title: pathTitles as string,
        href: "",
        disabled: true
      },] : []),
      ...(pathname.includes("cycle") ? [{ // add cycle to the list
        title: 'Cycle',
        href: "",
        disabled: false
      }, {
        title: cycleCrumbsTitle as string,
        href: "",
        disabled: true
      }] : []),
      ...(pathname.includes("manage-cycle") ? segments.map((segment, index) => {
        let href = segments.slice(0, index + 1).join('/');
        return {
          title: getTitles(segment),
          href: `/${href}`,
          disabled: true
        }
      }) : []),
      ...(pathname.includes("manage-account") ? segments.map((segment, index) => {
        let href = segments.slice(0, index + 1).join('/');
        return {
          title: getTitles(segment),
          href: `/${href}`,
          disabled: true
        }
      }) : []),
    ];


  }, [segments]);

  const breadcrumbs = getGeneralBreadcrumbs;


  return { breadcrumbs };
};

export default useBreadcrumbs;





