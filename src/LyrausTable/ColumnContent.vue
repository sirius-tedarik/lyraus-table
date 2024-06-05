<template>
  <div class="flex items-center px-3">
    <span v-if="maxLength"> {{ truncateText(content, maxLength) }}</span>
    <span v-else-if="isDate"> {{ getDate(content) }}</span>
    <span v-else>
      {{ content }}
    </span>
    <div v-for="(extraKey, extraKeyIndex) in extraKeys" :key="extraKeyIndex">
      <span v-if="row[extraKey]"> {{ " " }} {{ row[extraKey] }} </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import moment from "moment";

import "moment/locale/tr";

import { ExtendedColumnTypes } from "../Models";
export default Vue.extend({
  props: {
    row: {
      type: Object as any,
      required: true,
    },
    column: {
      type: Object as PropType<ExtendedColumnTypes>,
      required: true,
    },
    index: {
      type: Number,
    },
  },
  methods: {
    truncateText(text: string, maxLength: number) {
      return text.slice(0, maxLength) + "...";
    },
    getDate(val: string) {
      if (val) return moment(val).format("LLL");
      else return "Tarih Yok";
    },
  },
  computed: {
    isDate() {
      return this.column.isDate;
    },
    content(): string {
      return this.row[this.column.key];
    },
    extraKeys() {
      return this.column.extraKeys || [];
    },
    maxLength() {
      return this.column.maxLength;
    },
  },
});
</script>
