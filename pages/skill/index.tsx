import { NextPage } from 'next';
import { useState } from 'react';
import SkillCard from '../../components/SkillCard';
import client from '../../libs/apollo';
import { getSkill } from '../../libs/apolloQuerys';
interface Props {
  skills: [
    {
      id: string;
      category: string;
      integerDatas: [
        {
          id: string;
          title: string;
          value: number;
        }
      ];
    }
  ];
}
const Skill: NextPage<Props> = ({ skills }) => {
  const [expandId, setExpandId] = useState('');
  return (
    <div className="grid grid-cols-2 gap-2">
      {skills.map((x) => (
        <div
          key={'skill-category-' + x.id}
          className="grid grid-cols-2 h-full auto-rows-max gap-2"
        >
          <p className="col-span-2 p-2 text-gray-400 text-xl border-b border-b-gray-100">
            {x.category}
          </p>
          {x.integerDatas.map((s) => (
            <SkillCard
              key={'skill-card-' + s.id}
              title={s.title}
              value={s.value}
              onClick={() => setExpandId(expandId === s.id ? '' : s.id)}
              isFocus={expandId === s.id}
              isBlur={expandId !== s.id && expandId !== ''}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

Skill.getInitialProps = async () => {
  const { data } = await client.query({
    query: getSkill
  });
  return {
    skills: data.mainInfo.skills
  };
};

export default Skill;
