// File: /api/update-boost.js
import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { address, increment } = req.body;

  if (!address || !increment) {
    return res.status(400).json({ error: 'Address and increment are required' });
  }

  try {
    // Check if the player exists
    const playerRes = await sql`
      SELECT * FROM Players WHERE address = ${address};
    `;

    if (playerRes.rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }

    // Update or insert boost count (assume a Boosts table or column in Players)
    const currentBoosts = (await sql`
      SELECT boosts FROM Players WHERE address = ${address};
    `).rows[0]?.boosts || 0;

    const newBoosts = currentBoosts + increment;

    await sql`
      UPDATE Players SET boosts = ${newBoosts} WHERE address = ${address};
    `;

    // Optionally, you can also update game logic here, like reducing taps remaining or adjusting cooldown
    return res.status(200).json({ message: 'Boost count updated successfully', newBoosts });
  } catch (error) {
    console.error('Error updating boost count:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}