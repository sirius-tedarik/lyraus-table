import { shallowMount } from "@vue/test-utils";
import ColumnContent from "../../../src/LyrausTable/ColumnContent.vue";
import moment from "moment";

// Mock the moment library
jest.mock("moment", () => {
  return () => ({
    format: jest.fn(() => "Mocked Date"),
  });
});

describe("ColumnContent.vue", () => {
  const factory = (propsData: any) => {
    return shallowMount(ColumnContent, {
      propsData: {
        row: { content: "This is some text", extraContent: "Extra Content" },
        column: { key: "content", extraKeys: ["extraContent"] },
        ...propsData,
      },
    });
  };

  it("renders content normally when no maxLength and isDate are provided", () => {
    const wrapper = factory({});
    expect(wrapper.text()).toContain("This is some text");
    expect(wrapper.text()).toContain("Extra Content");
  });

  it("truncates text correctly when maxLength is provided", () => {
    const wrapper = factory({
      column: { key: "content", maxLength: 4, extraKeys: ["extraContent"] },
    });
    expect(wrapper.text()).toContain("This...");
    expect(wrapper.text()).toContain("Extra Content");
  });

  it("formats date correctly when isDate is true", () => {
    const wrapper = factory({
      row: { content: "2022-01-01", extraContent: "Extra Content" },
      column: { key: "content", isDate: true, extraKeys: ["extraContent"] },
    });
    expect(wrapper.text()).toContain("Mocked Date");
    expect(wrapper.text()).toContain("Extra Content");
  });

  it("renders additional content from extraKeys correctly", () => {
    const wrapper = factory({});
    expect(wrapper.text()).toContain("This is some text");
    expect(wrapper.text()).toContain("Extra Content");
  });
});
