import { CosmosClient } from "@azure/cosmos";
import { AzureFunction, Context } from "@azure/functions";
import { BlockBlobClient } from "@azure/storage-blob";
import * as sharp from "sharp";
import { CreateThumbnailMessage, ImageDbItemType } from "../common/types";

const serviceBusQueueTrigger: AzureFunction = async function (
  context: Context,
  createThumbnailMsg: CreateThumbnailMessage
): Promise<void> {
  const { blobName, uri, id } = createThumbnailMsg;
  context.log("ServiceBus queue trigger function got url ", uri);

  const imageBlobClient = new BlockBlobClient(
    process.env.STORAGE_CONNECTION_STRING,
    "images",
    blobName
  );
  const thumbnailBlobClient = new BlockBlobClient(
    process.env.STORAGE_CONNECTION_STRING,
    "thumbnails",
    blobName
  );

  context.log("Downloading original image...");
  const input = await imageBlobClient.downloadToBuffer();

  context.log("Resizing to 128x128...");
  const output = await sharp(input)
    .resize({ width: 128, fit: "inside" })
    .jpeg({
      chromaSubsampling: "4:4:4",
    })
    .withMetadata()
    .toBuffer();

  context.log("Uploading thumbnail");
  await thumbnailBlobClient.uploadData(output);

  context.log("Updating cosmos db");
  const cosmosClient = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);
  const itemResponse = await cosmosClient
    .database("imageApp")
    .container("image")
    .item(id, id)
    .read<ImageDbItemType>();

  context.bindings.outputDocument = {
    ...itemResponse.resource,
    thumbnail: thumbnailBlobClient.url,
  };
};

export default serviceBusQueueTrigger;
