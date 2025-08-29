import { Request, Response } from "express";
import convertCurrency from "../services/currencyService.js";

const getConversion = async (req: Request, res: Response) => {
  try {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount) {
      return res
        .status(400)
        .json({ error: "from, to, and amount are required" });
    }

    const result = await convertCurrency(
      from as string,
      to as string,
      Number(amount)
    );
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default getConversion;
