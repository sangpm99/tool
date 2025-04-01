<script lang="ts" setup>
import Papa from "papaparse";
import emptyData from "@/assets/images/empty-data.jpg";

const fileInput = ref<HTMLInputElement | null>(null);
const csvData = ref<any[]>([]);
const isLoadData = ref<boolean>(false);
const isDownloadFile = ref<boolean>(false);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const readCSV = (file: File) => {
  Papa.parse(file, {
    complete: (result) => {
      csvData.value = result.data;
    },
    header: true,
  });
};

const handleFileSelect = (event: Event) => {
  try {
    isLoadData.value = true;
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      readCSV(target.files[0]);
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoadData.value = false;
  }
};

const downloadCSV = (data: any[]) => {
  const csv = Papa.unparse(data);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "data-changed.csv";
  a.click();

  URL.revokeObjectURL(url);
};

const onChangeAndDownload = () => {
  try {
    isDownloadFile.value = true;
    let id = 0;
    for (let i = 0; i < csvData.value.length; i++) {
      csvData.value[i]["SKU"] = "";
      if (csvData.value[i]["Type"] === "variable") {
        id += 1;
        csvData.value[i]["ID"] = id;
      }
      if (csvData.value[i]["Type"] === "variation") {
        csvData.value[i]["Parent"] = `id:${id}`;
      }
    }
    downloadCSV(csvData.value);
  } catch (error) {
    console.log(error);
  } finally {
    isDownloadFile.value = false;
  }
};
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardText>
            <div class="d-flex gap-4">
              <VTooltip text="Create">
                <template #activator="{ props }">
                  <VBtn
                    v-bind="props"
                    icon="mdi-plus"
                    class="rounded"
                    @click="triggerFileInput"
                    :loading="isLoadData"
                  ></VBtn>
                </template>
              </VTooltip>

              <VTooltip text="Change & Download" v-if="csvData.length">
                <template #activator="{ props }">
                  <VBtn
                    v-bind="props"
                    icon="ri-download-2-line"
                    class="rounded"
                    color="info"
                    @click="onChangeAndDownload"
                    :loading="isDownloadFile"
                  ></VBtn>
                </template>
              </VTooltip>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12" v-if="!csvData.length">
        <VCard>
          <VCardText>
            <VEmptyState :image="emptyData" size="200" text-width="250">
              <template v-slot:media>
                <v-img class="mb-8"></v-img>
              </template>

              <template v-slot:title>
                <div class="text-h6 text-high-emphasis">No result Found</div>
              </template>
            </VEmptyState>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <input
      @change="handleFileSelect"
      ref="fileInput"
      type="file"
      accept="text/csv"
      hidden
    />
  </div>
</template>
