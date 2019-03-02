/**
 * 给高德地图绑定事件
 */
export default function bindEvents (vueInst, AMapInst, events) {
  for (let eventName of events) {
    if (vueInst.options && !!vueInst.options.events && vueInst.options.events instanceof Array && vueInst.options.events.includes(eventName)) {
      AMapInst.on(eventName, (ev) => {
        vueInst.$emit(eventName, {
          e: ev,
          inst: AMapInst
        })
      })
    }
  }
}
