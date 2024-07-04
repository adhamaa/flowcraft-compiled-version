import * as React from "react";
import { Button, Text } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";

const ConfirmModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string; callback: () => void; }>) => {

  return (
    <>
      <Text size="sm">{innerProps.modalBody}</Text>
      <Button mt="md" onClick={() => context.closeModal(id)}>
        Close modal
      </Button>
      <Button mt="md" onClick={() => {
        innerProps.callback()
        context.closeModal(id)
      }
      }>
        Console log
      </Button >
    </>
  )
};

export default ConfirmModal;

// declare module '@mantine/modals' {
//   export interface MantineModalsOverride {
//     modals: typeof modals;
//   }
// }