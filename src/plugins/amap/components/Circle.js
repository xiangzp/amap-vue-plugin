/* eslint-disable no-undef */
import {bindProps, getPropsValue} from '../utils/props'

const props = {
  center: {
    type: Array
  },

  radius: {
    type: Number
  },

  zIndex: {
    type: Number
  },

  strokeColor: {
    type: String
  },

  strokeOpacity: {
    type: Number
  },

  strokeWeight: {
    type: Number
  },

  fillColor: {
    type: String
  },

  fillOpacity: {
    type: Number
  },

  strokeStyle: {
    type: String
  },

  extData: {}
}

export default {
  render () {
    return ''
  },

  props,

  data () {
    return {
      map: null,
      circle: null
    }
  },

  inject: ['$mapPromise'],

  created () {
    this.$mapPromise.then(map => {
      this.map = map
      const options = {
        ...this.options,
        ...getPropsValue(this, props)
      }
      this.circle = new AMap.Circle(options)
      bindProps(this, this.circle, props)
      this.circle.setMap(map)
    })
  },

  destroyed () {
    if (this.circle) {
      this.circle.setMap(null)
    }
  }
}
