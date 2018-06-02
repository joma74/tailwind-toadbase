// @ts-ignore
import renderFnkt from "@html/option-line.html"
import Vue from "vue"

let vueComponentOptions = Vue.extend({
  name: "OptionLine",
  props: {
    name: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
})

export default renderFnkt(vueComponentOptions)
