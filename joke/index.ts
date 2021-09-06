import { AzureFunction, Context, HttpRequest } from "@azure/functions";

type JokeResponse = {
  text: string;
};

const jokes = [
  "I was wondering why the frisbee kept getting bigger and bigger, but then it hit me.",
];

const randomElement = <T>(array: T[]) =>
  array[Math.floor(Math.random() * array.length)];

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<any> {
  const response: JokeResponse = {
    text: randomElement(jokes),
  };

  return {
    // status: 200, /* Defaults to 200 */
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response),
  };
};

export default httpTrigger;
