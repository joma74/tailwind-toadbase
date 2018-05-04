// @ts-ignore
import renderFnkt from "@html/timelinerange.html";
import Vue from "vue";

let vueComponentOptions = Vue.extend({
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
});

export default renderFnkt(vueComponentOptions);
