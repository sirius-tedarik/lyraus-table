<template>
  <div v-if="!isDate" class="flex items-center px-3 my-2 justify-between">
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
  <div v-else class="flex items-center px-3 my-2 justify-between">
    <span>
      {{ content | getDate }}
    </span>
    <div v-for="(extraKey, extraKeyIndex) in extraKeys" :key="extraKeyIndex">
      <span v-if="row[extraKey]"> {{ " " }}{{ row[extraKey] | getDate }} </span>
    </div>
  </div>
</template>

<script>
import "moment/locale/tr";
import moment from "moment";

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
  filters: {
    getDate(val) {
      if (val) return moment(val).format("LLL");
      else return "Tarih Yok";
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
