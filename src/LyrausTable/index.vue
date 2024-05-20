<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div :class="containerClass">
    <div v-if="batchOperations || searchBar" :class="operationsDiv">
      <div v-if="batchOperations" class="w-1/4">
        <slot name="batchOperations">
          <LyrausInput
            :optList="batchOperationsList"
            v-model="selectedBatchOp"
            type="select"
            :hideContainer="true"
          />
        </slot>
      </div>
      <div v-if="searchBar" class="w-1/4">
        <slot name="searchBar">
          <SearchInput
            v-model="searchValue"
            inputClass="w-full"
            @searcing="handleSearch"
          />
        </slot>
      </div>
    </div>
    <div
      :style="{ maxHeight: tableHeight, minHeight: tableHeight }"
      :class="outerTableDivClass"
    >
      <div :class="innerTableDivClass">
        <table :class="tableClass">
          <thead :class="theadClass">
            <tr>
              <th
                v-for="(column, index) in columnsList"
                :key="index"
                :style="{
                  minWidth: `${column.width}px`,
                  position:
                    stickyLeft.includes(column.key) ||
                    stickyRight.includes(column.key)
                      ? 'sticky'
                      : 'static',
                  left: stickyLeft.includes(column.key)
                    ? getStickyColumnLeft(index)
                    : 'auto',
                  right: stickyRight.includes(column.key)
                    ? getStickyColumnRight(index)
                    : 'auto',
                }"
                :class="thClass"
              >
                <div
                  v-if="column.key === 'checkboxColumn'"
                  class="flex items-center justify-center px-4 border-r"
                >
                  <input
                    data-testid="checkbox-all-button"
                    v-if="useCheckAllBox"
                    type="checkbox"
                    @change="selectAll($event)"
                  />
                  <p v-else>
                    {{ allSelected ? "Seçimi Kaldır" : "Hepsini Seç" }}
                  </p>
                </div>
                <div
                  v-if="column.key === 'index'"
                  class="flex items-center justify-center border-r"
                >
                  {{ column.label }}
                </div>
                <div
                  v-else
                  class="flex items-left w-full justify-between items-center"
                  :class="index + 1 === columnsList.length ? '' : 'border-r'"
                >
                  <p class="pl-2">
                    {{ column.label }}
                  </p>
                  <div class="flex items-center pr-2 gap-1">
                    <slot name="sortButton" :columnKey="column.key"></slot>
                    <slot name="filterButton" :columnKey="column.key"></slot>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody :class="tbodyClass">
            <tr
              v-if="!isLoading"
              v-for="(row, rowIndex) in calcRows"
              :key="rowIndex"
            >
              <td
                v-if="row !== 'desc'"
                v-for="(column, colIndex) in columnsList"
                @click="
                  !noneDataColumnKeys.includes(column.key) &&
                    selectRow(row, rowIndex)
                "
                :key="colIndex"
                :class="[
                  tdClass,
                  rowIndex % 2 === 0 && alternateRowBg.length > 0
                    ? `bg-${alternateRowBg[0]}`
                    : `bg-${alternateRowBg[1]}`,
                ]"
                :style="{
                  minWidth: `${column.width}px`,
                  position:
                    stickyLeft.includes(column.key) ||
                    stickyRight.includes(column.key)
                      ? 'sticky '
                      : 'static',
                  left: stickyLeft.includes(column.key)
                    ? getStickyColumnLeft(colIndex)
                    : 'auto',
                  right: stickyRight.includes(column.key)
                    ? getStickyColumnRight(colIndex)
                    : 'auto',
                }"
              >
                <!-- SELECTABLE COLUMN -->
                <div v-if="column.key === 'checkboxColumn'">
                  <CheckboxColumn
                    :rowId="row.id"
                    :selectedList="selectedList"
                    @toggle-selection="toggleSelection"
                  />
                </div>
                <!-- SELECTABLE COLUMN -->

                <!-- INDEX COLUMN -->
                <div
                  v-if="column.key === 'index'"
                  class="flex items-center justify-center my-2 border-r"
                >
                  {{ calcRows.length * currentPage + rowIndex + 1 }}
                </div>
                <!-- INDEX COLUMN -->

                <!-- DESCRIPTION COLUMN -->
                <div v-else-if="column.key === 'description'">
                  <DescriptionColumn
                    :rowIndex="rowIndex"
                    :activeDescriptionIndex="activeDescriptionIndex"
                    @toggle-description="toggleDescription"
                  />
                </div>
                <!-- DESCRIPTION COLUMN -->

                <!-- DROPDOWN COLUMN -->
                <div
                  v-else-if="
                    column.key.includes('dropdownColumn') && dropdownColumns
                  "
                  class="flex items-center px-3 my-2 border-r"
                >
                  <slot
                    name="colDropdown"
                    :item="row"
                    :dropdownKey="column.key"
                  ></slot>
                </div>
                <!-- DROPDOWN COLUMN -->

                <!-- BUTTONS COLUMN -->
                <div
                  v-else-if="column.key === 'buttonsColumn' && buttonsColumn"
                  class="flex items-center px-3 my-2 border-r"
                >
                  <slot name="colButtons" :item="row" :index="rowIndex"></slot>
                </div>
                <!-- BUTTONS COLUMN -->

                <!-- REGULAR COLUMN -->
                <div
                  v-else
                  :class="colIndex + 1 === columnsList.length ? '' : 'border-r'"
                >
                  <ColumnContent
                    v-if="!column.isDate || column.isDate"
                    :row="row"
                    :column="column"
                  />
                  <slot
                    name="rowButtons"
                    :item="row"
                    :index="rowIndex"
                    :columnKey="column.key"
                  ></slot>
                </div>
                <!-- REGULAR COLUMN -->
              </td>
              <!-- INNER TABLE -->
              <td
                v-if="
                  activeDescriptionIndex !== null &&
                  activeDescriptionIndex + 1 === rowIndex
                "
                :colspan="columnsList.length"
                class="whitespace-nowrap"
              >
                <InnerTable
                  :innerTable="innerTable"
                  :data="data"
                  :activeDescriptionIndex="activeDescriptionIndex"
                />
              </td>
              <!-- INNER TABLE -->
            </tr>
            <!-- LOADING INDICATOR-->
            <tr
              class="text-gray-200 text-center"
              style="background-color: #3a3a3a"
            >
              <td v-if="isLoading" :colspan="columnsList.length" class="p-4">
                <i class="fas fa-spinner fa-spin"></i>
              </td>
              <td
                v-if="!isLoading && data.length === 0"
                :colspan="columnsList.length"
                class="p-4"
              ></td>
            </tr>
            <!-- LOADING INDICATOR-->
          </tbody>
        </table>
      </div>
    </div>
    <LyrausPagination
      :totalRowCount="totalCount"
      :parentPage="currentPage"
      :pageCount="pageCount"
      @change-page="(r) => (currentPage = r - 1)"
      :buttonColor="paginationButtonColor"
      :hoverColor="paginationHoverColor"
      :textColor="paginationTextColor"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

