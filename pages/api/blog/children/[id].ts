// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { n2m } from "../../../../libs/notion";

type Data = {
  mdString: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id

  if (!id) {
    res.status(404)
    return
  }
  const mdBlocks = await n2m.pageToMarkdown(id as string);
  const mdString = n2m.toMarkdownString(mdBlocks);

  res.status(200).json({
    mdString,
  });
}
