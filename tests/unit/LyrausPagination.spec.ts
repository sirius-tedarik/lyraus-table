import { shallowMount } from "@vue/test-utils";
import LyrausPagination from "../../src/LyrausPagination.vue";

describe("LyrausPagination.vue", () => {
  const factory = (propsData: any) => {
    return shallowMount(LyrausPagination, {
      propsData: {
        pageCount: 5,
        totalRowCount: 50,
        buttonColor: "blue-500",
        hoverColor: "blue-600",
        textColor: "white",
        ...propsData,
      },
    });
  };
  const wrapper = factory({});
  const vm = wrapper.vm as any;

  it("renders with correct initial state", () => {
    expect(wrapper.findAll("button").length).toBeGreaterThan(0);
    expect(wrapper.text()).toContain("Toplam 50 adet kayıt listelendi");
  });

  it("renders correct number of buttons", () => {
    const buttons = wrapper.findAll("button");
    expect(buttons.length).toBeGreaterThan(3); // 1 "Önceki", 1 "Sonraki", and page buttons
  });

  it("handles page change correctly", async () => {
    vm.changePage(3);
    await vm.$nextTick();
    expect(wrapper.emitted()["change-page"][0]).toEqual([3]);
  });

  it("handles previous and next actions correctly", async () => {
    vm.changePage(3);
    await vm.$nextTick();
    vm.goBack();
    await vm.$nextTick();
    expect(vm.$data.currentPage).toBe(2);
    vm.goNext();
    await vm.$nextTick();
    expect(vm.$data.currentPage).toBe(3);
  });

  //   it("applies correct classes for current page button", () => {
  //     const currentPageButton = wrapper.findAll("button").at(1); // First page button (current page)
  //     expect(currentPageButton.classes()).toContain("bg-blue-500");
  //     expect(currentPageButton.classes()).toContain("text-white");
  //     expect(currentPageButton.classes()).toContain("opacity-50");
  //     expect(currentPageButton.classes()).toContain("cursor-default");
  //   });

  it("applies correct classes for non-current page button", async () => {
    vm.changePage(2);
    await vm.$nextTick();
    const nonCurrentPageButton = wrapper.findAll("button").at(2); // Second page button (not current page)
    expect(nonCurrentPageButton.classes()).toContain("bg-blue-500");
    expect(nonCurrentPageButton.classes()).toContain("text-white");
    expect(nonCurrentPageButton.classes()).toContain("hover:bg-blue-600");
  });
});
