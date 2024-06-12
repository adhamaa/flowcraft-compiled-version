import * as React from 'react';

const useEditableState = () => {
  const [isEditable, setIsEditable] = React.useState<{ [key: string]: boolean }>({});

  const toggleIsEditable = (id: string) => {
    setIsEditable((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return { isEditable, toggleIsEditable };
};

export default useEditableState;