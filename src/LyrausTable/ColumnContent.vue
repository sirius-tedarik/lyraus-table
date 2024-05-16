<template>
  <div v-if="!isDate">
    <span v-if="maxLength"> {{ truncateText(content, maxLength) }}</span>
    <span v-else>
      {{ content }}
    </span>
    <div v-for="(extraKey, extraKeyIndex) in extraKeys" :key="extraKeyIndex">
      <span v-if="row[extraKey]">
        {{ " " + row[extraKey] }}
      </span>
    </div>
  </div>
  <div v-else>
    <span>
      {{ content | getDate }}
    </span>
    <div v-for="(extraKey, extraKeyIndex) in extraKeys" :key="extraKeyIndex">
      <span v-if="row[extraKey]"> {{ " " }}{{ row[extraKey] | getDate }} </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      required: true,
    },
    column: {
      type: Object,
      required: true,
    },
  },
  methods: {
    truncateText(text, maxLength) {
      return text.slice(0, maxLength) + "...";
    },
  },
  computed: {
    isDate() {
      return this.column.isDate;
    },
    content() {
      return this.row[this.column.key];
    },
    extraKeys() {
      return this.column.extraKeys || [];
    },
    maxLength() {
      return this.column.maxLength;
    },
  },
};
</script>
