
import { useSideMenu } from '@/hooks/useSideMenu';
import { motion } from 'framer-motion';

export default function HomeContent() {
  const { sideMenu, setSideMenu } = useSideMenu();
  const toggleSideMenu = () => setSideMenu(sideMenu === 0 ? 10 : 0);

  return (
    <section
      className='w-full p-4 border border-dashed border-green-500 overflow-y-auto'>
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


        <button
          className="bg-blue-500 text-white p-2 rounded-lg w-10 hover:bg-blue-700 mr-auto"
          onClick={toggleSideMenu}
        >
          {sideMenu !== 20 ? ">" : "<"}
        </button>
      </div>
    </section>
  );
}
