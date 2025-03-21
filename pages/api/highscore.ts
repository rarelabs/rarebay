import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, points } = req.body;

  if (!address || points === undefined) {
    return res.status(400).json({ error: 'Address and points are required' });
  }

  try {
    // Fetch the existing player data
    const result = await sql`SELECT * FROM Players WHERE address = ${address};`;

    // Check if the player exists
    if (result.rows.length > 0) {
      const currentPlayer = result.rows[0];
      // Check if the new points are higher than the existing highscore
      if (points > currentPlayer.highscore) {
        // Update the highscore
        await sql`UPDATE Players SET highscore = ${points} WHERE address = ${address};`;
      }
      // Update the points and tap count regardless of highscore change
      await sql`UPDATE Players SET points = ${points}, tap_count = tap_count + 1 WHERE address = ${address};`;
    } else {
      // Insert a new player record with highscore set to the current points
      await sql`INSERT INTO Players (address, points, tap_count, highscore) VALUES (${address}, ${points}, 1, ${points});`;
    }

    return res.status(200).json({ message: 'Player updated' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
