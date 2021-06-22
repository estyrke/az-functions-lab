import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { jsonResponse } from "../common/util";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<any> {
  const cosmosItems = context.bindings.imageDocuments;
  context.log(`Listing images`);

  return jsonResponse(
    200,
    cosmosItems.map((it) => ({ id: it.id, uri: it.uri }))
  );
};

export default httpTrigger;
