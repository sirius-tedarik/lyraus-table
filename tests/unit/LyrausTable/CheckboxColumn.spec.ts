import { shallowMount } from "@vue/test-utils";
import CheckboxColumn from "../../../src/LyrausTable/CheckboxColumn.vue";

describe("CheckboxColumn.vue", () => {
  const factory = (propsData: any) => {
    return shallowMount(CheckboxColumn, {
      propsData: {
        rowId: 1,
        selectedList: [],
        ...propsData,
      },
    });
  };

  const Checkbox = (arr: number[]) => {
    const wrapper = factory({ selectedList: arr });
    const checkbox = wrapper.find('input[type="checkbox"]')
      .element as HTMLInputElement;

    return checkbox;
  };

  it("renders with correct initial state", () => {
    expect(Checkbox([1]).checked).toBe(true);
  });

  it("emits event on checkbox change", async () => {
    const wrapper = factory({});
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.trigger("change");
    expect(wrapper.emitted()["toggle-selection"][0]).toEqual([1]);
  });

  it("checkbox checked state", () => {
    expect(Checkbox([1]).checked).toBe(true);
    expect(Checkbox([]).checked).toBe(false);
  });
});
