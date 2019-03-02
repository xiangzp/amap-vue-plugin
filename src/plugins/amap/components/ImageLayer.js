/* eslint-disable no-undef */
import {bindProps, getPropsValue} from '../utils/props'

const props = {
  bounds: {
    type: Object,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  opacity: {
    type: Number,
    value: 1
  },
  zIndex: {
    type: Number
  },
  zooms: {
    type: Array,
    value: [3, 18]
  }
}

export default {
  name: 'ImageLayerPlugin',

  render () {
    return ''
  },

  data () {
    return {
      layer: null
    }
  },

  props,

  inject: ['$mapPromise'],

  created () {
    this.$mapPromise.then(map => {
      this.layer = new AMap.ImageLayer({
        ...getPropsValue(this, props)
      })
      this.layer.setMap(map)
      bindProps(this, this.layer, props)
    })
  },

  destroyed () {
    this.layer && (this.layer.setMap(null))
  }
}
