import { AzureFunction, Context, HttpRequest } from "@azure/functions";

type JokeResponse = {
  text: string;
};

const jokes = [
  "Hur ser man att en bil kommer från Tyskland? - Det Germany'nte",
  "Det var en bonde som inte hade någon hink, istället hade han en katt som spann.",
  "Varför kan inte blinda programmera? - Dom kan ju inte C.",
  "Hur känner man igen en äkta Nintendo-nörd? - Han dricker NESCafé med 8 bitar socker.",
];

const randomElement = <T>(array: T[]) =>
  array[Math.floor(Math.random() * array.length)];

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const response: JokeResponse = {
    text: randomElement(jokes),
  };

  context.res = {
    // status: 200, /* Defaults to 200 */
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response),
  };
};

export default httpTrigger;
