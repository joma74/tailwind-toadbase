// @ts-ignore
import renderFnkt from "@html/timelinerange.html";

/** @type {import("vue").ComponentOptions} */
let vueComponentOptions = {
  name: "TimelineRange",
  props: {
    name: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
};

export default renderFnkt(vueComponentOptions);
