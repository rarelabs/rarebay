import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { address, is_online } = req.body;

  try {
    // Update the player's online status
    await sql`
      UPDATE Players
      SET is_online = ${is_online}
      WHERE address = ${address};
    `;
    return res.status(200).json({ message: `Player is now ${is_online ? 'online' : 'offline'}` });
  } catch (error) {
    console.error('Error updating player status:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
