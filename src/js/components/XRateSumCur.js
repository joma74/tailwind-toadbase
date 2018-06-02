// @ts-ignore
import renderFnkt from "@html/xratesumcur.html"
import Vue from "vue"

// https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
const formatter = new Intl.NumberFormat(window.navigator.language, {
  style: "decimal",
})

let vueComponentOptions = Vue.extend({
  name: "XRateCur",
  props: {
    name: {
      type: String,
    },
    curShortNameSign: {
      type: String,
    },
    rate: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formattedRate: function() {
      return formatter.format(this.rate)
    },
  },
})

export default renderFnkt(vueComponentOptions)
