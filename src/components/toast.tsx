'use client';

import { Icon } from "@iconify-icon/react";
import { notifications } from "@mantine/notifications";

const toast = {
  success: (message: string) => {
    notifications.show({
      icon: <Icon icon="heroicons-solid:check-circle" width='2rem' height='2rem' />,
      // title: 'Success',
      message: message,
      // autoClose: 500,
      // withCloseButton: false,
      classNames: {
        root: 'before:bg-transparent rounded-lg',
        icon: 'bg-white text-teal-400',
      },
    });
  },
  error: (message: string) => {
    notifications.show({
      icon: <Icon icon="heroicons-solid:x-circle" width='2rem' height='2rem' />,
      // title: 'Error',
      message: message,
      // autoClose: 500,
      // withCloseButton: false,
      classNames: {
        root: 'before:bg-transparent rounded-lg',
        icon: 'bg-white text-red-400',
      },
    });
  },
  warning: (message: string) => {
    notifications.show({
      icon: <Icon icon="heroicons-solid:exclamation-circle" width='2rem' height='2rem' />,
      // title: 'Warning',
      message: message,
      // autoClose: 500,
      // withCloseButton: false,
      classNames: {
        root: 'before:bg-transparent rounded-lg',
        icon: 'bg-white text-yellow-400',
      },
    });
  },
};

export default toast;