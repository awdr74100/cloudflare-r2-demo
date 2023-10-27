<template>
  <div>
    <input type="file" multiple @change="upload" />
    <img :src="imgUrl" v-if="imgUrl" />
  </div>
</template>

<script setup lang="ts">
const imgUrl = ref<null | string>(null);

const upload = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files!;

  const formData = new FormData();

  [...files].forEach((file) => {
    formData.append("images", file);
  });

  try {
    const { url } = await $fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    console.log(url);

    imgUrl.value = url;
  } catch (error) {
    console.log(error);
  }
};
</script>
