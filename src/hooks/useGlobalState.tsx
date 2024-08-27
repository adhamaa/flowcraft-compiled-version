'use client';
import { rem } from '@mantine/core';
import * as React from 'react';


type GlobalStateContextType = {
  selectedApp: string;
  setSelectedApp: (app: string) => void;
  url: {
    prev: string;
    curr: string;
  };
  setUrl: (url: { prev: string; curr: string }) => void;
};

const GlobalStateContext = React.createContext<GlobalStateContextType | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: React.ReactNode; }) => {
  const [selectedApp, setSelectedApp] = React.useState('');
  const [url, setUrl] = React.useState({
    prev: '',
    curr: '',
  });
  const value = { selectedApp, setSelectedApp, url, setUrl };
  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = React.useContext(GlobalStateContext);

  if (!context) {
    throw new Error('useGlobalStateContext must be used within a GlobalStateProvider');
  }

  return context;
};

