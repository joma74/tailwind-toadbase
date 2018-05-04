// @ts-ignore
import renderFnkt from "@html/tool.html";
import Vue from "vue";

let vueComponentOptions = Vue.extend({
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
  });
  
  export default renderFnkt(vueComponentOptions);