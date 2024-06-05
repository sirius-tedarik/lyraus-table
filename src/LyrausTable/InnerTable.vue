<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div>
    <table :class="innerTableClass">
      <thead :class="innerTheadClass">
        <tr>
          <th
            v-for="(column, colIndex) in innerTable"
            :key="colIndex"
            :style="{ minWidth: `${column.width}px` }"
            :class="innerThClass"
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
      <tbody :class="innerTbodyClass">
        <tr v-for="(row, rowIndex) in data" :key="rowIndex">
          <td
            v-if="row !== 'desc' && rowIndex === activeDescriptionIndex"
            v-for="(column, colIndex) in innerTable"
            :style="{ minWidth: `${column.width}px` }"
            :key="colIndex"
            :class="innerTdClass"
          >
            <!-- px-3 -->
            <div :class="colIndex + 1 === innerTable.length ? '' : 'border-r'">
              <ColumnContent :row="row" :column="column" :index="rowIndex" />
            </div>
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
    activeDescriptionIndex: { type: Number },
    innerTableClass: {
      type: String,
    },
    innerTheadClass: {
      type: String,
    },
    innerThClass: {
      type: String,
    },
    innerTdClass: {
      type: String,
    },
    innerTbodyClass: {
      type: String,
    },
  },
});
</script>
