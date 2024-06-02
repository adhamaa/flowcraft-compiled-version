import { Icon } from "@iconify-icon/react";
import { Button } from "@mantine/core";

const FooterButton = ({ isAdd, isCollapse, isSideMenuCollapse, onClick }: { isAdd?: boolean; isCollapse?: boolean; isSideMenuCollapse: boolean; onClick: () => void; }) => {
  return (
    <div className="flex items-end justify-end mt-auto py-2 border-t">
      <Button
        variant='transparent'
        color='#895CF3'
        fz={16}
        {...(isAdd && {
          leftSection:
            < Icon className='cursor-pointer rounded' icon="heroicons-solid:rectangle-group" width="1.75rem" />
        })}
        onClick={onClick}
      >
        {isAdd && "Restructure"}
        {isCollapse && <Icon
          icon="tabler:chevron-down"
          width="3rem"
          rotate={isSideMenuCollapse ? 15 : 45}
          className='text-[#895CF3]' />}
      </Button>
    </div >
  );
};

export default FooterButton;