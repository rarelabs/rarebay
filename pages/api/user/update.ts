import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, points, tapCount, speed } = req.body;

  if (!address || points === undefined) {
    return res.status(400).json({ error: 'Address and points are required' });
  }

  try {
    // Fetch the existing player data
    const result = await sql`SELECT * FROM Players WHERE address = ${address};`;

    // Check if the player exists
    if (result.rows.length > 0) {
      // Update speed only if it's higher than current
      if (speed && speed > result.rows[0].speed) {
        await sql`
          UPDATE Players 
          SET 
            points = ${points}, 
            tap_count = tap_count + 1,
            speed = ${speed}
          WHERE address = ${address};
        `;
      } else {
        await sql`
          UPDATE Players 
          SET 
            points = ${points}, 
            tap_count = tap_count + 1
          WHERE address = ${address};
        `;
      }
    } else {
      await sql`
        INSERT INTO Players (address, points, tap_count, speed) 
        VALUES (${address}, ${points}, 1, ${speed || 0});
      `;
    }

    return res.status(200).json({ message: 'Player updated' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
