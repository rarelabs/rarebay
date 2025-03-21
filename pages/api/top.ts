import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Fetch all users and sort by the number of referred users (array length) in descending order
      const result = await sql`
        SELECT user_address, referred_users, referral_id
        FROM referrals
        ORDER BY array_length(referred_users, 1) DESC
      `;

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'No users found' });
      }

      const leaderboard = result.rows.map((row: any) => ({
        userAddress: row.user_address,
        referredUsers: row.referred_users.length, // Returning the count instead of full array
        referralId: row.referral_id,
      }));

      return res.status(200).json(leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
