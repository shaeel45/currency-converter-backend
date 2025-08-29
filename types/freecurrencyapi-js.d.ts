declare module "@everapi/freecurrencyapi-js" {
  export default class Freecurrencyapi {
    constructor(apiKey: string);

    latest(options: {
      base_currency: string;
      currencies: string;
    }): Promise<{
      data: {
        [key: string]: number;
      };
    }>;

    // You can extend here with other methods from the SDK
  }
}
