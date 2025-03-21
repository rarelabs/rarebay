import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

const RANGE_MAP: { [key: string]: number } = {
  '30m': 30 * 60,
  '1h': 60 * 60,
  '4h': 4 * 60 * 60,
  '24h': 24 * 60 * 60,
  '1w': 7 * 24 * 60 * 60,
  '1m': 30 * 24 * 60 * 60, // 30 days
  'max': 0
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token, range } = req.query;
  if (!token || !range || !RANGE_MAP[range as string]) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  try {
    const result = await sql`
      SELECT price_changes_history FROM Prices WHERE token_symbol = ${token as string}
    `;

    if (!result.rows.length) {
      return res.status(404).json({ error: "Token not found" });
    }

    const history = result.rows[0].price_changes_history || [];
    const cutoff = RANGE_MAP[range as string] === 0 ? 0 : 
      Date.now() - RANGE_MAP[range as string] * 1000;

    // Filter and sort history
    const filtered = history
      .filter((entry: any) => 
        RANGE_MAP[range as string] === 0 || 
        new Date(entry.timestamp).getTime() >= cutoff
      )
      .sort((a: any, b: any) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

    // Generate candles
    const candles = [];
    for (let i = 0; i < filtered.length; i++) {
      const entry = filtered[i];
      const prev = filtered[i - 1];
      
      candles.push({
        timestamp: entry.timestamp,
        price: entry.price,
        open: prev ? prev.price : entry.price,
        high: Math.max(prev ? prev.price : entry.price, entry.price),
        low: Math.min(prev ? prev.price : entry.price, entry.price),
        close: entry.price
      });
    }

    return res.status(200).json({ data: candles });
  } catch (error: any) {
    console.error("Error fetching candles:", error);
    return res.status(500).json({ error: error.message });
  }
}