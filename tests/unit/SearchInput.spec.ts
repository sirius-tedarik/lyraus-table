import { shallowMount } from "@vue/test-utils";
import SearchInput from "../../src/SearchInput.vue";

describe("SearchInput.vue", () => {
  it("renders with correct initial value", () => {
    const value = "initial value";
    const wrapper = shallowMount(SearchInput, {
      propsData: { value },
    });
    const input = wrapper.find("input").element as HTMLInputElement;
    expect(input.value).toBe(value);
  });

  it("updates value on prop change", async () => {
    const wrapper = shallowMount(SearchInput, {
      propsData: { value: "initial value" },
    });
    await wrapper.setProps({ value: "new value" });
    const input = wrapper.find("input").element as HTMLInputElement;
    expect(input.value).toBe("new value");
  });

  it("emits change event on input change", async () => {
    const wrapper = shallowMount(SearchInput, {
      propsData: { value: "" },
    });
    const input = wrapper.find("input");
    input.setValue("new value");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().change![0]).toEqual(["new value"]);
  });

  it("emits searcing event on enter key press", async () => {
    const wrapper = shallowMount(SearchInput);
    const input = wrapper.find("input");
    input.setValue("search term");
    await input.trigger("keypress.enter");
    expect(wrapper.emitted().searcing![0]).toEqual(["search term"]);
  });

  it("applies conditional classes", () => {
    const wrapper = shallowMount(SearchInput, {
      propsData: { isFull: false, inputClass: "custom-class" },
    });
    expect(wrapper.classes()).toContain("custom-class");
  });

  it("uses default placeholder if none provided", () => {
    const wrapper = shallowMount(SearchInput);
    const input = wrapper.find("input").element as HTMLInputElement;
    expect(input.placeholder).toBe("Aramak için yazınız");
  });

  it("uses provided placeholder", () => {
    const placeholder = "Type to search";
    const wrapper = shallowMount(SearchInput, {
      propsData: { placeholder },
    });
    const input = wrapper.find("input").element as HTMLInputElement;
    expect(input.placeholder).toBe(placeholder);
  });
});
