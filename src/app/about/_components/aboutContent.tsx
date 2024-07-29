import { rem, ScrollAreaAutosize } from '@mantine/core'
import * as React from 'react'

function AboutContent() {
  return (
    <ScrollAreaAutosize pb={rem(48)} mx="auto">
      <main className='p-16 space-y-16'>
        <section className='text-center '>
          <h1>Welcome to Flowcraft</h1>
          <p>The premier platform designed to empower
            IT department
            in revolutionizing business processes, managing requirements, and optimizing instance cycles effortlessly.</p>
        </section>
        <section>
          <h1>At Flowcraft, we understand the critical role that IT department plays in shaping and enhancing organizational workflows. Our mission is to provide a user-friendly, intuitive, and robust platform that equips administrators with the tools they need to adapt, evolve, and streamline business processes effectively.</h1>
        </section>
        <section>
          <h1>SAFWA PORTAL VISION</h1>
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