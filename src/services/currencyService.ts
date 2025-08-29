// @ts-ignore
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
// @ts-ignore
if (!globalThis.fetch) {
  // @ts-ignore
  globalThis.fetch = fetch;
}
const API = process.env.CURRENCY_API_KEY;
const freecurrencyapi = new Freecurrencyapi(API || "");

async function convertCurrency(from: string, to: string, amount: number) {
  try {
    const response = await freecurrencyapi.latest({
      base_currency: from.toUpperCase(),
      currencies: to.toUpperCase(),
    });

    const rate = response.data[to];
    if (!rate) {
      throw new Error(`No rate found for ${to}`);
    }

    return {
      from,
      to,
      amount,
      converted: (amount * rate).toFixed(2),
      rate,
    };
  } catch (err) {
    console.error("Currency conversion error:", err);
    throw new Error("Currency conversion failed");
  }
}

export default convertCurrency;
