import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Fetch the total count of online players
    const result = await sql`
      SELECT COUNT(*) FROM Players WHERE is_online = true;
    `;

    return res.status(200).json({
      totalOnline: parseInt(result.rows[0].count, 10),
    });
  } catch (error) {
    console.error('Error fetching online players count:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
