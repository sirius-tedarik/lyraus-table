<template>
  <button @click="action" :class="buttonClasses">
    {{ text }}
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

export default Vue.extend({
  name: "lyraus-border-button",
  props: {
    action: {
      type: Function as PropType<() => void>,
      required: true,
    },
    text: {
      type: String,
      default: "Default",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    borderColor: {
      type: String,
      default: "gray-600",
    },
    hoverBg: {
      type: String,
      default: "gray-700",
    },
  },
  computed: {
    buttonClasses() {
      return {
        [`inline-block mx-2 w-20 text-gray-700 h-7 px-3 border border-${this.borderColor} rounded-lg hover:bg-${this.hoverBg} hover:text-white`]:
          !this.disabled,
        [`inline-block mx-2 w-20 text-gray-500 h-7 px-3 border border-${this.borderColor} rounded-lg opacity-50 cursor-default`]:
          this.disabled,
      };
    },
  },
});
</script>
