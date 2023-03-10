import { NextPage } from 'next';
import { useState } from 'react';
import SkillCard from '../../components/SkillCard';
import client from '../../libs/apollo';
import { getSkill } from '../../libs/apolloQuerys';
interface Props {
  skills: [
    {
      id: string;
      title: string;
      value: number;
    }
  ];
}
const Skill: NextPage<Props> = ({ skills }) => {
  const [expandId, setExpandId] = useState('');
  return (
    <div className="grid grid-cols-4 gap-2">
      <p className="p-2 col-span-4 text-gray-400 text-xl border-b">Skills</p>
      {skills.map((x) => (
        <SkillCard
          key={'skill-card-' + x.id}
          title={x.title}
          value={x.value}
          onClick={() => setExpandId(expandId === x.id ? '' : x.id)}
          isFocus={expandId === x.id}
          isBlur={expandId !== x.id && expandId !== ''}
        />
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
