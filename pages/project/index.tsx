import { NextPage } from 'next';
import ProjectCard, { ProjectCardProps } from '../../components/ProjectCard';
import client from '../../libs/apollo';
import { getProject } from '../../libs/apolloQuerys';
interface Props {
  projects: ProjectCardProps[];
}

const Project: NextPage<Props> = ({ projects }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {projects.map((x) => (
        <ProjectCard {...x} key={'project-card-' + x.id} />
      ))}
    </div>
  );
};

Project.getInitialProps = async () => {
  const { data } = await client.query({
    query: getProject
  });
  return {
    projects: data.mainInfo.projects
  };
};

export default Project;
