// pages/api/get-prices.ts
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
    // Fetch all records from the Prices table.
    const pricesResult = await sql`SELECT * FROM Prices;`;
    return res.status(200).json({ prices: pricesResult.rows });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}