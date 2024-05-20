import { shallowMount } from "@vue/test-utils";

import LyrausTable from "../../../src/LyrausTable/index.vue";

import LyrausInput from "../../../src/LyrausInput.vue";
import SearchInput from "../../../src/SearchInput.vue";
import LyrausPagination from "../../../src/LyrausPagination.vue";

import CheckboxColumn from "../../../src/LyrausTable/CheckboxColumn.vue";
import DescriptionColumn from "../../../src/LyrausTable/DescriptionColumn.vue";
import ColumnContent from "../../../src/LyrausTable/ColumnContent.vue";
import InnerTable from "../../../src/LyrausTable/InnerTable.vue";

describe("LyrausTable.vue", () => {
  const props = {
    columns: [
      { key: "name", label: "Name", width: 200 },
      { key: "age", label: "Age", width: 100 },
    ],
    data: [
      { id: 1, name: "John Doe", age: 25 },
      { id: 2, name: "Jane Smith", age: 30 },
    ],
    totalCount: 2,
    pageCount: 1,
    pageProp: 0,
    isLoading: false,
    checkboxColumn: true,
    indexColumn: true,
    useCheckAllBox: true,
    searchBar: true,
    batchOperations: true,
    handleSearch: jest.fn(),
    batchOperationsList: [{ value: "delete", label: "Delete" }],
    stickyLeft: [],
    stickyRight: [],
    alternateRowBg: ["gray-100", "white"],
    innerTable: [
      { label: "Column 1", width: 100 },
      { label: "Column 2", width: 150 },
    ],
    buttonsColumn: {},
    dropdownColumns: [],
    paginationButtonColor: "gray-600",
    paginationHoverColor: "gray-700",
    paginationTextColor: "white",
    tableHeight: "65vh",
    tableClass: "min-w-full divide-y divide-gray-200",
    theadClass: "bg-gray-50 sticky top-0 z-50",
    thClass:
      "py-3 text-left text-xs font-medium bg-gray-50 text-gray-500 tracking-wider border-gray-200",
    tdClass: "whitespace-nowrap border-gray-200 text-xs",
    tbodyClass: "text-black",
    outerTableDivClass: "overflow-auto",
    innerTableDivClass: "",
    containerClass: "",
    operationsDiv: "flex justify-between items-center mb-4",
  };

  const factory = (customProps = {}) => {
    return shallowMount(LyrausTable, {
      propsData: { ...props, ...customProps },
      stubs: {
        LyrausInput,
        SearchInput,
        CheckboxColumn,
        DescriptionColumn,
        ColumnContent,
        InnerTable,
        LyrausPagination,
      },
    });
  };

  const wrapper = factory();
  const vm = wrapper.vm as any;

  it("renders table correctly", () => {
    expect(wrapper.find("table").exists()).toBe(true);
    expect(wrapper.findAll("th").length).toBe(6); // including 4 builtin columns
    expect(wrapper.findAll("td").length).toBe(12); // 2 rows, 6 columns each
  });

  it("renders batch operations and search bar", () => {
    expect(wrapper.findComponent(LyrausInput).exists()).toBe(true);
    expect(wrapper.findComponent(SearchInput).exists()).toBe(true);
  });

  it("renders loading spinner when isLoading is true", () => {
    const wrapper2 = factory({ isLoading: true });
    expect(wrapper2.find(".fa-spinner").exists()).toBe(true);
  });

  it("emits row-click event when a row is clicked", async () => {
    await wrapper.findAll("td").at(4).trigger("click");
    expect(wrapper.emitted("row-click")).toBeTruthy();
    expect(wrapper.emitted("row-click")[0]).toEqual([
      { id: 1, name: "John Doe", age: 25 },
      0,
    ]);
  });

  // it("selects all rows when select all checkbox is clicked", async () => {
  //   await wrapper.find("[data-testid='checkbox-all-button']").trigger("change");
  //   expect(vm.selectedList).toEqual([1, 2]);
  // });

  it("toggles description when toggle-description event is emitted", async () => {
    const wrapper3 = factory({
      columns: [
        { key: "description", label: "Description", width: 200 },
        ...props.columns,
      ],
    });
    const vm3 = wrapper3.vm as any;

    wrapper3.findComponent(DescriptionColumn).vm.$emit("toggle-description", 1);
    await wrapper.vm.$nextTick(); // Wait until $emits have been handled
    expect(vm3.activeDescriptionIndex).toBe(1);

    wrapper3.findComponent(DescriptionColumn).vm.$emit("toggle-description", 1);
    await wrapper.vm.$nextTick(); // Wait until $emits have been handled
    expect(vm3.activeDescriptionIndex).toBe(null);
  });

  it("updates search value when input changes", async () => {
    await wrapper.findComponent(SearchInput).vm.$emit("change", "search term");
    expect(wrapper.emitted("update-search-value")).toBeTruthy();
    expect(wrapper.emitted("update-search-value")[0]).toEqual(["search term"]);
  });

  it("updates selected batch operation when changed", async () => {
    await wrapper.findComponent(LyrausInput).vm.$emit("change", "delete");
    expect(wrapper.emitted("update-selected-batch-op")).toBeTruthy();
    expect(wrapper.emitted("update-selected-batch-op")[0]).toEqual(["delete"]);
  });

  it("emits update-current-page when page changes", async () => {
    await wrapper.findComponent(LyrausPagination).vm.$emit("change-page", 2);
    expect(wrapper.emitted("update-current-page")).toBeTruthy();
    expect(wrapper.emitted("update-current-page")[0]).toEqual([1]);
  });
});
