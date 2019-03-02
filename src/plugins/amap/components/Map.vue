<template>
  <div class="vue-AMap" ref="vueAMap">
    <slot></slot>
  </div>
</template>

<script>
import {bindProps, getPropsValue} from '../utils/props'
import bindEvents from '../utils/events'

const props = {
  viewMode: {
    type: String
  },
  zoom: {
    type: Number
  },
  center: {
  },
  lang: {
    type: String
  },
  mapStyle: {
    type: String
  },
  features: {
    type: Array
  },
  options: {
    type: Object
  }
}

const events = [
  'complete',
  'movestart',
  'moveend',
  'mapmove',
  'zoomchange',
  'zoomstart',
  'zoomend',
  'dragstart',
  'dragend',
  'resize',
  'click'
]

export default {
  name: 'AMapPlugin',

  props,

  data () {
    return {
      $map: null,
      $providePromiseCallBck: null
    }
  },

  provide () {
    // 为所有子组件依赖注入当前map对象
    let _promise = new Promise((resolve, reject) => {
      this.$providePromiseCallBck = {resolve, reject}
    })
    return {
      $mapPromise: _promise
    }
  },

  mounted () {
    return this.$aMapLoadedPromise.then(() => {
      const _ele = this.$refs['vueAMap']
      if (!_ele) return
      // 创建地图
      let _options = {
        ...getPropsValue(this, props)
      }
      // eslint-disable-next-line no-undef
      this.$map = new AMap.Map(_ele, _options)
      this.$providePromiseCallBck.resolve(this.$map)
      bindProps(this, this.$map, props)
      bindEvents(this, this.$map, events)
    })
  },

  destroyed () {
    if (this.$map) {
      this.$map.destroy()
    }
  }
}
</script>

<style scoped>
  .vue-AMap{
    width: 100%;
    height: 100%;
  }
</style>
