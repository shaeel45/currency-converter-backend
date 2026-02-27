import type { VercelRequest, VercelResponse } from '@vercel/node';
import convertCurrency from '../src/services/currencyService.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', 'https://currency-converter-frontend-two.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET requests are allowed' });
  }

  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.status(400).json({ error: 'from, to, and amount are required' });
  }

  const fromUpper = String(from).toUpperCase();
  const toUpper = String(to).toUpperCase();
  if (!/^[A-Z]{3}$/.test(fromUpper) || !/^[A-Z]{3}$/.test(toUpper)) {
    return res.status(400).json({ error: 'Invalid currency code format' });
  }

  const amountNum = Number(amount);
  if (isNaN(amountNum) || amountNum <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  try {
    const result = await convertCurrency(fromUpper, toUpper, amountNum);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal error' });
  }
}
