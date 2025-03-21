import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    // Get player points
    const playerRes = await sql`
      SELECT points FROM Players WHERE address = ${address as any}
    `;
    
    if (playerRes.rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    const maxBoosts = playerRes.rows[0].points > 10000 ? 3 : 2;

    // Get boost usage
    const boostRes = await sql`
      SELECT * FROM BoostUsage WHERE address = ${address as any}
    `;

    if (boostRes.rows.length === 0) {
      return res.json({
        boost_count: 0,
        last_boost: null,
        maxBoosts,
        remainingBoosts: maxBoosts
      });
    }

    return res.json({
      ...boostRes.rows[0],
      maxBoosts,
      remainingBoosts: maxBoosts - boostRes.rows[0].boost_count
    });
  } catch (error) {
    console.error('Error fetching boost usage:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}