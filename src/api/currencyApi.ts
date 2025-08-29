import type { VercelRequest, VercelResponse } from '@vercel/node';
import convertCurrency from '../services/currencyService.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET method is allowed' });
  }

  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.status(400).json({ error: 'from, to, and amount are required' });
  }

  try {
    const result = await convertCurrency(
      String(from),
      String(to),
      Number(amount)
    );
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal error' });
  }
}
