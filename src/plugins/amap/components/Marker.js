/* eslint-disable no-undef */
import {bindProps, getPropsValue} from '../utils/props'
import bindEvents from '../utils/events'

const props = {
  position: {
    type: Object
  },

  label: {
    type: Object
  },

  zIndex: {
    type: Number
  },

  angle: {
    type: Number
  },

  offset: {
    type: Object
  },

  icon: {
    type: Object
  },

  top: {
    type: Boolean
  },

  extData: {
    type: Object
  },

  options: {
    type: Object
  },

  content: {}
}

const events = [
  'click',
  'mouseover',
  'mouseout'
]

export default {
  render () {
    return ''
  },

  props,

  data () {
    return {
      map: null,
      marker: null
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
      this.marker = new AMap.Marker(options)
      bindProps(this, this.marker, props)
      bindEvents(this, this.marker, events)
      this.marker.setMap(map)
    })
  },

  destroyed () {
    if (this.marker) {
      this.marker.setMap(null)
    }
  }
}
