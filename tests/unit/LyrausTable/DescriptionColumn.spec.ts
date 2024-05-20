import { shallowMount } from "@vue/test-utils";
import DescriptionColumn from "../../../src/LyrausTable/DescriptionColumn.vue";

describe("DescriptionColumn.vue", () => {
  const factory = (propsData: any) => {
    return shallowMount(DescriptionColumn, {
      propsData: {
        rowIndex: 1,
        activeDescriptionIndex: 1,
        ...propsData,
      },
    });
  };

  it("renders in active state correctly", () => {
    const wrapper = factory({ activeDescriptionIndex: 1 });
    expect(wrapper.find("i").classes()).toContain("-rotate-90");
  });

  it("renders in inactive state correctly", () => {
    const wrapper = factory({ activeDescriptionIndex: 2 });
    expect(wrapper.find("i").classes()).not.toContain("-rotate-90");
  });

  it("emits toggle-description event on button click", async () => {
    const wrapper = factory({});
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted()["toggle-description"][0]).toEqual([1]);
  });
});
