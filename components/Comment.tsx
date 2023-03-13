import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ReactMarkdown from 'react-markdown';
import { UserIcon } from '@heroicons/react/24/outline';

export interface CommentProps {
  id: string;
  nickname: string;
  publishedAt: Date;
  content: string;
}
const Comment = (c: CommentProps) => {
  dayjs.extend(relativeTime);
  return (
    <div className="border-b p-4 flex flex-col gap-4">
      <p className="flex gap-2 justify-between">
        <span className="text-stone-600 flex items-center gap-1">
          <UserIcon className="w-4 h-4" />
          <span>{c.nickname}</span>
        </span>
        <span className="text-stone-300">{dayjs(c.publishedAt).toNow()}</span>
      </p>
      <ReactMarkdown>{c.content}</ReactMarkdown>
    </div>
  );
};

export default Comment;
