import { GetServerSideProps, NextPage } from 'next';
import { v4 } from 'uuid'
import client, { writeClient } from '../../libs/apollo';
import {
  createGuessbook,
  getGuessbook,
} from '../../libs/apolloQuerys';
import CommentCard, { CommentProps } from '../../components/CommentCard';
import {
  FormEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';
import classNames from 'classnames';
import { useOnScreen } from '../../libs/useOnScreen';
interface Props {
  comments: CommentProps[];
}

const GuestBook: NextPage<Props> = ({ comments }) => {
  const moreBtn = useRef<HTMLDivElement>(null)
  const isOnScreen = useOnScreen(moreBtn)
  const [theData, setTheData] = useState(comments);
  const [currentSkip, setCurrentSkip] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [isPending, setPending] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    content: ''
  });

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    const { data } = await client.query({
      query: getGuessbook,
      variables: {
        skip: currentSkip
      }
    });
    setTheData(theData.concat(data.guestBooks));
    setCurrentSkip(currentSkip + 10);
    setIsLoadingMore(false);
  };

  useEffect(() => {
    if (isOnScreen) {
      handleLoadMore()
    }
  }, [isOnScreen])

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!formData.content.trim() || !formData.nickname.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setFormData({ nickname: '', content: '' });
    setPending(true);
    const {
      data: {
        createGuestBook: { id }
      }
    } = await writeClient.mutate({
      mutation: createGuessbook,
      variables: {
        ...formData,
        hash: v4(),
      }
    });
    // await writeClient.mutate({
    //   mutation: publishGuessbook,
    //   variables: {
    //     id: id
    //   }
    // });

    const { data } = await client.query({
      query: getGuessbook
    });
    setPending(false);
    setTheData(data.guestBooks);

    return false;
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <form
        className="rounded md:p-4 md:bg-gray-50 flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <input
          className={
            ' border-2 rounded p-2 focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-200' +
            classNames({
              ' border-red-500': error
            })
          }
          type="text"
          name="nickName"
          value={formData.nickname}
          onChange={(e) =>
            setFormData({
              nickname: e.target.value,
              content: formData.content
            })
          }
          placeholder="NickName"
        />
        <p className="flex gap-4 justify-start">
          <textarea
            className={
              'border-2  p-2 rounded w-full focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-200' +
              classNames({
                ' border-red-500': error
              })
            }
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={(e) =>
              setFormData({
                nickname: formData.nickname,
                content: e.target.value
              })
            }
            cols={30}
            rows={2}
          ></textarea>
          <input
            className={classNames({
              'font-bold': true,
              'px-5': true,
              'bg-slate-300': !isPending,
              'bg-slate-200': isPending,
              rounded: true,
              'focus:ring-1': true,
              'cursor-pointer': true
            })}
            disabled={isPending}
            type="submit"
            value={isPending ? 'Sending...' : 'SEND'}
          />
        </p>
      </form>
      {theData.map((x) => (
        <CommentCard key={'comment-card-' + x.id} {...x} />
      ))}
      <div
        className={
          ' cursor-pointer rounded border p-2 items-center text-center hover:bg-gray-500 hover:text-white transition-all duration-150'
        }
        ref={moreBtn}
      >
        {isLoadingMore ? 'loading...' : 'more'}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: getGuessbook,
    variables: {
      skip: 0
    }
  });

  const { mainInfo, guestBooks } = data;

  return {
    props: {
      mainInfo,
      comments: guestBooks
    }
  };
};

export default GuestBook;
