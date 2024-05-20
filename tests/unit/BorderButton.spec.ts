import { shallowMount } from "@vue/test-utils";
import LyrausBorderButton from "../../src/BorderButton.vue";

describe("LyrausBorderButton.vue", () => {
  it("renders with default text", () => {
    const action = jest.fn();
    const wrapper = shallowMount(LyrausBorderButton, {
      propsData: { action },
    });
    expect(wrapper.text()).toBe("Default");
  });

  it("renders with provided text", () => {
    const action = jest.fn();
    const text = "Click Me";
    const wrapper = shallowMount(LyrausBorderButton, {
      propsData: { action, text },
    });
    expect(wrapper.text()).toBe(text);
  });

  it("executes action on click", async () => {
    const action = jest.fn();
    const wrapper = shallowMount(LyrausBorderButton, {
      propsData: { action },
    });
    await wrapper.trigger("click");
    expect(action).toHaveBeenCalled();
  });

  it("applies correct classes based on disabled prop", () => {
    const action = jest.fn();
    const wrapper = shallowMount(LyrausBorderButton, {
      propsData: {
        action,
        disabled: true,
        borderColor: "blue-500",
        hoverBg: "blue-600",
      },
    });
    expect(wrapper.classes()).toContain("opacity-50");
    expect(wrapper.classes()).toContain("cursor-default");
    expect(wrapper.classes()).toContain("border-blue-500");
  });

  it("applies custom border color and hover background color", () => {
    const action = jest.fn();
    const borderColor = "red-500";
    const hoverBg = "red-600";
    const wrapper = shallowMount(LyrausBorderButton, {
      propsData: { action, borderColor, hoverBg },
    });
    expect(wrapper.classes()).toContain(`border-${borderColor}`);
    expect(wrapper.classes()).toContain(`hover:bg-${hoverBg}`);
  });
});
