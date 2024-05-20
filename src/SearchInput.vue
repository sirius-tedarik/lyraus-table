<template>
  <div
    class="w-full flex items-center mt-4 h-11 pl-2 md:mt-0 bg-white dark:bg-gray-700 shadow rounded-md text-black dark:text-white"
    :class="[inputClass, { 'md:w-3/12': !isFull && !inputClass }]"
  >
    <i class="fas fa-search text-black dark:text-gray-200 m-0 w-1/12"></i>
    <input
      @keypress.enter="$emit('searcing', val)"
      v-model="val"
      type="search"
      class="w-11/12 bg-transparent focus:ring-0 focus:outline-none focus:border-transparent hover:outline-0 h-full pr-3"
      :placeholder="placeholder ? placeholder : 'Aramak için yazınız'"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "search-input",
  props: {
    value: String,
    isFull: Boolean,
    inputClass: String,
    placeholder: String,
  },
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      val: "",
    };
  },
  created() {
    this.val = this.value;
  },
  watch: {
    value(val) {
      this.val = val;
    },
    val(val): void {
      this.$emit("change", val);
    },
  },
});
</script>
