import { NextPage } from 'next';
import EducationCard, { EducationProps } from '../../components/EducationCard';
import client from '../../libs/apollo';
import { getEducation } from '../../libs/apolloQuerys';

interface Props {
  educations: EducationProps[];
}

const Education: NextPage<Props> = ({ educations }) => {
  return (
    <div className="flex flex-row">
      {educations.map((x) => (
        <EducationCard key={'education-card-' + x.id} {...x} />
      ))}
    </div>
  );
};

Education.getInitialProps = async () => {
  const { data } = await client.query({
    query: getEducation
  });
  return {
    educations: data.mainInfo.educations
  };
};

export default Education;
