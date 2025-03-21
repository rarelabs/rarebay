import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

interface CooldownResponse {
  cooldownEndTime: number | null;
}

interface SuccessResponse {
  message: string;
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CooldownResponse | SuccessResponse | ErrorResponse>
) {
  try {
    const { address, cooldownEndTime } = req.body || req.query;

    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    if (req.method === 'POST') {
      if (typeof cooldownEndTime !== 'number') {
        return res.status(400).json({ error: 'Cooldown end time must be a number' });
      }

      const cooldownEndDate = new Date(cooldownEndTime * 1000);

      await sql`
        UPDATE Players
        SET cooldown_end_time = ${cooldownEndDate.toISOString()}
        WHERE address = ${address};
      `;

      return res.status(200).json({ message: 'Cooldown time updated successfully' });
    }

    if (req.method === 'GET') {
      const result = await sql`
        SELECT cooldown_end_time
        FROM Players
        WHERE address = ${address};
      `;

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Player not found' });
      }

      const cooldownEndTime = result.rows[0].cooldown_end_time;

      if (cooldownEndTime && new Date(cooldownEndTime).getTime() <= Date.now()) {
        await sql`
          UPDATE Players
          SET cooldown_end_time = NULL
          WHERE address = ${address};
        `;

        return res.status(200).json({ cooldownEndTime: null });
      }

      return res.status(200).json({ cooldownEndTime: cooldownEndTime ? new Date(cooldownEndTime).getTime() / 1000 : null });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    console.error('Error in cooldown API:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
