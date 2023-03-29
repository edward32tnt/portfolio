// import { NotionAPI } from 'notion-client';

import { Client } from '@notionhq/client';

import { NotionToMarkdown } from 'notion-to-md';

const client = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_KEY });

const n2m = new NotionToMarkdown({ notionClient: client });
(async () => {
  const mdBlocks = await n2m.pageToMarkdown(
    '76576ecc-573b-49d6-a748-1d1cab3ca96c'
  );
  const mdString = n2m.toMarkdownString(mdBlocks);
  console.log(mdString);
})();

// const notion = new NotionAPI({
//   activeUser: '6be9bd1a-9583-4859-87ef-dce6604d3119',
//   authToken: process.env.NEXT_PUBLIC_NOTION_KEY
// });

// client.users.me().then((res) => console.log(res));

// const run = async () => {
//   const dbs = await client.databases.query({
//     database_id: 'b9124c8029994e5588c74686be61b076'
//   });

//   console.log(dbs);
//   const p = dbs.results[0];
//   const page = await client.blocks.children.list({
//     block_id: p.id
//   });
//   for (const block of page.results) {
//     console.log(block.has_children ? block.bulleted_list_item.children : []);
//   }
// };

// run();
// notion.getPage('b9124c8029994e5588c74686be61b076').then((res) => {
//   console.log(res);
// });
