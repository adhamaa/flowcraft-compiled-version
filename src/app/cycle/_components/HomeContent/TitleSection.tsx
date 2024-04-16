'use client';

import * as React from "react";

const TitleSection = ({ title }: { title: string }) => {
  return (
    <section className='px-20 py-10'>
      <h1 className='font-bold text-xl'>{title}</h1>
    </section>
  )
};

export default TitleSection;