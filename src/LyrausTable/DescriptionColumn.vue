<template>
  <div class="flex items-center justify-center my-2 border-r">
    <button @click="handleToggle">
      <i
        :class="`flex transition transform duration-300 ${
          isActive ? '-rotate-90' : 'rotate-0'
        }`"
        class="fas fa-chevron-down text-gray-500"
      ></i>
    </button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: "description-column",
  props: {
    rowIndex: {
      type: Number,
      required: true,
    },
    activeDescriptionIndex: {
      type: null as undefined as PropType<Number | null>,
      required: true,
      default: null,
    },
  },
  computed: {
    isActive(): boolean {
      return this.activeDescriptionIndex === this.rowIndex;
    },
  },
  methods: {
    handleToggle(): void {
      this.$emit("toggle-description", this.rowIndex);
    },
  },
});
</script>
