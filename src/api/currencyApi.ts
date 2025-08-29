import type { VercelRequest, VercelResponse } from '@vercel/node';
import convertCurrency from '../services/currencyService.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET allowed' });
  }

  const { from, to, amount } = req.query;
  if (!from || !to || !amount) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const result = await convertCurrency(String(from), String(to), Number(amount));
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err || 'Server error' });
  }
}
