export default {
  name: 'TileLayerPlugin',

  data () {
    return {
      tileLayer: null
    }
  },

  render (h) {
    return ''
  },

  inject: ['$mapPromise'],

  props: ['tileUrl', 'zIndex'],

  mounted () {
    this.$mapPromise.then(map => {
      // 创建自定义切片图层，指定 getTileUrl 属性
      // eslint-disable-next-line no-undef
      this.tileLayer = new AMap.TileLayer({
        getTileUrl: this.tileUrl,
        zIndex: this.zIndex
      })

      this.tileLayer.setMap(map)
    })
  },

  destroyed () {
    this.$mapPromise.then(map => {
      map.remove(this.tileLayer)
    })
  }
}
