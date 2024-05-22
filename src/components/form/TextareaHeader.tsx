import { Flex } from "@mantine/core";
import clsx from "clsx";
import { MRT_TablePagination } from "mantine-react-table";

const TextareaHeader = ({ table, actionsButton }: {
  table?: any;
  actionsButton?: React.ReactNode;
}) => {
  const isTable = !!table
  return (
    <div className={clsx(
      'relative flex bg-[#D9D9D9] rounded-t-lg mt-4 min-h-10',
      isTable && '-mb-4'
    )}>
      <Flex justify="space-between" align="center" classNames={{
        root: clsx('py-1 px-2 w-full', isTable && '!py-0'),
      }}>
        {isTable &&
          <MRT_TablePagination
            autoContrast
            table={table}
            color='#895CF3'
            classNames={{
              root: '',
              // control: '!bg-transparent !border-none !text-sm !text-black/60 !font-semibold !hover:bg-[#895CF3] !hover:text-white/90 !hover:!border-[#895CF3] !transition-all !duration-300 !ease-in-out',
            }}
          />}
        {actionsButton}
      </Flex>
    </div >
  )
};

export default TextareaHeader;