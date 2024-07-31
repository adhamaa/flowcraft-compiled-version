import { rem, ScrollAreaAutosize } from '@mantine/core'
import Image from 'next/image'
import * as React from 'react'

function AboutContent() {
  return (
    <main className='pt-14 space-y-16'>
      {/* section 1 */}
      <section className='relative text-center text-xl font-semibold space-y-4 max-w-3xl mx-auto'>
        <h1 className='text-5xl flex justify-center items-center'>Welcome to&nbsp;<img src='/about/fc_logo_word.png' width={254} height={87} alt='fc logo' className='inline-block' /></h1>
        <p className='w-[52ch] mx-auto'>The premier platform designed to empower IT department
          in revolutionizing business processes, managing requirements, and optimizing instance cycles effortlessly.</p>
      </section>
      {/* section 2 */}
      <section className='relative flex justify-center items-center max-w-4xl mx-auto'>
        <h1>
          <img src="/about/character_1.png" width={117} height={189} alt="device" className='absolute -left-24 bottom-0 -z-10' />
          <img src="/about/chat_bubbles_shadow.png" width={124} height={50} alt="device" className='absolute left-16 top-4' />
          <img src="/about/mini_love.png" width={500} height={214} alt="device" className='absolute left-44 -top-36 -z-10' />
          At <strong>Flowcraft</strong>, we understand the critical role that IT department plays in shaping and enhancing organizational workflows. Our mission is to provide a user-friendly, intuitive, and robust platform that equips administrators with the tools they need to adapt, evolve, and streamline business processes effectively.</h1>
        <img src="/about/section_2_bg_right.png" width={438} height={215} alt="device" className='' />
      </section>
      {/* section 3 */}
      <section className='relative flex flex-col text-center h-full py-8 mx-auto space-y-6'>
        <img src="/about/bg_blured.png" alt="bg blured" className='absolute w-full h-full mx-auto inset-0' />
        <span>
          <h1 className="font-semibold text-3xl">FLOWCRAFT</h1>
          <p className="font-semibold text-5xl tracking-[0.28em]">VISION</p>
        </span>
        <p className='w-[84ch] mx-auto'>We envision a world where administrative IT professionals have the power to manage business processes, driving innovation and efficiency across organizations of all sizes and industries.</p>
      </section>
      {/* section 4 */}
      <section className='relative flex justify-center items-center max-w-6xl mx-auto space-x-16'>
        <img src="/about/what_we_offer.png" alt="What we offer ?" />
        <div className='flex flex-col space-y-4'>
          <span>
            <h3 className='font-semibold relative inline-block after:content-[""] after:absolute after:bottom-[5px] after:h-[4px] after:rounded-[50%] after:scale-x-[1.2] after:left-[20px] after:bg-gradient-to-r from-[#7D1AFF] to-[#F1E6FF]/20 after:w-2/3 after:-z-10'>Dynamic Business Process Management</h3>
            <p>With our intuitive interface, administrators can easily map out, customize, and modify business processes to align with evolving requirements and objectives.</p>
          </span>
          <span>
            <h3 className='font-semibold relative inline-block after:content-[""] after:absolute after:bottom-[5px] after:h-[4px] after:rounded-[50%] after:scale-x-[1.2] after:left-[20px] after:bg-gradient-to-r from-[#7D1AFF] to-[#F1E6FF]/20 after:w-2/3 after:-z-10'>Flexible Requirement Management</h3>
            <p>Our platform empowers administrators to define, track, and manage requirements with precision, ensuring clarity and alignment across teams.</p>
          </span>
          <span>
            <h3 className='font-semibold relative inline-block after:content-[""] after:absolute after:bottom-[5px] after:h-[4px] after:rounded-[50%] after:scale-x-[1.2] after:left-[20px] after:bg-gradient-to-r from-[#7D1AFF] to-[#F1E6FF]/20 after:w-2/3 after:-z-10'>Efficient Instance Cycle Management</h3>
            <p>Seamlessly manage instance lifecycles, rebuild the business process from scratch, from creation to completion, with advanced tracking, monitoring, and optimization features.</p>
          </span>
          <span>
            <h3 className='font-semibold relative inline-block after:content-[""] after:absolute after:bottom-[5px] after:h-[4px] after:rounded-[50%] after:scale-x-[1.2] after:left-[20px] after:bg-gradient-to-r from-[#7D1AFF] to-[#F1E6FF]/20 after:w-2/3 after:-z-10'>Collaborative Workspace</h3>
            <p>Foster collaboration and communication among stakeholders with built-in tools for sharing insights, gathering feedback, and driving consensus.</p>
          </span>
        </div>
      </section>
      {/* section 5 */}
      <section className='relative flex flex-col text-center h-96 py-8 mx-auto space-y-6'>
        <img src="/about/bg_blured.png" alt="bg blured" className='absolute w-full h-full mx-auto inset-0' />
        {/* <h1 className="font-semibold text-3xl">Developers</h1>
        <p className='text-left max-w-xl mx-auto'>Process leads by Hassan Nusi Atan from Safwa Global Ventures (M) Sdn Bhd & Powered by a team from Schinkels Technik Sdn Bhd from the good fellowship of Bani Dom. Stickynotebrain. Adham AA. Ajiq. Aliah Ali. Ema. Fred. Kashaf. Wan. AmadZufa. Hisyamdarwis.</p> */}
      </section>
    </main>
  )
}

export default AboutContent