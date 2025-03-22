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
    // Expecting a POST body like: { pairKey: "RARE-USDT", reserveA: number, reserveB: number }
    const { pairKey, reserveA, reserveB } = req.body;
    if (!pairKey || reserveA === undefined || reserveB === undefined) {
      throw new Error('pairKey, reserveA, and reserveB are required');
    }
    
    // Split the pairKey to get token symbols.
    const [tokenSymbol, token2] = pairKey.split('-');
    let price = 0;
    
    // Check that USDT is in the second position.
    if (token2 === 'USDT' && reserveB > 0) {
      // Calculate price as: price = reserveA (USDT reserve) / reserveB (token reserve)
      price = reserveA / reserveB;
    } else {
      return res.status(400).json({ error: 'Pair must have USDT as the second token' });
    }
    
    // Upsert the price in the Prices table.
    const existing = await sql`SELECT * FROM Prices WHERE token_symbol = ${tokenSymbol};`;
    
    if (existing.rows.length > 0) {
      await sql`UPDATE Prices SET price = ${price}, updated_at = NOW() WHERE token_symbol = ${tokenSymbol};`;
    } else {
      await sql`INSERT INTO Prices (token_symbol, price) VALUES (${tokenSymbol}, ${price});`;
    }
    
    return res.status(200).json({ token: tokenSymbol, price });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
