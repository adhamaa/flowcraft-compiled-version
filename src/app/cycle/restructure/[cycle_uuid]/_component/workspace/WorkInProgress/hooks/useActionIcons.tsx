import * as React from "react";
import useEditableState from "@/hooks/useEditableState";

interface EditableContextType {
  isEditable: { [key: string]: boolean; };
  toggleIsEditable: (id: string) => void;
};

const ActionIconsContext = React.createContext<EditableContextType | undefined>(undefined);


function ActionIconsProvider({ children }: { children: React.ReactNode }) {
  const { isEditable, toggleIsEditable } = useEditableState();
  return (
    <ActionIconsContext.Provider value={{ isEditable, toggleIsEditable }}>
      {children}
    </ActionIconsContext.Provider>
  )
};

const useActionIcons = () => {
  const context = React.useContext(ActionIconsContext);
  if (!context) {
    throw new Error('useActionIcons must be used within a ActionIconsProvider');
  }

  return context;
};

export { ActionIconsProvider, useActionIcons };