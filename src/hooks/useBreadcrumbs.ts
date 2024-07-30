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


const filterBreadcrumbsCylePage: FilterBreadcrumbs = ({ segments }) => {
  if (segments.includes("stage")) {
    return segments.includes("deleted") ? "Deleted Stages" : "Stages";
  }
  return "General Information";
};

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

  const getGeneralBreadcrumbs = React.useMemo(() => {
    const pathTitles = !(!!segments.length) && getTitles(pathname)
    return [
      ...DEFAULT_BREADCRUMBS, // add home|cycle to the list
      {
        title: pathTitles as string,
        href: "",
        disabled: true
      }];
    // return segments.reduce((acc, segment, index) => {
    //   const href = `/${segments.slice(0, index + 1).join("/")}`;
    //   const title = pathTitles as string;
    //   // const icon = segment === "cycle" ? "heroicons:home-solid" : undefined;
    //   const disabled = segment === "cycle";
    //   acc.push({ title, href, disabled });
    //   return acc;
    // }, DEFAULT_BREADCRUMBS);

  }, [segments]);

  const breadcrumbs = route === "cycle" ? getCycleBreadcrumbs : getGeneralBreadcrumbs;


  return { breadcrumbs };
};

export default useBreadcrumbs;





