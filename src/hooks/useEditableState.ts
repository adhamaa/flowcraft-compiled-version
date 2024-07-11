import * as React from 'react';

const useEditableState = (options?: { multiple: boolean; }) => {
  const [isEditable, setIsEditable] = React.useState<{ [key: string]: boolean }>({});

  const toggleIsEditable = (id: string) => {
    setIsEditable((prev) => {
      return {
        ...(options?.multiple && { ...prev }),
        [id]: !prev[id]
      }
    });
  };

  return { isEditable, toggleIsEditable };
};

export default useEditableState;