import LyrausPagination from "../LyrausPagination.vue";
import SearchInput from "../SearchInput.vue";
import LyrausInput from "../LyrausInput.vue";

import CheckboxColumn from "./CheckboxColumn.vue";
import DescriptionColumn from "./DescriptionColumn.vue";
import ColumnContent from "./ColumnContent.vue";
import InnerTable from "./InnerTable.vue";

import {
  ColumnTypes,
  ExtendedColumnTypes,
  BatchOperationTypes,
  BuiltInColumnTypes,
} from "../Models";

type LyrausTableTypes = {
  activeDescriptionIndex: number | null;
  allSelected: boolean;
  selectedList: number[];
  searchValue: string;
  columnsList: ExtendedColumnTypes[] | [];
  selectedBatchOp: string;
  noneDataColumnKeys: string[];
  currentPage: number;
};

export default Vue.extend({
  name: "lyraus-table",
  components: {
    LyrausPagination,
    SearchInput,
    LyrausInput,
    CheckboxColumn,
    DescriptionColumn,
    ColumnContent,
    InnerTable,
  },
  props: {
    columns: {
      type: Array as () => ExtendedColumnTypes[],
      required: true,
    },
    data: {
      type: Array as () => any,
      required: true,
    },
    totalCount: {
      type: Number,
    },
    pageCount: {
      type: Number,
    },
    pageProp: {
      type: Number,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    checkboxColumn: {
      type: Boolean,
      default: false,
    },
    indexColumn: {
      type: Boolean,
      default: false,
    },
    useCheckAllBox: {
      type: Boolean,
      default: false,
    },
    searchBar: {
      type: Boolean,
      default: false,
    },
    batchOperations: {
      type: Boolean,
      default: false,
    },
    handleSearch: {
      type: Function as PropType<() => void>,
    },
    batchOperationsList: {
      type: Array as () => PropType<BatchOperationTypes[]>,
      default: () => [],
    },
    stickyLeft: {
      type: Array as () => string[],
      default: () => [],
    },
    stickyRight: {
      type: Array as () => string[],
      default: () => [],
    },
    alternateRowBg: {
      type: Array as () => string[],
      default: () => [],
    },
    innerTable: {
      type: Array as () => ColumnTypes[],
      default: () => [],
    },
    buttonsColumn: {
      type: Object as PropType<BuiltInColumnTypes>,
      default: () => {},
    },
    dropdownColumns: {
      type: Array as () => PropType<BuiltInColumnTypes[]>,
      default: () => [],
    },
    paginationButtonColor: {
      type: String,
      default: "gray-600",
    },
    paginationHoverColor: {
      type: String,
      default: "gray-700",
    },
    paginationTextColor: {
      type: String,
      default: "white",
    },
    tableHeight: {
      type: String,
      default: "65vh",
    },
    tableClass: {
      type: String,
      default: "min-w-full divide-y divide-gray-200",
    },
    theadClass: {
      type: String,
      default: "bg-gray-50 sticky top-0 z-50",
    },
    thClass: {
      type: String,
      default:
        "py-3 text-left text-xs font-medium bg-gray-50 text-gray-500 tracking-wider border-gray-200",
    },
    tdClass: {
      type: String,
      default: "whitespace-nowrap border-gray-200 text-xs",
    },
    tbodyClass: {
      type: String,
      default: "text-black",
    },
    outerTableDivClass: {
      type: String,
      default: "overflow-auto",
    },
    innerTableDivClass: {
      type: String,
      default: "",
    },
    containerClass: {
      type: String,
      default: "",
    },
    operationsDiv: {
      type: String,
      default: "flex justify-between items-center mb-4",
    },
  },
  data(): LyrausTableTypes {
    return {
      activeDescriptionIndex: null,
      allSelected: false,
      selectedList: [],
      searchValue: "",
      columnsList: [],
      selectedBatchOp: "",
      noneDataColumnKeys: [
        "index",
        "description",
        "checkboxColumn",
        "buttonsColumn",
      ],
      currentPage: 0,
    };
  },
  methods: {
    selectAll(event) {
      if (event.target.checked) {
        this.selectedList = this.data.map((row) => row.id);
      } else {
        this.selectedList = [];
      }
    },
    selectRow(row: any, index: number): void {
      this.$emit("row-click", row, index);
    },
    toggleSelection(id: number) {
      const index = this.selectedList.indexOf(id);
      if (index !== -1) {
        this.selectedList.splice(index, 1);
      } else {
        this.selectedList.push(id);
      }
    },
    toggleDescription(rowIndex: number) {
      if (this.activeDescriptionIndex === rowIndex) {
        this.activeDescriptionIndex = null;
      } else {
        this.activeDescriptionIndex = rowIndex;
      }
    },
    getStickyColumnLeft(colIndex: number) {
      let left = 0;
      for (let i = 0; i < colIndex; i++) {
        if (this.stickyLeft.includes(this.columnsList[i].key)) {
          left += this.columnsList[colIndex].width;
        }
      }
      const stickyIndex = this.stickyLeft.findIndex(
        (item) => item === this.columnsList[colIndex].key
      );

      if (stickyIndex > 0) {
        left -= this.columnsList[colIndex].width;
        left += this.columnsList[stickyIndex].width;
      }
      return left + "px";
    },
    getStickyColumnRight(colIndex: number) {
      let right = 0;
      const totalColumns = this.columnsList.length;

      for (let i = totalColumns - 1; i > colIndex; i--) {
        if (this.stickyRight.includes(this.columnsList[i].key)) {
          right += this.columnsList[i].width;
        }
      }

      const stickyIndex = this.stickyRight.findIndex(
        (item) => item === this.columnsList[colIndex].key
      );

      if (stickyIndex > 1) {
        right -= this.columnsList[colIndex].width;
        right += this.columnsList[stickyIndex].width;
      }

      return right + "px";
    },
  },
  computed: {
    calcRows() {
      if (this.activeDescriptionIndex !== null) {
        const newRows = [...this.data];
        newRows.splice(this.activeDescriptionIndex + 1, 0, "desc");
        return newRows;
      } else {
        return this.data;
      }
    },
  },
  created() {
    if (this.indexColumn) {
      const indexColumn = { key: "index", label: "#", width: 60 };
      this.columnsList = [indexColumn, ...this.columnsList];
    }
    if (this.innerTable.length > 0) {
      const innerTable = {
        key: "description",
        width: 80,
      };
      this.columnsList = [...this.columnsList, innerTable, ...this.columns];
    } else {
      this.columnsList = [...this.columnsList, ...this.columns];
    }
    if (this.checkboxColumn) {
      const checkboxColumn = {
        key: "checkboxColumn",
      };
      this.columnsList = [checkboxColumn, ...this.columnsList];
    }
    if (this.dropdownColumns) {
      this.dropdownColumns.forEach((item) => {
        const dropdownColumn = {
          ...item,
          key: `dropdownColumn${item.key}`,
        };
        this.noneDataColumnKeys = [
          ...this.noneDataColumnKeys,
          `dropdownColumn${item.key}`,
        ];
        this.columnsList = [...this.columnsList, dropdownColumn];
      });
    }
    if (this.buttonsColumn) {
      const buttonsColumn = {
        key: "buttonsColumn",
        ...this.buttonsColumn,
      };
      this.columnsList = [...this.columnsList, buttonsColumn];
    }
  },
  watch: {
    pageProp(val) {
      this.currentPage = val;
    },
    currentPage(val): void {
      this.$emit("update-current-page", val);
    },
    selectedList(val): void {
      this.$emit("update-selected", val);
    },
    searchValue(val): void {
      this.$emit("update-search-value", val);
    },
    selectedBatchOp(val): void {
      this.$emit("update-selected-batch-op", val);
    },
  },
});
</script>

<style scoped>
.overflow-auto {
  overflow: hidden;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 400px;
}
</style>
