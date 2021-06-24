import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { BlockBlobClient } from "@azure/storage-blob";
import * as uuid from "uuid";
import { CreateThumbnailMessage, ImageDbItemType } from "../common/types";
import { jsonResponse } from "../common/util";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<any> {
  context.log("Uploading image");

  if (req.headers["content-type"] != "application/octet-stream")
    return jsonResponse(400, {
      error: "Invalid content type (must be application/octet-stream)",
    });

  const id = uuid.v4();
  const body = req.body as Buffer;

  const blobClient = new BlockBlobClient(
    process.env.STORAGE_CONNECTION_STRING,
    "images",
    `${id}.jpg`
  );

  await blobClient.uploadData(body);

  const returnValue: ImageDbItemType = { id, uri: blobClient.url };

  context.bindings.outputDocument = returnValue;
  context.bindings.outputThumbnailMessage = {
    ...returnValue,
    blobName: blobClient.name,
  } as CreateThumbnailMessage;

  return jsonResponse(201, returnValue);
};

export default httpTrigger;
