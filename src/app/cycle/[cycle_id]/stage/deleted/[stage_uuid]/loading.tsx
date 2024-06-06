import { Flex, Loader } from "@mantine/core";

export default function Loading() {
  return (
    <Flex align="center" justify="center" w="100%">
      <Loader color="#895CF3" />
    </Flex>
  );
}