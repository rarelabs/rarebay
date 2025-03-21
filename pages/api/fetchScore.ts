import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;

  if (!address || typeof address !== 'string') {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    // Fetch the player data
    const result = await sql`SELECT highscore FROM Players WHERE address = ${address};`;

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }

    const highscore = result.rows[0].highscore;
    return res.status(200).json({ highscore });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
