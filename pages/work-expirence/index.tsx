import { NextPage } from 'next';
import WorkExCard, { WorkExperience } from '../../components/WorkExCard';
import client from '../../libs/apollo';
import { getWorkExperience } from '../../libs/apolloQuerys';
interface Props {
  works: WorkExperience[];
}

const WorkExpirence: NextPage<Props> = ({ works }) => {
  return (
    <div className="flex flex-col gap-2">
      {works.map((x) => (
        <WorkExCard key={'work-ex-card-' + x.id} {...x} />
      ))}
    </div>
  );
};

WorkExpirence.getInitialProps = async () => {
  const { data } = await client.query({
    query: getWorkExperience
  });
  return {
    works: data.mainInfo.workExperiences
  };
};

export default WorkExpirence;
