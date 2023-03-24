export interface richText {
  plain_text: string;
  annotations: {
    bold: Boolean;
    code: Boolean;
    color: string;
    italic: Boolean;
    strikethrough: Boolean;
    underline: Boolean;
  };
}

export interface TypeContent {
  rich_text: richText[];
}

export interface Block {
  id: string;
  type: string;
  has_children: Boolean;
  children?: Block[];
  bulleted_list_item?: TypeContent;
  numbered_list_item?: TypeContent;
  heading_3?: TypeContent;
  heading_2?: TypeContent;
  heading_1?: TypeContent;
  paragraph?: TypeContent;
}

export default function NotionNode(parentNode: Block) {
  console.log(parentNode);
  const {
    id,
    type,
    has_children,
    children,
    bulleted_list_item,
    numbered_list_item,
    heading_2,
    paragraph
  } = parentNode;

  if (type === 'numbered_list_item') {
    return (
      <li className="pl-2 list-decimal">
        {numbered_list_item?.rich_text[0]?.plain_text}
        {has_children && (
          <ol className="pl-2 list-decimal list-inside" start={1}>
            {children?.map((x) => (
              <NotionNode key={'notion-node-' + x.id} {...x} />
            ))}
          </ol>
        )}
      </li>
    );
  }
  if (type === 'bulleted_list_item') {
    return (
      <li className="pl-2">
        {bulleted_list_item?.rich_text[0]?.plain_text}
        {has_children && (
          <ol className="pl-2 list-disc list-inside" start={1}>
            {children?.map((x) => (
              <NotionNode key={'notion-node-' + x.id} {...x} />
            ))}
          </ol>
        )}
      </li>
    );
  }
  if (type === 'paragraph') {
    return <span>{paragraph?.rich_text[0]?.plain_text}</span>;
  }
  if (type === 'heading_2') {
    return <h2 className="text-2xl">{heading_2?.rich_text[0]?.plain_text}</h2>;
  }
  return <p></p>;
}
