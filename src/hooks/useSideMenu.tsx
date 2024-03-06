'use client';
import { rem } from '@mantine/core';
import * as React from 'react';

type SideMenuContextType = {
  layoutColSpan: number;
  setLayoutColSpan: React.Dispatch<React.SetStateAction<number>>;
  sideMenuColSpan: number;
  setSideMenuColSpan: React.Dispatch<React.SetStateAction<number>>;
};

const SideMenuContext = React.createContext<SideMenuContextType | undefined>(undefined);

export const SideMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [layoutColSpan, setLayoutColSpan] = React.useState(10);
  const [sideMenuColSpan, setSideMenuColSpan] = React.useState(1);
  const value = { layoutColSpan, setLayoutColSpan, sideMenuColSpan, setSideMenuColSpan };
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

