import { S3Client } from "@aws-sdk/client-s3";

let _r2: S3Client;

export const useR2 = () => {
  if (!_r2) {
    const config = useRuntimeConfig();

    _r2 = new S3Client({
      region: "auto",
      endpoint: `https://${config.r2.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.r2.accessKeyId,
        secretAccessKey: config.r2.secretAccessKey,
      },
    });
  }

  return _r2;
};
