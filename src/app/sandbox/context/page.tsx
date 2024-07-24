"use client";

import useEditableState from '@/hooks/useEditableState';
import { Button } from '@mantine/core';
import * as React from 'react'

const RenderContextPage = () => {
  return (
    <ActionProvider>
      <ContextPage />
    </ActionProvider>
  )


}
export default RenderContextPage

function ContextPage() {
  const { isEditable, toggleIsEditable } = useAction();
  console.log('isEditable:', isEditable)

  return (
    <div className="p-4">
      <Button onClick={() => toggleIsEditable('id123')}>hit me</Button>
      <Section>
        <Heading>Title</Heading>
        <Section>
          <Heading>Heading</Heading>
          <Heading>Heading</Heading>
          <Heading>Heading</Heading>
          <Section>
            <Heading>Sub-heading</Heading>
            <Heading>Sub-heading</Heading>
            <Heading>Sub-heading</Heading>
            <Section>
              <Heading>Sub-sub-heading</Heading>
              <Heading>Sub-sub-heading</Heading>
              <Heading>Sub-sub-heading</Heading>
              <Section>
                <TestDrive />
              </Section>
            </Section>
          </Section>
        </Section>
      </Section>
    </div>
  )
}

function TestDrive() {
  const { isEditable } = useAction();
  return (
    <pre>{JSON.stringify(isEditable, null, 2)}</pre>
  )
}



function Section({ children }: { children: React.ReactNode }) {
  const level = React.useContext(LevelContext);
  console.log('level:', level)
  return (
    <section className="border-2 border-black p-4">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  const level = React.useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}

const LevelContext = React.createContext(0);

interface EditableContextType {
  isEditable: { [key: string]: boolean; };
  toggleIsEditable: (id: string) => void;
}
const ActionContext = React.createContext<EditableContextType | undefined>(undefined);


function ActionProvider({ children }: { children: React.ReactNode }) {
  const { isEditable, toggleIsEditable } = useEditableState();
  return (
    <ActionContext.Provider value={{ isEditable, toggleIsEditable }}>
      {children}
    </ActionContext.Provider>
  )
}

const useAction = () => {
  const context = React.useContext(ActionContext);
  if (!context) {
    throw new Error('useAction must be used within a ActionProvider');
  }

  return context;
}