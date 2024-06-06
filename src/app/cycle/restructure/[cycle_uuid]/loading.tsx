import { LoadingOverlay } from "@mantine/core";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (<LoadingOverlay visible zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: '#895CF3', type: 'oval' }} />);
}