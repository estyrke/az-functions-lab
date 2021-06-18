import { AzureFunction, Context, HttpRequest } from "@azure/functions";

type JokeResponse = {
  text: string;
};

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const response: JokeResponse = {
    text: "- Hur ser man att en bil kommer från Tyskland?\n - Det Germany'nte",
  };

  context.res = {
    // status: 200, /* Defaults to 200 */
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response),
  };
};

export default httpTrigger;
