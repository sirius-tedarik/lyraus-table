import { shallowMount } from "@vue/test-utils";
import InnerTable from "../../../src/LyrausTable/InnerTable.vue";
import ColumnContent from "../../../src/LyrausTable/ColumnContent.vue";

describe("InnerTable.vue", () => {
  const factory = (propsData: any) => {
    return shallowMount(InnerTable, {
      propsData: {
        innerTable: [
          { key: "col", label: "Column 1", width: 100 },
          { key: "col2", label: "Column 2", width: 150 },
        ],
        data: [
          { col: "Row 1 Data 1", col2: "Row 1 Data 2" },
          { col: "Row 2 Data 1", col2: "Row 2 Data 2" },
        ],
        activeDescriptionIndex: 1,
        ...propsData,
      },
      stubs: {
        ColumnContent,
      },
    });
  };

  it("renders correct number of table headers with labels and widths", () => {
    const wrapper = factory({});
    const headers = wrapper.findAll("th");
    expect(headers.length).toBe(2);
    expect(headers.at(0).text()).toBe("Column 1");
    expect(headers.at(1).text()).toBe("Column 2");
    expect(headers.at(0).attributes("style")).toContain("min-width: 100px;");
    expect(headers.at(1).attributes("style")).toContain("min-width: 150px;");
  });

  it("renders correct number of table rows with cell data", () => {
    const wrapper = factory({});
    const rows = wrapper.findAll("tbody tr");
    expect(rows.length).toBe(2);
    expect(rows.at(1).text()).toContain("Row 2 Data 1");
  });
});
