import Image from 'next/image';
import { ComponentType } from 'react';
import {
  HeadingComponent,
  UnorderedListComponent,
  CodeComponent,
  OrderedListComponent,
  ComponentPropsWithoutRef
} from 'react-markdown/lib/ast-to-react';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';

import { Prism } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type MarkdownComponent<key> = ComponentType<
  ComponentPropsWithoutRef<key> & ReactMarkdownProps
>;

export const h2: HeadingComponent = ({ children }) => (
  <h2 className="text-2xl pb-1 my-2">{children}</h2>
);
export const ul: UnorderedListComponent = ({ children }) => (
  <ul className="pl-3 list-inside list-[revert] py-1 text-lg">{children}</ul>
);
export const ol: OrderedListComponent = ({ children }) => (
  <ol className="pl-3 list-inside list-decimal py-1 text-lg">{children}</ol>
);
export const code: CodeComponent = (props) => {
  const match = /language-(\w+)/.exec(props.className || '');
  return props.inline ? (
    <span className="px-1 bg-gray-200 text-sky-600">
      <code>{props.children}</code>
    </span>
  ) : (
    <Prism style={materialDark} language={match ? match[1] : ''} PreTag="div">
      {props.children.join('\n')}
    </Prism>
  );
};
export const p: MarkdownComponent<'p'> = ({ children }) => (
  <span className="my-2 text-lg">{children}</span>
);
export const blockquote: MarkdownComponent<'blockquoto'> = ({ children }) => (
  <blockquote className=" border-l-4 md:ml-3 my-2 p-4 bg-gray-50 text-sm break-words">
    {children}
  </blockquote>
);
export const img: MarkdownComponent<'img'> = (props) =>
  props.src ? (
    <Image
      className=" shadow-md md:ml-4 my-2"
      width={800}
      height={800}
      src={props.src}
      alt={props.alt || 'notion-img'}
    />
  ) : (
    <span></span>
  );
