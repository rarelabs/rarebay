// pages/api/liquidity.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    // Expecting a POST body like: { token_symbol: "BTC", liquidity: number }
    const { token_symbol, liquidity } = req.body;
    if (!token_symbol || liquidity === undefined) {
      throw new Error('token_symbol and liquidity are required');
    }
    // Check if a liquidity record already exists for the token
    const existing = await sql`SELECT * FROM Liquidity WHERE token_symbol = ${token_symbol};`;
    if (existing.rows.length > 0) {
      await sql`UPDATE Liquidity SET liquidity = ${liquidity}, updated_at = NOW() WHERE token_symbol = ${token_symbol};`;
    } else {
      await sql`INSERT INTO Liquidity (token_symbol, liquidity) VALUES (${token_symbol}, ${liquidity});`;
    }
    return res.status(200).json({ token: token_symbol, liquidity });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
