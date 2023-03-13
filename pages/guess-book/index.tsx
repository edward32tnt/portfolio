import { NextPage } from 'next';
import client, { writeClient } from '../../libs/apollo';
import {
  createGuessbook,
  getGuessbook,
  publishGuessbook
} from '../../libs/apolloQuerys';
import Comment, { CommentProps } from '../../components/CommentCard';
import { FormEventHandler, useState } from 'react';
import classNames from 'classnames';
interface Props {
  comments: CommentProps[];
}

const GuessBook: NextPage<Props> = ({ comments }) => {
  const [theData, setTheData] = useState(comments);
  const [isPending, setPending] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    content: ''
  });
  const handleSubmit: FormEventHandler = async (e) => {
    setFormData({ nickname: '', content: '' });
    setPending(true);
    e.preventDefault();
    const {
      data: {
        createGuessBook: { id }
      }
    } = await writeClient.mutate({
      mutation: createGuessbook,
      variables: {
        ...formData
      }
    });
    await writeClient.mutate({
      mutation: publishGuessbook,
      variables: {
        id: id
      }
    });

    const { data } = await client.query({
      query: getGuessbook
    });
    setPending(false);
    setTheData(data.guessBooks);

    return false;
  };
  return (
    <div className="p-4 flex flex-col gap-4">
      <form
        className="rounded p-4 bg-gray-50 flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <input
          className="rounded p-2 focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-200"
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
            className="p-2 rounded w-full focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-200"
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
        <Comment key={'comment-card-' + x.id} {...x} />
      ))}
    </div>
  );
};
GuessBook.getInitialProps = async () => {
  const { data } = await client.query({
    query: getGuessbook
  });
  return {
    comments: data.guessBooks
  };
};

export default GuessBook;
