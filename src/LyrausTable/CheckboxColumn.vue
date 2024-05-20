<template>
  <div class="flex items-center justify-center my-2 px-4 border-r">
    <div class="flex w-full items-center justify-center">
      <input type="checkbox" :checked="isChecked" @change="handleChange" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    rowId: {
      type: Number,
      required: true,
    },
    selectedList: {
      type: Array as () => number[],
      required: true,
    },
  },
  computed: {
    isChecked() {
      return this.selectedList.includes(this.rowId);
    },
  },
  methods: {
    handleChange(): void {
      this.$emit("toggle-selection", this.rowId);
    },
  },
});
</script>
