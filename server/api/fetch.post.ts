import { nanoid } from "nanoid";

export default defineEventHandler(async (e) => {
  try {
    const files = await readMultipartFormData(e);

    if (!files) throw createError({ statusCode: 400, statusMessage: "bad" });

    const file = files[0];

    const aws = useAWS();

    const { r2 } = useRuntimeConfig();

    const endpoint = `https://${r2.accountId}.r2.cloudflarestorage.com`;
    const bucket = "ucc-bucket";
    const directory = "images";
    const key = nanoid();

    const result = await aws.fetch(
      `${endpoint}/${bucket}/${directory}/${key}`,
      {
        method: "PUT",
        body: file.data,
      }
    );

    console.dir(result, { depth: null });

    const url = `https://pub-c1e6c9b6155a415bab82999941f276cd.r2.dev/${directory}/${key}`;

    return { ok: true, url };
  } catch (error) {
    console.log(error);

    throw error;
  }
});
