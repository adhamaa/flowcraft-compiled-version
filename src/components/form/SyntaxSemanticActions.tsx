'use client';

import { Button } from "@mantine/core";
import { useParams } from "next/navigation";

const SyntaxSemanticActions = ({
  name,
  onSyntaxSubmit,
  onSemanticSubmit,
}: {
  name?: string;
  onSyntaxSubmit: () => void;
  onSemanticSubmit: () => void;
}) => {
  const params = useParams();
  const cycle_id = params.cycle_id as string;
  return (
    <div className="text-right ml-auto space-x-4 mt-4" >
      <Button id={name} data-cycle_id={cycle_id} color='#895CF3' radius='md' className="!font-normal"
        onClick={onSyntaxSubmit as never}
      >Verify syntax</Button>
      <Button id={name} data-cycle_id={cycle_id} color='#895CF3' radius='md' className="!font-normal"
        onClick={onSemanticSubmit as never}>Evaluate semantics
      </Button>
    </div >
  )
};

export default SyntaxSemanticActions;