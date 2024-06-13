<template>
  <div
    v-if="enablePagination && pageCount > 1"
    class="pt-5 xl:flex items-center justify-between border-white-custom md:px-6 xl:px-3 py-3 w-full text-black dark:text-gray-200 dark:bg-gray-800 text-sm xl:text-base"
  >
    Toplam {{ totalRowCount }} adet kayıt listelendi

    <div
      v-if="totalRowCount"
      class="flex dark:bg-gray-800 text-sm xl:text-base mt-4 xl:mt-0"
    >
      <BorderButton
        class="mr-2"
        :action="goBack"
        :disabled="currentPage === 1"
        text="Önceki"
        :borderColor="buttonColor"
        :hoverBg="hoverColor"
      />

      <button
        @click="() => changePage(1)"
        :class="[
          `bg-${buttonColor}`,
          `text-${textColor}`,
          'h-7 px-1 w-10 rounded-lg',
          currentPage !== 1
            ? `hover:bg-${hoverColor}`
            : 'opacity-50 cursor-default',
        ]"
        class="mr-2"
      >
        {{ 1 }}
      </button>

      <p v-if="visiblePages[0] > 2" class="h-7 pr-3">...</p>

      <div class="flex">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="() => changePage(page)"
          :class="[
            `bg-${buttonColor}`,
            `text-${textColor}`,
            'h-7 px-1 w-10 rounded-lg',
            currentPage !== page
              ? `hover:bg-${hoverColor}`
              : 'opacity-50 cursor-default',
          ]"
          class="mr-2"
        >
          {{ page }}
        </button>
        <p
          v-if="visiblePages[visiblePages.length - 1] < pageCount - 1"
          class="h-7 pr-3"
        >
          ...
        </p>
        <button
          @click="() => changePage(pageCount)"
          :class="[
            `bg-${buttonColor}`,
            `text-${textColor}`,
            'h-7 px-1 w-10 rounded-lg',
            currentPage !== pageCount
              ? `hover:bg-${hoverColor}`
              : 'opacity-50 cursor-default',
          ]"
        >
          {{ pageCount }}
        </button>
      </div>

      <BorderButton
        :action="goNext"
        :disabled="currentPage === pageCount"
        text="Sonraki"
        :borderColor="buttonColor"
        :hoverBg="hoverColor"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import BorderButton from "./BorderButton.vue";

type LyrausPaginationTypes = {
  currentPage: number;
  visiblePages: number[];
};

export default Vue.extend({
  name: "lyraus-pagination",
  props: {
    parentPage: Number,
    pageCount: Number,
    totalRowCount: Number,
    buttonColor: String,
    hoverColor: String,
    textColor: String,
    enablePagination: Boolean,
  },
  model: {
    event: "changePage",
  },
  components: {
    BorderButton,
  },
  data(): LyrausPaginationTypes {
    return {
      currentPage: 1,
      visiblePages: [],
    };
  },
  methods: {
    changePage(page: number) {
      this.currentPage = page;
      this.updatePage();
    },
    goBack() {
      if (this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.updatePage();
      }
    },
    goNext() {
      if (this.currentPage < this.pageCount) {
        this.currentPage = this.currentPage + 1;
        this.updatePage();
      }
    },
    updatePage(): void {
      this.$emit("change-page", this.currentPage);
      this.handlePageButtons();
    },
    handlePageButtons() {
      const totalPageCount = this.pageCount - 1;
      const pagesToShow = 6;
      const halfPagesToShow = Math.floor(pagesToShow / 2);

      let startPage = Math.max(1, this.currentPage - halfPagesToShow);
      let endPage = Math.min(totalPageCount, startPage + pagesToShow - 1);
      startPage = Math.max(1, endPage - pagesToShow + 1);

      const calculatedPages = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      ).filter((item) => item !== 1);

      this.visiblePages =
        this.currentPage === 5 ? calculatedPages.slice(0, -1) : calculatedPages;
    },
  },
  watch: {
    pageCount() {
      this.handlePageButtons();
    },
    parentPage(val) {
      this.currentPage = val + 1;
    },
  },
  created() {
    this.handlePageButtons();
  },
});
</script>
