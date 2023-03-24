import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';

export interface BlogProp {
  object: 'page';
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {};
  last_edited_by: {};
  cover: {
    external: {
      url: string;
    };
  };
  icon: {
    emoji: string;
    type: string;
  };
  archived: Boolean;
  properties: {
    Name: {
      title: [
        {
          type: string;
          plain_text: string;
        }
      ];
    };
  };
  url: string;
}

export default function (props: BlogProp) {
  const { id, properties, cover, icon } = props;
  console.log(props);
  return (
    <Link
      className="rounded flex flex-col justify-start items-start shadow gap-1"
      href={'/blog/' + id}
    >
      <Image
        className="w-full rounded-tl rounded-tr"
        src={cover.external.url}
        alt={properties.Name.title[0].plain_text}
        width={300}
        height={200}
      />
      <p className="text-xl break-words text-stone-500 p-2">
        {icon.emoji} {properties.Name.title[0].plain_text}
      </p>
    </Link>
  );
}
