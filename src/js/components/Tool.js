// @ts-ignore
import renderFnkt from "@html/tool.html";
import Vue from "vue";

/** @type {import("vue").ComponentOptions & ThisType<Vue>} */
let vueComponentOptions = {
    name: "Tool",
    props: {
      svgIcon: {
        type: String
      },
      title: {
        type: String
      },
      isActive: {
        type: Boolean
      },
    }
  };
  
  export default renderFnkt(vueComponentOptions);