import { axiosDefault } from "@/plugins/axios";
import type { Product } from "@/types/product";

export const useProductStore = defineStore("product-store", () => {
  const loading: Ref<boolean> = ref(false);

  const getProducts = async (): Promise<Product[]> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<Product[]>(`/products`);
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getProducts,
  };
});
