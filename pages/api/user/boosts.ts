// File: /api/user/boosts.js
import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    const result = await sql`
      SELECT boosts FROM Players WHERE address = ${address as any};
    `;

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }

    return res.status(200).json({ boosts: result.rows[0].boosts });
  } catch (error) {
    console.error('Error fetching boost count:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}