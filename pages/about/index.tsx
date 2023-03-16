import { GetServerSideProps, NextPage } from 'next';
import client from '../../libs/apollo';
import { getGuessbook } from '../../libs/apolloQuerys';

const About: NextPage = () => {
  return (
    <span className="rounded-sm ring-offset-neutral-200 bg-blue-200 p-2">
      {' '}
      about{' '}
    </span>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: getGuessbook
  });

  const { mainInfo } = data;

  return {
    props: {
      mainInfo
    }
  };
};

export default About;
