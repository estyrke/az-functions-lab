import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { ImageDbItemType } from "../common/types";
import { jsonResponse } from "../common/util";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<any> {
  const cosmosItems = context.bindings.imageDocuments as ImageDbItemType[];
  context.log(`Listing images`);

  return jsonResponse(
    200,
    cosmosItems.map((it) => ({
      id: it.id,
      uri: it.uri,
      thumbnail: it.thumbnail,
    }))
  );
};

export default httpTrigger;
