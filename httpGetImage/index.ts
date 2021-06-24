import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { ImageDbItemType } from "../common/types";
import { jsonResponse } from "../common/util";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<any> {
  const cosmosItem = context.bindings.inputDocument as ImageDbItemType;
  context.log(`Getting image by id ${cosmosItem.id}!`);

  return jsonResponse(200, {
    id: cosmosItem.id,
    uri: cosmosItem.uri,
    thumbnail: cosmosItem.thumbnail,
  });
};

export default httpTrigger;
