<template>
  <div class="flex items-center justify-center my-2 px-4 border-r">
    <div class="flex w-full items-center justify-center">
      <input type="checkbox" :checked="isChecked" @change="handleChange" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rowId: {
      type: Number,
      required: true,
    },
    selectedList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isChecked() {
      return this.selectedList.includes(this.rowId);
    },
  },
  methods: {
    handleChange() {
      this.$emit("toggle-selection", this.rowId);
    },
  },
};
</script>
