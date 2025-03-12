<script setup lang="ts">
import { useProductStore } from "@/stores/productStore";
import type { Product } from "@/types/product";

const productStore = useProductStore();

const getProducts = async () => {
  await productStore.getProducts();
};

onMounted(() => {
  getProducts();
});
</script>

<template>Products</template>
