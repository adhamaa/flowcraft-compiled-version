'use client';

import { ActionIcon, Badge, Button, Card, Group, Stack, Text, Tooltip } from '@mantine/core'
import { NavigationProgress, nprogress } from '@mantine/nprogress'
import * as React from 'react'
import '@mantine/nprogress/styles.css';
import { CardComponentProps, Onborda, useOnborda } from 'onborda';
import confetti from "canvas-confetti";
import Image from 'next/image';
import { Icon } from '@iconify-icon/react';


const steps: any = [
  // Example steps
  {
    icon: <>👋</>,
    title: "Welcome to Onborda!",
    content: <>Welcome to Onborda, an onboarding flow for Next.js!</>,
    selector: "#onborda-step1",
    side: "bottom",
    showControls: true,
    pointerPadding: -1,
    pointerRadius: 24,
  },
  {
    icon: <>🪄</>,
    title: "It's like magic!",
    content: (
      <>
        Onborda uses <b>framer-motion</b> to handle animations and{" "}
        <b>reactour</b> to handle the onboarding flow.
      </>
    ),
    selector: "#onborda-step2",
    side: "top",
    showControls: true,
    pointerPadding: -1,
    pointerRadius: 24,
  },
  {
    icon: <>🎩</>,
    title: "Works across routes!",
    content: (
      <>
        Onborda uses <b>framer-motion</b> to handle animations and{" "}
        <b>reactour</b> to handle the onboarding flow.
      </>
    ),
    selector: "#onborda-step3",
    side: "top",
    showControls: true,
    pointerPadding: -1,
    pointerRadius: 24,
  },
  {
    icon: <>🌀</>,
    title: "Customize your steps",
    content: <>Customize each step of your onboarding process!</>,
    selector: "#onborda-step4",
    side: "top",
    showControls: true,
    pointerPadding: -1,
    pointerRadius: 24,
  },
  {
    icon: <>👉</>,
    title: "Custom pointers",
    content: (
      <>
        Full control over your pointer content, fully compatible with custom
        components like <b>shadcn/ui</b>.
      </>
    ),
    selector: "#onborda-step5",
    side: "bottom",
    showControls: true,
    pointerPadding: -1,
    pointerRadius: 24,
  },
  {
    icon: <>⭐️</>,
    title: "Github",
    content: <>Star this repo!</>,
    selector: "#onborda-step6",
    side: "bottom",
    showControls: true,
    pointerPadding: -1,
    pointerRadius: 24,
    // nextRoute: "/page-two",
  },
  {
    icon: <>🚀</>,
    title: "Change routes",
    content: <>Onborda even works across routes!</>,
    selector: "#onborda-step7",
    side: "bottom",
    showControls: true,
    pointerPadding: 5,
    pointerRadius: 10,
    // prevRoute: "/",
  },
]

function TourComponent() {
  const { startOnborda, closeOnborda, isOnbordaVisible, currentStep, setCurrentStep } = useOnborda();


  return (
    <Onborda steps={steps}
      showOnborda={true}
      shadowRgb="55,48,163"
      shadowOpacity="0.8"
      cardComponent={CustomCard}
    >
      <div className='grid place-items-center p-8 h-screen'>
        <NavigationProgress size={3} color='indigo' />
        <Group justify="center">
          <Button id='onborda-step5' onClick={() => nprogress.start()}>Start</Button>
          <Button onClick={() => nprogress.stop()}>Stop</Button>
          <Button id='onborda-step6' onClick={() => nprogress.increment()}>Increment</Button>
          <Button id='onborda-step7' onClick={() => nprogress.decrement()}>Decrement</Button>
          <Button onClick={() => nprogress.set(50)}>Set 50%</Button>
          <Button onClick={() => nprogress.reset()}>Reset</Button>
          <Button onClick={() => nprogress.complete()}>Complete</Button>
        </Group>

        <Stack p={32}>
          <Button onClick={() => startOnborda("onborda-step1")}>Start The Tour</Button>
          <div id="onborda-step1" className='p-10 m-auto rounded h-40 border w-40'>Onboard Step</div>

          <div id="onborda-step2" className='p-10 m-auto rounded h-40 border w-40'>Onboard Step</div>
          <div id="onborda-step3" className='p-10 m-auto rounded h-40 border w-40'>Onboard Step</div>
          <div id="onborda-step4" className='p-10 m-auto rounded h-40 border w-96'>Onboard Step</div>
        </Stack>
      </div >
    </Onborda>
  )
}

export default TourComponent



export const CustomCard = ({
  step,
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  arrow,
}: CardComponentProps) => {
  const { closeOnborda } = useOnborda();

  function handleConfetti() {
    closeOnborda();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section classNames={{ section: 'flex ml-auto' }}>
        <ActionIcon
          variant="transparent"
          color='black'
          size="lg"
          radius="md"
          aria-label="Settings"
          onClick={closeOnborda}
        >
          <Icon icon="heroicons-outline:x" width="1.2rem" className='border p-2 rounded-lg text-black/70 hover:text-black/50' />
        </ActionIcon>
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{step.icon} {step.title}</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Group py='32' px='8'>
        <Text size="sm" c="dimmed">
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and
          activities on and around the fjords of Norway
        </Text>
      </Group>

      <div className="flex justify-between w-full">
        {currentStep !== 0 && (
          <Button onClick={() => prevStep()}>Previous</Button>
        )}
        {currentStep + 1 !== totalSteps && (
          <Button onClick={() => nextStep()} className="ml-auto">
            Next
          </Button>
        )}
        {currentStep + 1 === totalSteps && (
          <Button onClick={() => handleConfetti()} className="ml-auto">
            🎉 Finish!
          </Button>
        )}
      </div>
      <span className="text-card">{arrow}</span>
    </Card>
  )
}