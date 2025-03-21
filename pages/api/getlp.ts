// pages/api/get-liquidity.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    // Fetch all records from the Liquidity table
    const liquidityResult = await sql`SELECT * FROM Liquidity;`;
    return res.status(200).json({ liquidity: liquidityResult.rows });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
