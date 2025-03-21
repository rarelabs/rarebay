// File: /api/user/activate-boost.js
import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { address } = req.body;

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        // Fetch player data
        const playerResult = await sql`SELECT tap_count, points FROM Players WHERE address = ${address};`;
        const player = playerResult.rows[0];

        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }

        // Determine max boosts allowed
        const maxBoosts = player.points > 10000 ? 3 : 2;

        // Fetch boost usage data
        const boostResult = await sql`SELECT boost_count, last_boost FROM BoostUsage WHERE address = ${address};`;
        const boostUsage = boostResult.rows[0];

        const now = new Date();

        if (boostUsage) {
            const { boost_count, last_boost } = boostUsage;
            const lastBoostTime = new Date(last_boost);
            const timeDiff = now.getTime() - lastBoostTime.getTime();
            const hoursSinceLastBoost = timeDiff / (1000 * 60 * 60);

            // Reset boost count if more than 24 hours have passed
            if (hoursSinceLastBoost > 8) {
                boostUsage.boost_count = 0;
            }

            if (boostUsage.boost_count >= maxBoosts) {
                return res.status(403).json({ error: 'Boost limit reached' });
            }
        }

        // Halve the cooldown timer
        const cooldownResult = await sql`SELECT cooldown_end_time FROM Players WHERE address = ${address};`;
        const cooldownEndTime = new Date(cooldownResult.rows[0].cooldown_end_time);
        const newCooldownEndTime = new Date((cooldownEndTime.getTime() + now.getTime()) / 2);

        await sql`UPDATE Players SET cooldown_end_time = ${newCooldownEndTime.toISOString()} WHERE address = ${address};`;

        // Update boost usage
        if (boostUsage) {
            await sql`UPDATE BoostUsage SET boost_count = ${boostUsage.boost_count + 1}, last_boost = ${now.toISOString()} WHERE address = ${address};`;
        } else {
            await sql`INSERT INTO BoostUsage (address, boost_count, last_boost) VALUES (${address}, 1, ${now.toISOString()});`;
        }

        return res.status(200).json({ message: 'Boost activated successfully' });
    } catch (error) {
        console.error('Error activating boost:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
