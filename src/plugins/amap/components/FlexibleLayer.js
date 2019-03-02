/* eslint-disable no-undef */
export default {
  name: 'FlexibleLayerPlugin',

  inject: ['$mapPromise'],

  render (h) {
    return ''
  },

  props: {
    createTile: {
      required: true,
      type: Function
    },
    opacity: {
      required: true,
      type: Number
    },
    zIndex: {
      required: true,
      type: Number
    }
  },

  data () {
    return {
      layer: null
    }
  },

  mounted () {
    this.$mapPromise.then(map => {
      this.layer = new AMap.TileLayer.Flexible({
        /**
         * 自定义切片属性，返回值为切片图片或 canvas
         * @param x: 切片横向编号
         * @param y: 切片纵向编号
         * @param z: 切片层级
         * @param success: 创建成功回调
         * @param fail: 创建失败回调
         */
        createTile: this.createTile,
        opacity: this.opacity,
        cacheSize: 256, // 内存中缓存的切片的数量上限
        zIndex: this.zIndex,
        zooms: [3, 18] // 设置可见级别，[最小级别，最大级别]
      })
      this.layer.setMap(map)
    })
  },

  destroyed () {
    if (this.layer) {
      this.layer.setMap(null)
    }
  }
}
