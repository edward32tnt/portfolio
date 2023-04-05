import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import PlaceHolder from '../public/placeholder.png';

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
  const title = `${icon?.emoji} ${
    properties?.Name?.title[0].plain_text || ''
  } `;
  return (
    <Link
      className="rounded flex flex-col justify-start items-start shadow gap-1"
      href={'/blog/' + id}
    >
      <div className="rounded-tl rounded-tr w-full h-[10rem] overflow-hidden flex justify-center items-center">
        <Image
          className="w-full"
          src={cover?.external.url}
          alt={title}
          placeholder="blur"
          blurDataURL={PlaceHolder.blurDataURL}
          width={300}
          height={300}
          unoptimized
        />
      </div>
      <p className="text-xl break-words text-stone-500 p-2">{title}</p>
    </Link>
  );
}
