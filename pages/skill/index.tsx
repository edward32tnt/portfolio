import { NextPage } from 'next';
import SkillCard from '../../components/SkillCard';
import client from '../../libs/apollo';
import { getSkill } from '../../libs/apolloQuerys';
interface Props {
  skills: [
    {
      title: string;
      value: number;
    }
  ];
}
const Skill: NextPage<Props> = ({ skills }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <p className="p-2 col-span-4 text-gray-400 text-xl border-b">Skills</p>
      {skills.map((x) => (
        <SkillCard title={x.title} value={x.value} />
      ))}
    </div>
  );
};

Skill.getInitialProps = async () => {
  const { data } = await client.query({
    query: getSkill
  });
  return {
    skills: data.skill.integerDatas
  };
};

export default Skill;
