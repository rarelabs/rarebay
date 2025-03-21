import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract and validate the address
    const address = typeof req.query.address === 'string' ? req.query.address : req.query.address?.[0];
    if (!address) return res.status(400).json({ error: 'Invalid address' });

    // Optimized query with LIMIT 1
    const result = await sql`SELECT tap_count FROM Players WHERE address = ${address} LIMIT 1;`;

    // Return the tap count or a 404 if not found
    return result.rows.length
      ? res.status(200).json({ tap_count: result.rows[0].tap_count })
      : res.status(404).json({ error: 'Player not found' });
  } catch (error) {
    console.error('Error fetching tap count:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
