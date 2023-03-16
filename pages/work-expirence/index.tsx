import { GetServerSideProps, NextPage } from 'next';
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

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: getWorkExperience
  });

  const { mainInfo } = data;
  const { workExperiences } = mainInfo;

  return {
    props: {
      works: workExperiences,
      mainInfo: mainInfo
    }
  };
};

export default WorkExpirence;
