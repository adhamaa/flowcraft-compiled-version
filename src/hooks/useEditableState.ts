import * as React from 'react';

const useEditableState = (options?: { multiple: boolean }) => {
  const [isEditable, setIsEditable] = React.useState<{ [key: string]: boolean }>({});

  const toggleIsEditable = (id: string) => {
    setIsEditable((prev) => ({
      ...(options?.multiple && { ...prev }),
      [id]: !prev[id],
    }));
  };

  const reset = () => {
    setIsEditable({});
  };

  return { isEditable, toggleIsEditable, reset };
};

export default useEditableState;