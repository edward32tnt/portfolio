import { GetServerSideProps, NextPage } from 'next';
import BlogCard, { BlogProp } from '../../components/BlogCard';
import client from '../../libs/apollo';
import { getBlog } from '../../libs/apolloQuerys';
import notion from '../../libs/notion';

interface Props {
  blogs: BlogProp[];
}

const Blog: NextPage<Props> = ({ blogs }) => {
  return (
    <span className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {blogs.map((x) => (
        <BlogCard key={'blog-card-' + x.id} {...x} />
      ))}
    </span>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({ query: getBlog });
  const { mainInfo } = data;

  const dbs = await notion.databases.query({
    database_id: 'b9124c8029994e5588c74686be61b076',
    filter:
      process.env.NODE_ENV === 'production'
        ? {
            and: [
              {
                property: 'Status',
                type: 'status',
                status: {
                  equals: 'Done'
                }
              }
            ]
          }
        : undefined
  });
  const { results } = dbs;

  return {
    props: {
      mainInfo,
      blogs: results
      // blogs
    }
  };
};

export default Blog;
