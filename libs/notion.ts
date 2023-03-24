import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

export const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_KEY });
export const n2m = new NotionToMarkdown({ notionClient: notion });
export default notion