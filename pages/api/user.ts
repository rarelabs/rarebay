import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    // Extract address and points from the request query
    const address = request.query.address as string;
    const points = request.query.points as unknown as number;
    const tapCount = request.query.tapCount as unknown as number; // Fetch tapCount from the request

    // Check for required fields
    if (!address || points === undefined || tapCount === undefined) {
      throw new Error('Address, points, and tapCount are required');
    }

    // Check if player exists
    const existingPlayer = await sql`SELECT * FROM Players WHERE address = ${address};`;

    // If the player exists, update their points and tap_count
    if (existingPlayer.rows.length > 0) {
      await sql`UPDATE Players SET points = ${points}, tap_count = ${tapCount} WHERE address = ${address};`;
    } else {
      // If the player does not exist, insert a new record
      await sql`INSERT INTO Players (address, points, tap_count) VALUES (${address}, ${points}, ${tapCount});`;
    }

    // Fetch all players to return updated leaderboard
    const players = await sql`SELECT * FROM Players;`;
    return response.status(200).json({ players: players.rows });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
