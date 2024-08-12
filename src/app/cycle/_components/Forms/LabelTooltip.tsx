import { Icon } from "@iconify-icon/react";
import { Tooltip } from "@mantine/core";

export const LabelTooltip = ({
  onMouseEnter,
  label
}: {
  onMouseEnter?: () => void;
  label?: string;
}) => {
  return (
    <Tooltip label={label}>
      <Icon
        icon="mingcute:information-fill"
        width="0.7rem"
        height="0.7rem"
        className='!mb-2 !ml-0.5 cursor-pointer text-black/80 hover:text-black/70'
        onMouseEnter={onMouseEnter} />
    </Tooltip>
  )
}