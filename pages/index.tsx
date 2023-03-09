import type { NextPage } from 'next';
import UnitCard from '../components/UnitCard';

const Home: NextPage = () => {
  return (
    <div className="grid grid-cols-2 gap-1">
      <UnitCard title="Location" value="Shanghai" index={0} />
      <UnitCard title="Email" value="Edward32tnt@126.com" index={1} />
      <UnitCard title="Expriences" value="10 Years" index={2} />
      <UnitCard title="Expriences" value="10 Years" index={3} />
    </div>
  );
};

export default Home;
