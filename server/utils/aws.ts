import { AwsClient } from "aws4fetch";

let _aws: AwsClient;

export const useAWS = () => {
  if (!_aws) {
    const config = useRuntimeConfig();

    _aws = new AwsClient({
      region: "auto",
      accessKeyId: config.r2.accessKeyId,
      secretAccessKey: config.r2.secretAccessKey,
    });
  }

  return _aws;
};
