// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import notion from "../../../libs/notion";

type Data = {
  parent: any;
  results: any;
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
  const parent = await notion.blocks.retrieve({ block_id: id })

  const { results } = await notion.blocks.children.list({ block_id: id })

  res.status(200).json({
    parent,
    results,
  });
}
