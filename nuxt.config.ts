// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  runtimeConfig: {
    r2: {
      tokenValue: "",
      accessKeyId: "",
      secretAccessKey: "",
      accountId: "",
    },
  },
});
