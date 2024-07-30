import { rem, ScrollAreaAutosize } from '@mantine/core'
import Image from 'next/image'
import * as React from 'react'

function AboutContent() {
  return (
    <ScrollAreaAutosize pb={rem(48)} mx="auto">
      <main className='p-14 space-y-16'>
        <section className='relative text-center text-xl font-semibold space-y-4 max-w-3xl mx-auto'>
          <h1 className='text-5xl flex justify-center items-center'>Welcome to&nbsp;<img src='/about/fc_logo_word.png' width={254} height={87} alt='fc logo' className='inline-block' /></h1>
          <p className='w-[52ch] mx-auto'>The premier platform designed to empower <img src='/about/schinkels_technik_logo.png' width={84} height={30} alt='schinkels technik logo' className='inline-block' /> IT department
            in revolutionizing business processes, managing requirements, and optimizing instance cycles effortlessly.</p>
        </section>
        <section className='relative flex max-w-4xl mx-auto'>
          <h1>At <strong>Flowcraft</strong>, we understand the critical role that IT department plays in shaping and enhancing organizational workflows. Our mission is to provide a user-friendly, intuitive, and robust platform that equips administrators with the tools they need to adapt, evolve, and streamline business processes effectively.</h1>
          <img src="/about/section_2_bg_right.png" width={438} height={215} alt="device" className='' />
        </section>
        <section className='relative flex flex-col text-center max-w-4xl mx-auto'>
          <h1 className="text-3xl">SAFWA <span className="text-xl">PORTAL VISION</span></h1>
          <p>We envision a world where administrative IT professionals have the power to manage business processes, driving innovation and efficiency across organizations of all sizes and industries.</p>
        </section>
        <section>
          <div>What we offer ?</div>
          <div>Dynamic Business Process Management
            With our intuitive interface, administrators can easily map out, customize, and modify business processes to align with evolving requirements and objectives.
            Flexible Requirement Management
            Our platform empowers administrators to define, track, and manage requirements with precision, ensuring clarity and alignment across teams.
            Efficient Instance Cycle Management
            Seamlessly manage instance lifecycles, rebuild the business process from scratch, from creation to completion, with advanced tracking, monitoring, and optimization features.
            Collaborative Workspace
            Foster collaboration and communication among stakeholders with built-in tools for sharing insights, gathering feedback, and driving consensus.
          </div>
        </section>
        <section>
          <h1>Developers</h1>
          <p>Process leads by Hassan Nusi Atan from Safwa Global Ventures (M) Sdn Bhd & Powered by a team from Schinkels Technik Sdn Bhd from the good fellowship of Bani Dom. Stickynotebrain. Adham AA. Ajiq. Aliah Ali. Ema. Fred. Kashaf. Wan. AmadZufa. Hisyamdarwis.</p>
        </section>
      </main>
    </ScrollAreaAutosize>
  )
}

export default AboutContent