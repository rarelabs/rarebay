import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    const leaderboard = await sql`
      SELECT address, tap_count, highscore, speed 
      FROM Players 
      ORDER BY tap_count DESC 
      LIMIT 20;
    `;
    response.status(200).json(leaderboard.rows);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
}
