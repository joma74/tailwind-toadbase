// @ts-ignore
import renderFnkt from "@home/app.html?style=@home/app.css"
import Tool from "@components/Tool"
import XRateSumCur from "@components/XRateSumCur"
import OptionLine from "@components/OptionLine"
import SpanLBF from "@components/Span-LBF"
import Vue from "vue"

let vueComponentOptions = Vue.extend({
  name: "SPARoot",
  components: {
    tool: Tool,
    xratesumcur: XRateSumCur,
    optionline: OptionLine,
    "span-lbf": SpanLBF,
  },
  data: function() {
    return {
      isMenuOpen: false,
    }
  },
  methods: {
    toggleMenu: function() {
      this.isMenuOpen = !this.isMenuOpen
    },
  },
  mounted() {
    /** @type {import("vue").default} */
    // @ts-ignore
    const compInst = this

    if (compInst.$el instanceof HTMLBodyElement)
      document.documentElement.replaceChild(compInst.$el, document.body)
    else
      console.error(
        `this.el having a value of >>${
          compInst.$el
        }<< should be an HTMLBodyElement but is not`,
      )
  },
})

export default renderFnkt(vueComponentOptions)
