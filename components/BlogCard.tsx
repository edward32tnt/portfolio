import Link from 'next/link';

export interface BlogProp {
  object: 'page';
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {};
  last_edited_by: {};
  cover: {};
  icon: {};
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

export default function ({ id, properties }: BlogProp) {
  console.log(id, properties);
  return (
    <Link href={'/blog/' + id}>
      <p>{properties.Name.title[0].plain_text}</p>
    </Link>
  );
}
