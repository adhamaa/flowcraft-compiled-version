
import { useSideMenu } from '@/hooks/useSideMenu';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HomeContent() {
  const { layoutColSpan } = useSideMenu();

  return (
    <section
      className={cn('overflow-y-auto',
        // ' border border-dashed border-green-500',
        'w-full'
      )}>
      <div className='h-20 p-8 border'>Business Process Cycle</div>
      <div className='h-56 p-8 border'>Appplications</div>
      <div className='flex flex-col items-center'>
        <Image src='/process-pana.svg' width={400} height={500} className='object-cover' alt='process illustration' />
        <span>Explore business process cycles by clicking on the application</span>
      </div>
    </section>
  );
}
