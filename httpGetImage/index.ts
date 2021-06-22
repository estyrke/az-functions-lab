import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { jsonResponse } from "../common/util";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<any> {
  const cosmosItem = context.bindings.inputDocument;
  context.log(`Getting image by id ${cosmosItem.id}!`);

  return jsonResponse(200, { id: cosmosItem.id, uri: cosmosItem.uri });
};

export default httpTrigger;
