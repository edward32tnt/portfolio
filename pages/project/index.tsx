import { GetServerSideProps, NextPage } from 'next';
import ProjectCard, { ProjectCardProps } from '../../components/ProjectCard';
import client from '../../libs/apollo';
import { getProject } from '../../libs/apolloQuerys';
interface Props {
  projects: ProjectCardProps[];
}

const Project: NextPage<Props> = ({ projects }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {projects.map((x) => (
        <ProjectCard {...x} key={'project-card-' + x.id} />
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: getProject
  });

  const { mainInfo } = data;
  const { projects } = mainInfo;

  return {
    props: {
      mainInfo,
      projects
    }
  };
};

export default Project;
