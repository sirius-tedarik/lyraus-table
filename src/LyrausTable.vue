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
                  v-if="column.key === 'selectableColumn'"
                  class="flex items-center justify-center px-4 border-r"
                >
                  <input
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
                    <slot name="sortButton" :columnKey="column.key"> </slot>
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
                <div
                  v-if="column.key === 'selectableColumn'"
                  class="flex items-center justify-center my-2 px-4 border-r"
                >
                  <div class="flex w-full items-center justify-center">
                    <input
                      type="checkbox"
                      :checked="selectedList.includes(row.id)"
                      @change="toggleSelection(row.id)"
                    />
                  </div>
                </div>
                <!-- SELECTABLE COLUMN -->

                <!-- INDEX COLUMN -->
                <div
                  v-if="column.key === 'index'"
                  class="flex items-center justify-center my-2 border-r"
                >
                  {{ rowIndex + 1 }}
                </div>
                <!-- INDEX COLUMN -->

                <!-- DESCRIPTION COLUMN -->
                <div
                  v-else-if="column.key === 'description'"
                  class="flex items-center justify-center my-2 border-r"
                >
                  <button @click="toggleDescription(rowIndex)">
                    <i class="fas fa-chevron-down text-gray-500"></i>
                  </button>
                </div>
                <!-- DESCRIPTION COLUMN -->

                <!-- DROPDOWN COLUMN -->
                <div
                  v-else-if="column.key === 'dropdownColumn' && dropdownColumn"
                  class="flex items-center px-3 my-2 border-r"
                >
                  <slot name="colDropdown" :item="row"></slot>
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
                  class="flex items-center px-3 my-2 justify-between"
                  :class="rowIndex + 1 === calcRows.length ? '' : 'border-r'"
                >
                  <span>
                    {{ row[column.key] }}
                  </span>
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
                <div>
                  <table
                    class="divide-gray-200 border-r border-gray-300 sticky left-0"
                  >
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
                            :class="
                              colIndex + 1 === innerTable.length
                                ? ''
                                : 'border-r'
                            "
                          >
                            {{ column.label }}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
                        <td
                          v-if="
                            row !== 'desc' &&
                            rowIndex === activeDescriptionIndex
                          "
                          v-for="(column, colIndex) in innerTable"
                          :style="{ minWidth: `${column.width}px` }"
                          :key="colIndex"
                          class="whitespace-nowrap text-xs px-3"
                        >
                          <span>
                            {{ row[column.key] }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
      v-if="totalCount > 0"
      :totalRowCount="totalCount"
      :pageCount="pageCount"
      :currentPage="currentPage + 1"
      @changePage="(r) => (currentPage = r - 1)"
      :buttonColor="paginationButtonColor"
      :hoverColor="paginationHoverColor"
      :textColor="paginationTextColor"
    />
  </div>
</template>

<script>
import LyrausPagination from "./LyrausPagination.vue";
import SearchInput from "./SearchInput.vue";
import LyrausInput from "./LyrausInput.vue";

export default {
  name: "lyraus-table",
  components: { LyrausPagination, SearchInput, LyrausInput },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    totalCount: {
      type: Number,
    },
    pageCount: {
      type: Number,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    selectableColumn: {
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
      type: Function,
    },
    batchOperationsList: {
      type: Array,
      default: () => [],
    },
    stickyLeft: {
      type: Array,
      default: () => [],
    },
    stickyRight: {
      type: Array,
      default: () => [],
    },
    alternateRowBg: {
      type: Array,
      default: () => [],
    },
    innerTable: {
      type: Array,
      default: () => [],
    },
    buttonsColumn: {
      type: Object,
      default: () => {},
    },
    dropdownColumn: {
      type: Object,
      default: () => {},
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
  data() {
    return {
      activeDescriptionIndex: null,
      allSelected: false,
      selectedList: [],
      searchValue: "",
      columnsList: [],
      selectedBatchOp: "",
      noneDataColumnKeys: [
        "index",
        "selectableColumn",
        "dropdownColumn",
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
    selectRow(row, index) {
      this.$emit("row-click", row, index);
    },
    toggleSelection(id) {
      const index = this.selectedList.indexOf(id);
      if (index !== -1) {
        this.selectedList.splice(index, 1);
      } else {
        this.selectedList.push(id);
      }
    },
    toggleDescription(rowIndex) {
      if (this.activeDescriptionIndex === rowIndex) {
        this.activeDescriptionIndex = null;
      } else {
        this.activeDescriptionIndex = rowIndex;
      }
    },
    getStickyColumnLeft(colIndex) {
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
    getStickyColumnRight(colIndex) {
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
    if (this.selectableColumn) {
      const selectableColumn = {
        key: "selectableColumn",
      };
      this.columnsList = [selectableColumn, ...this.columnsList];
    }
    if (this.dropdownColumn) {
      const dropdownColumn = {
        key: "dropdownColumn",
        ...this.dropdownColumn,
      };
      this.columnsList = [...this.columnsList, dropdownColumn];
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
    currentPage(val) {
      this.$emit("update-current-page", val);
    },
    selectedList(val) {
      this.$emit("update-selected", val);
    },
    searchValue(val) {
      this.$emit("update-search-value", val);
    },
    selectedBatchOp(val) {
      this.$emit("update-selected-batch-op", val);
    },
  },
};
</script>

<style scoped>
.overflow-auto {
  overflow: hidden;
  overflow-x: auto;
  overflow-y: auto;
  max-height: 400px;
}
</style>
