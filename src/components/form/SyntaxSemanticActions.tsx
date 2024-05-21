'use client';

import { Button } from "@mantine/core";

const SyntaxSemanticActions = ({
  name,
  onSyntaxSubmit,
  onSemanticSubmit,
}: {
  name?: string;
  onSyntaxSubmit: (formdata: any, e: any) => void;
  onSemanticSubmit: (formdata: any, e: any) => void;
}) => {

  return (
    <div className="text-right ml-auto space-x-4 mt-4" >
      <Button id={name} color='#895CF3' radius='md' className="!font-normal"
        onClick={onSyntaxSubmit as never}
      >Verify syntax</Button>
      <Button id={name} color='#895CF3' radius='md' className="!font-normal"
        onClick={onSemanticSubmit as never}>Evaluate semantics
      </Button>
    </div >
  )
};

export default SyntaxSemanticActions;