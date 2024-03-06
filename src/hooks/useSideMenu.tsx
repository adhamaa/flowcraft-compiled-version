'use client';
import { rem } from '@mantine/core';
import * as React from 'react';

type SideMenuContextType = {
  sideMenu: number;
  setSideMenu: React.Dispatch<React.SetStateAction<number>>;
};

const SideMenuContext = React.createContext<SideMenuContextType | undefined>(undefined);

export const SideMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [sideMenu, setSideMenu] = React.useState(10);
  const value = { sideMenu, setSideMenu };
  return (
    <SideMenuContext.Provider value={value}>
      {children}
    </SideMenuContext.Provider>
  );
};

export const useSideMenu = () => {
  const context = React.useContext(SideMenuContext);

  if (!context) {
    throw new Error('useSideMenuContext must be used within a SideMenuProvider');
  }

  return context;
};

