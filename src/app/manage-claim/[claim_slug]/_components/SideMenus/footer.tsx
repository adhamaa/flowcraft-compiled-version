import { Icon } from "@iconify-icon/react";
import { Button } from "@mantine/core";

const FooterButton = ({ isRestructure, isCollapse, isSideMenuCollapse, onClick, disabled }: { isRestructure?: boolean; isCollapse?: boolean; isSideMenuCollapse: boolean; onClick: () => void; disabled?: boolean; }) => {
  return (
    <div className="flex items-end justify-end mt-auto py-2 border-t">
      <Button
        disabled={disabled}
        variant='transparent'
        color='var(--fc-brand-700)'
        fz={16}
        {...(isRestructure && {
          leftSection:
            < Icon className='rounded' icon="heroicons-solid:rectangle-group" width="1.75rem" />
        })}
        onClick={onClick}
        bg='transparent'
      >
        {isRestructure && "Restructure"}
        {isCollapse && <Icon
          icon="tabler:chevron-down"
          width="3rem"
          rotate={isSideMenuCollapse ? 15 : 45}
          className='text-[var(--fc-brand-700)]' />}
      </Button>
    </div >
  );
};

export default FooterButton;