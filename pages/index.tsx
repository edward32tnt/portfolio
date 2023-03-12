import type { NextPage } from 'next';
import App, { AppContext, AppProps } from 'next/app';
import UnitCard from '../components/UnitCard';
import client from '../libs/apollo';
import { getPersonInfo } from '../libs/apolloQuerys';
interface Props {
  personInfo: {
    textDatas: [
      {
        id: string;
        title: string;
        value: {
          raw?: {
            children: [
              {
                type: string;
                children: [
                  {
                    text: string;
                  }
                ];
              }
            ];
          };
        };
      }
    ];
  };
}

const Home: NextPage<Props> = ({ personInfo }) => {
  const { textDatas } = personInfo;
  const bio = textDatas[0];
  return (
    <div className="grid grid-cols-2 gap-1">
      <UnitCard className=" col-span-2 border-b p-3">
        <p className=" text-stone-700 text-lg">{bio.title}</p>
        <p
          className=" text-md text-stone-500 text-left mt-1"
          dangerouslySetInnerHTML={{
            __html: bio.value.raw?.children[0].children[0].text || ''
          }}
        ></p>
      </UnitCard>
      {textDatas.slice(1).map((x) => (
        <UnitCard
          key={'textdata-' + x.id}
          title={x.title}
          value={x.value.raw?.children[0].children[0].text || ''}
        />
      ))}
    </div>
  );
};

Home.getInitialProps = async () => {
  const { data } = await client.query({
    query: getPersonInfo
  });

  return {
    personInfo: data.personInfo
  };
};

export default Home;
