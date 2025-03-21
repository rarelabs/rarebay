// api/user/points.ts
import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

const MAX_TAPS = 1000;
const RESET_INTERVAL_HOURS = 24;
const COOLDOWN_HOURS = 8;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;

  if (!address || typeof address !== 'string') {
    return res.status(400).json({ error: 'Address is required and must be a string' });
  }

  try {
    // Fetch the current player data
    const result = await sql`
      SELECT points, tap_count, last_reset, cooldown_end_time FROM Players WHERE address = ${address};
    `;

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Player not found' });
    }

    const player = result.rows[0];
    const now = new Date();
    const lastReset = new Date(player.last_reset);
    const cooldownEnd = player.cooldown_end_time ? new Date(player.cooldown_end_time) : null;
    const hoursSinceLastReset = (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);

    let remainingTaps = MAX_TAPS - player.points;
    let isCooldownActive = cooldownEnd && now < cooldownEnd;

    if (hoursSinceLastReset >= RESET_INTERVAL_HOURS) {
      // Reset taps after 24 hours
      remainingTaps = MAX_TAPS;
      isCooldownActive = false;
      await sql`
        UPDATE Players
        SET points = 0, last_reset = ${now as any}, cooldown_end_time = NULL
        WHERE address = ${address};
      `;
    } else if (remainingTaps <= 0 && !isCooldownActive) {
      // Trigger cooldown if taps are exhausted
      const newCooldownEnd = new Date(now.getTime() + COOLDOWN_HOURS * 60 * 60 * 1000);
      isCooldownActive = true;
      await sql`
        UPDATE Players
        SET cooldown_end_time = ${newCooldownEnd as any}
        WHERE address = ${address};
      `;
    }

    return res.status(200).json({
      points: player.points,
      tapCount: player.tap_count,
      remainingTaps,
      isCooldownActive,
      cooldownTimeLeft: isCooldownActive ? (cooldownEnd.getTime() - now.getTime()) / 1000 : 0, // in seconds
    });
  } catch (error) {
    console.error('Error fetching player data:', error);
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
