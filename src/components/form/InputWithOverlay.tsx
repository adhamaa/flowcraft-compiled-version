'use client';

import { InputWrapper, Overlay } from "@mantine/core";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import { InputProps, JsonInput, TextInput } from "react-hook-form-mantine";
import SaveActions, { CustomInputType } from "./SaveActions";
import SyntaxSemanticActions from "./SyntaxSemanticActions";
import { TableStages, onSemanticSubmit, onSyntaxSubmit, stagesData } from "@/app/cycle/_components/Forms/EditForm";
import { useElementSize } from "@mantine/hooks";

import TextareaHeader from "./TextareaHeader";
import { LabelTooltip } from "@/app/cycle/_components/Forms/LabelTooltip";
import { usePathname, useSearchParams } from "next/navigation";

const InputWithOverlay = (props: InputProps<any> & {
  label?: string;
  value?: any;
  type: CustomInputType;
  disabled: boolean;
}) => {
  const { ref, height } = useElementSize();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const datasource_type = searchParams.get('data_source');
  const isDeletedStage = pathname.includes('deleted'); 
  const allowEdit = datasource_type === 'database' && !props.disabled && !isDeletedStage;


  const { handleSubmit, setFocus } = useFormContext();

  const [inputDisabled, setInputDisabled] = React.useState(true);

  const toggleInputDisabled = () => setInputDisabled(!inputDisabled)

  const display = allowEdit ? 'block' : 'none';

  React.useEffect(() => {
    if (!inputDisabled) {
      setFocus(props.name);
    }
  }, [setFocus, inputDisabled, props.name]);


  return props.type === 'text' ? (
    <InputWrapper
      ref={ref}
      label={props.label}
      classNames={{
        root: 'relative mx-14 space-y-4',
        label: '!text-sm !font-semibold',
      }}
    >
      <LabelTooltip label={props.label} />
      <TextInput
        id={props.name}
        disabled={inputDisabled}
        name={props.name}
        type={props.type as never}
        placeholder={props.label}
        control={props.control}
        radius={props.radius || 'md'}
        classNames={{
          wrapper: 'w-full',
          input: '!rounded-lg !p-6 w-full focus:outline-none focus:ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black',
          ...props.classNames
        }}
        rightSectionWidth={72}
        rightSection={!inputDisabled && <SaveActions {...{
          name: props.name,
          type: 'text',
          disabled: inputDisabled,
          onCancel: toggleInputDisabled
        }} />
        }
      />
      {!inputDisabled && <SyntaxSemanticActions {...{
        name: props.name,
        value: props.value,
        onSyntaxSubmit: handleSubmit(onSyntaxSubmit),
        onSemanticSubmit: handleSubmit(onSemanticSubmit)
      }} />}
      {inputDisabled &&
        <Overlay
          display={display}
          color="transparent"
          h={height - 50}
          top={34}
          backgroundOpacity={0}
          blur={0}
          onClick={toggleInputDisabled}
          classNames={{
            root: 'cursor-pointer rounded-lg',
          }} />}
    </InputWrapper>
  ) : props.type === 'json' ? (
    <InputWrapper
      ref={ref}
      label={props.label}
      classNames={{
        root: 'relative mx-14',
        label: '!text-sm !font-semibold',
      }}>
      <LabelTooltip label={props.label} />
      <TextareaHeader
        actionsButton={
          <SaveActions {...{
            name: props.name,
            type: 'json',
            copyValue: JSON.stringify(props.value, null, 2),
            disabled: inputDisabled,
            onCancel: toggleInputDisabled
          }} />} />
      <JsonInput
        id={props.name}
        name={props.name}
        defaultValue={JSON.stringify(props.value, null, 2)}
        control={props.control}
        disabled={inputDisabled}
        formatOnBlur
        autosize
        minRows={4}
        classNames={{
          input: '!rounded-none !rounded-b-lg !h-32 p-4 w-full focus:outline-none focus:!ring-2 focus:ring-[#895CF3] focus:border-transparent transition-all duration-300 ease-in-out disabled:!bg-[#F1F4F5] disabled:border-transparent disabled:text-black',
        }}
      />
      {!inputDisabled && <SyntaxSemanticActions  {...{
        name: props.name,
        value: JSON.stringify(props.value, null, 2),
        onSyntaxSubmit: handleSubmit(onSyntaxSubmit),
        onSemanticSubmit: handleSubmit(onSemanticSubmit)
      }} />}
      {inputDisabled &&
        <Overlay
          display={display}
          color="transparent"
          h={height - 80}
          top={80}
          backgroundOpacity={0}
          blur={0}
          onClick={toggleInputDisabled}
          classNames={{
            root: 'cursor-pointer rounded-lg',
          }} />}
    </InputWrapper>
  ) : !props.type ? (
    <InputWrapper
      label={props.label}
      classNames={{
        root: 'px-14',
        label: '!text-sm !font-semibold',
      }}>
      <LabelTooltip label={props.label} />
      <TableStages data={props.value as stagesData} />
    </InputWrapper>
  ) : null
};

export default InputWithOverlay;

