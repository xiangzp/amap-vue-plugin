/* eslint-disable no-undef */
export default {
  name: 'CustomLayerPlugin',

  data () {
    return {
      customLayer: null,
      $map: null
    }
  },

  render (h) {
    return ''
  },

  inject: ['$mapPromise'],

  props: ['onRender', 'zIndex'],

  created () {
    this.$mapPromise.then(map => {
      this.$map = map
      this.createCustomlayer()
    })
  },

  methods: {
    createCustomlayer () {
      const vueInst = this
      if (this.$map) {
        AMap.plugin('AMap.CustomLayer', function () {
          let canvas = document.createElement('canvas')
          vueInst.customLayer = new AMap.CustomLayer(canvas, {
            alwaysRender: false, // 缩放过程中是否重绘，复杂绘制建议设为false
            zIndex: vueInst.zIndex
          })
          function onRender () {
            vueInst.onRender(canvas)
          }
          vueInst.customLayer.render = onRender
          vueInst.customLayer.setMap(vueInst.$map)
        })
      }
    }
  },

  watch: {
    onRender () {
      if (this.customLayer) {
        this.customLayer.render()
      }
    }
  },

  destroyed () {
    if (this.customLayer) {
      this.customLayer.setMap(null)
    }
  }
}
