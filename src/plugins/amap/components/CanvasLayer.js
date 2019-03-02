/* eslint-disable no-undef */
import {bindProps, getPropsValue} from '../utils/props'

const props = {
  canvas: {
    type: HTMLCanvasElement
  },
  zIndex: {
    type: Number
  },
  bounds: {
    type: Object
  },
  opacity: {
    type: Number
  }
}

export default {
  name: 'CanvasLayer',

  data () {
    return {
      map: null,
      layer: null
    }
  },

  props,

  render (h) {
    return ''
  },

  inject: ['$mapPromise'],

  created () {
    this.$mapPromise.then(map => {
      this.map = map
      this.createLayer()
    })
  },

  methods: {
    createLayer () {
      console.log(getPropsValue(this, props))
      this.layer = new AMap.CanvasLayer({
        ...getPropsValue(this, props)
      })
      bindProps(this, this.layer, props)
      this.layer.setMap(this.map)
      const vue = this
      setTimeout(function () {
        console.log(vue.layer.getElement())
      }, 2000)
    }
  },

  destroyed () {
    this.layer && (this.layer.setMap(null))
  }
}
