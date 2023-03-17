import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ReactMarkdown from 'react-markdown';
dayjs.extend(relativeTime);

export interface CommentProps {
  id: string;
  nickname: string;
  publishedAt: Date;
  content: string;
}
const CommentCard = (c: CommentProps) => {
  return (
    <div className="border-b p-2 md:p-4 flex flex-col gap-4">
      <p className="flex gap-2 justify-between">
        <span className="text-stone-600 flex items-center gap-1">
          {c.nickname}
        </span>
        <span className="text-stone-300">{dayjs(c.publishedAt).toNow()}</span>
      </p>
      <ReactMarkdown>{c.content}</ReactMarkdown>
    </div>
  );
};

export default CommentCard;
