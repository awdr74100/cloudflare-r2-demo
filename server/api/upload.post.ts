import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from "nanoid";

export default defineEventHandler(async (e) => {
  try {
    const files = await readMultipartFormData(e);

    if (!files) throw new Error("dw");

    const file = files[0];

    const r2 = useR2();

    const key = `images/${nanoid()}`;

    const res = await r2.send(
      new PutObjectCommand({
        Bucket: "ucc-bucket",
        ContentType: file.type,
        Key: key,
        Body: file.data,
      })
    );

    // const publicUrl = `https://pub-c1e6c9b6155a415bab82999941f276cd.r2.dev/${key}`;

    const signedUrl = await getSignedUrl(
      r2,
      new GetObjectCommand({
        Bucket: "ucc-bucket",
        Key: key,
      }),
      {
        expiresIn: 20,
      }
    );

    return { ok: true, message: "Upload finish", url: signedUrl };
  } catch (error) {
    console.log(error);

    throw error;
  }
});
