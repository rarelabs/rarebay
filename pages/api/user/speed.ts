import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    const result = await sql`
      SELECT speed FROM Players WHERE address = ${address as any}
    `;

    if (result.rows.length > 0) {
      res.status(200).json({ speed: result.rows[0].speed });
    } else {
      res.status(404).json({ error: 'Player not found' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch player speed' });
  }
}