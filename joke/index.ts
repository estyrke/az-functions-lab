import { AzureFunction, Context, HttpRequest } from "@azure/functions";

type JokeResponse = {
  text: string;
};

const jokes = [
  "Hur ser man att en bil kommer från Tyskland? - Det Germany'nte",
  "Hur ser man att en bil kommer från Frankrike? - På vindruvetorkarna",
  "Det var en bonde som inte hade någon hink, istället hade han en katt som spann.",
  "Varför kan inte blinda programmera? - Dom kan ju inte C.",
  "Hur känner man igen en äkta Nintendo-nörd? - Han dricker NESCafé med 8 bitar socker.",
  "Hur låter ett spökfår? - Varken bu eller bä",
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
