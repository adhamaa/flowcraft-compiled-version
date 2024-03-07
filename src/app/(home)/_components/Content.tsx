
import { useSideMenu } from '@/hooks/useSideMenu';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function HomeContent() {
  const { layoutColSpan } = useSideMenu();

  return (
    <section
      className={cn('p-4 overflow-y-auto',
        // ' border border-dashed border-green-500',
        layoutColSpan === 0 ? 'w-screen' : 'w-full'
      )}>
      <div>
        <h2>Business Process Cycle</h2>
        <p>The business process cycle is a series of steps that organizations follow to achieve their business goals. It involves the identification, design, implementation, and improvement of business processes.</p>
        <p>Here are the key stages of the business process cycle:</p>
        <ol>
          <li>Planning: This stage involves defining the objectives, scope, and requirements of the business process.</li>
          <li>Analysis: In this stage, the current state of the process is analyzed to identify areas for improvement.</li>
          <li>Design: The process is designed based on the analysis, taking into account the desired outcomes and efficiency.</li>
          <li>Implementation: The designed process is put into action, and the necessary resources are allocated.</li>
          <li>Monitoring: The implemented process is monitored to ensure it is running smoothly and meeting the desired outcomes.</li>
          <li>Optimization: Continuous improvement is done by identifying bottlenecks and making necessary adjustments to enhance efficiency.</li>
        </ol>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi molestias molestiae sapiente ipsam nisi voluptas quis reprehenderit inventore mollitia reiciendis fugiat voluptate rem, accusamus illum soluta laudantium quisquam itaque veniam?</p>
      </div>
    </section>
  );
}
