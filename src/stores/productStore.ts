import { axiosDefault } from "@/plugins/axios";
import type { SimpleProduct } from "@/types/product";

export const useProductStore = defineStore("product-store", () => {
  const loading: Ref<boolean> = ref(false);

  const getSimpleProducts = async (): Promise<SimpleProduct[]> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<SimpleProduct[]>(`/products`);
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getSimpleProducts,
  };
});
