import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const address = Array.isArray(req.query.address) ? req.query.address[0] : req.query.address;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    // Fetch all players ordered by points descending (highest points first)
    const result = await sql`SELECT * FROM Players ORDER BY points DESC;`;

    // Use the findIndex method on the rows to find the user's rank
    const rankIndex = result.rows.findIndex(player => player.address === address);

    if (rankIndex !== -1) {
      // Rank is 1-based (not 0-based)
      const rank = rankIndex + 1;
      return res.status(200).json({ rank });
    } else {
      return res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
