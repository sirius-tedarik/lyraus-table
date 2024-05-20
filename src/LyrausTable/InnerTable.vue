<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div>
    <table class="divide-gray-200 border-r border-gray-300 sticky left-0">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="(column, colIndex) in innerTable"
            :key="colIndex"
            :style="{ minWidth: `${column.width}px` }"
            class="py-2 text-left text-xs font-medium bg-gray-50 text-gray-500 tracking-wider border-gray-200"
          >
            <div
              class="px-3"
              :class="colIndex + 1 === innerTable.length ? '' : 'border-r'"
            >
              {{ column.label }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td
            v-if="row !== 'desc' && rowIndex === activeDescriptionIndex"
            v-for="(column, colIndex) in innerTable"
            :style="{ minWidth: `${column.width}px` }"
            :key="colIndex"
            class="whitespace-nowrap text-xs px-3"
          >
            <ColumnContent :row="row" :column="column" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import ColumnContent from "./ColumnContent.vue";

import { ColumnTypes } from "../Models";

export default Vue.extend({
  components: {
    ColumnContent,
  },
  props: {
    innerTable: {
      type: Array as () => ColumnTypes[],
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    activeDescriptionIndex: {
      type: Number,
      required: true,
    },
  },
});
</script>
