import * as React from "react";
import useEditableState from "@/hooks/useEditableState";

type ActionType = "add" | "move" | "duplicate" | "delete" | "restore" | "disjoint";

interface EditableContextType {
  isEditable: { [key: string]: boolean; };
  toggleIsEditable: (id: string) => void;
  reset: () => void;
};

const ActionIconsContext = React.createContext<EditableContextType | undefined>(undefined);


function ActionIconsProvider({ children }: { children: React.ReactNode }) {
  const editFeatures = useEditableState();
  return (
    <ActionIconsContext.Provider value={editFeatures}>
      {children}
    </ActionIconsContext.Provider>
  )
};

const useActionIcons = () => {
  const context = React.useContext(ActionIconsContext);
  if (!context) {
    throw new Error('useActionIcons must be used within a ActionIconsProvider');
  }

  const getAction = (action: Record<ActionType, boolean>): string | null => {
    for (const key in action) {
      if (action[key as ActionType]) {
        // return key.charAt(0).toUpperCase() + key.slice(1);
        return key;
      }
    }
    return null;
  };

  const getIsEditable = (action: Record<ActionType, boolean>, type: ActionType): boolean => {
    return action[type];
  };

  const getIsAnyEditable = (action: Record<ActionType, boolean>): boolean => {
    for (const key in action) {
      if (action[key as ActionType]) {
        return true;
      }
    }
    return false;
  };

  return { ...context, getAction, getIsEditable, getIsAnyEditable };
};




export { ActionIconsProvider, useActionIcons };
export type { ActionType };