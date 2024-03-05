'use client';
import { Icon } from '@iconify-icon/react';
import { Tabs, rem } from '@mantine/core';

export default function ColapsableMenu() {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <aside>
      <Tabs
        className='bg-white text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] overflow-hidden md:relative fixed h-screen'
        variant="pills" radius="xs" orientation="vertical" defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab value="gallery" leftSection={<Icon {...iconStyle} icon="tabler:photo" />}>
            Gallery
          </Tabs.Tab>
          <Tabs.Tab value="messages" leftSection={<Icon {...iconStyle} icon="tabler:message-circle" />}>
            Messages
          </Tabs.Tab>
          <Tabs.Tab value="settings" leftSection={<Icon {...iconStyle} icon="tabler:settings" />}>
            Settings
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="gallery">
          <Tabs variant="pills" radius="xs" orientation="vertical" defaultValue="gallery">
            <Tabs.List>
              <Tabs.Tab value="gallery" leftSection={<Icon {...iconStyle} icon="tabler:photo" />}>
                Gallery
              </Tabs.Tab>
              <Tabs.Tab value="messages" leftSection={<Icon {...iconStyle} icon="tabler:message-circle" />}>
                Messages
              </Tabs.Tab>
              <Tabs.Tab value="settings" leftSection={<Icon {...iconStyle} icon="tabler:settings" />}>
                Settings
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="gallery">
              <Tabs variant="pills" radius="xs" orientation="vertical" defaultValue="gallery">
                <Tabs.List>
                  <Tabs.Tab value="gallery" leftSection={<Icon {...iconStyle} icon="tabler:photo" />}>
                    Gallery
                  </Tabs.Tab>
                  <Tabs.Tab value="messages" leftSection={<Icon {...iconStyle} icon="tabler:message-circle" />}>
                    Messages
                  </Tabs.Tab>
                  <Tabs.Tab value="settings" leftSection={<Icon {...iconStyle} icon="tabler:settings" />}>
                    Settings
                  </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="gallery">
                  Gallery tab content Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque excepturi laborum necessitatibus saepe in error ipsum consequatur! Dolores in molestias optio iste alias soluta placeat quidem provident cum recusandae? Nesciunt.
                </Tabs.Panel>
                <Tabs.Panel value="messages">
                  Messages tab content
                </Tabs.Panel>
                <Tabs.Panel value="settings">
                  Settings tab content
                </Tabs.Panel>
              </Tabs>
            </Tabs.Panel>
            <Tabs.Panel value="messages">
              Messages tab content
            </Tabs.Panel>
            <Tabs.Panel value="settings">
              Settings tab content
            </Tabs.Panel>
          </Tabs>
        </Tabs.Panel>
        <Tabs.Panel value="messages">
          Messages tab content
        </Tabs.Panel>
        <Tabs.Panel value="settings">
          Settings tab content
        </Tabs.Panel>
      </Tabs>
    </aside>
  );
}