// @ts-ignore
import renderFnkt from "@home/app.html?style=@home/app.css";
import Tool from "@components/Tool";
import XRateSumCur from "@components/XRateSumCur";
import TimelineRange from "@components/TimelineRange";


/** @type {import("vue").ComponentOptions} */
let vueComponentOptions = {
  name: "SPARoot",
  components: {
    "tool": Tool,
    "xratesumcur": XRateSumCur,
    "timelinerange": TimelineRange
  },
  data: function() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu: function(){
      this.isMenuOpen = !this.isMenuOpen;
    }
  },
  mounted() {
    /** @type {import("vue").default} */
    // @ts-ignore
    const compInst = this;
    if(compInst.$el instanceof HTMLBodyElement)
      document.documentElement.replaceChild(compInst.$el, document.body);
    else
      console.error(`this.el having a value of >>${compInst.$el}<< should be an HTMLBodyElement but is not`);
  }
};

export default renderFnkt(vueComponentOptions);
