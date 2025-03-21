import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { userAddress, referredById } = req.body;

    if (!userAddress) {
      return res.status(400).json({ error: 'Fren address is required' });
    }

    const referralId = userAddress.slice(2, 10);

    try {
      // Check if user already exists
      const existingUser = await sql`
        SELECT * FROM referrals WHERE user_address = ${userAddress}
      `;

      if (existingUser.rowCount > 0) {
        return res.status(400).json({ error: 'Fren already registered' });
      }

      // Insert new user
      await sql`
        INSERT INTO referrals (user_address, referral_id, points, referred_users)
        VALUES (${userAddress}, ${referralId}, 0, '{}')
      `;

      // Handle referrals if referredById is provided
      if (referredById && referredById !== referralId) {
        // Check if the referral ID has been used by this user already
        const userReferralCheck = await sql`
          SELECT * FROM referrals WHERE user_address = ${userAddress} AND referred_users @> ARRAY[${referredById}]::text[]
        `;
        
        if (userReferralCheck.rowCount > 0) {
          return res.status(400).json({ error: 'You have already used this referral code' });
        }

        // Find the referrer and process points if valid
        const referrerResult = await sql`
          SELECT * FROM referrals WHERE referral_id = ${referredById}
        `;

        if (referrerResult.rowCount > 0) {
          const referrer = referrerResult.rows[0];
          const referredUsers: string[] = referrer.referred_users || [];

          if (!referredUsers.includes(userAddress)) {
            // Add the new referred user to the referrer's list
            referredUsers.push(userAddress);

            // Convert JavaScript array to PostgreSQL text[] format
            const postgresArray = `{${referredUsers.map((user) => `"${user}"`).join(',')}}`;

            // Award 100 points to the referrer
            await sql`
              UPDATE referrals
              SET points = points + 100,
                  referred_users = ${postgresArray}::text[]
              WHERE referral_id = ${referredById}
            `;
          }
        } else {
          return res.status(400).json({ error: 'Invalid referral code' });
        }
      }

      return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error handling referral:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'GET') {
    const { userAddress } = req.query;

    if (!userAddress) {
      return res.status(400).json({ error: 'User address is required' });
    }

    try {
      const result = await sql`
        SELECT referral_id, points, referred_users
        FROM referrals
        WHERE user_address = ${userAddress as any}
      `;

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = result.rows[0];
      const referredUsers = user.referred_users || [];
      return res.status(200).json({
        referralId: user.referral_id,
        totalPoints: user.points,
        totalInvited: referredUsers.length,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
