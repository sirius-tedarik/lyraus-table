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

<script>
export default {
  props: {
    rowIndex: {
      type: Number,
      required: true,
    },
    activeDescriptionIndex: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isActive() {
      return this.activeDescriptionIndex === this.rowIndex;
    },
  },
  methods: {
    handleToggle() {
      this.$emit("toggle-description", this.rowIndex);
    },
  },
};
</script>
