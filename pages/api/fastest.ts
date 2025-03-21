import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await sql`
      SELECT address, speed 
      FROM Players 
      WHERE speed > 0 
      ORDER BY speed DESC 
      LIMIT 1
    `;

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'No players found' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch fastest player' });
  }
}