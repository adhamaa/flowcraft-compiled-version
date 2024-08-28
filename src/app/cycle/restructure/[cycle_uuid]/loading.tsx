import { Flex, Loader } from "@mantine/core";

export default function Loading() {
  return (
    <Flex align="center" justify="center" w="100%" mih="100vh">
      <Loader color="var(--fc-brand-700)" />
    </Flex>
  );
}