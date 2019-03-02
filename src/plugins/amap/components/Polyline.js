/* eslint-disable no-undef */
import {bindProps, getPropsValue} from '../utils/props'

const props = {
  path: {
    type: Array
  },
  strokeColor: {
    type: String
  },
  options: {
    type: Object
  },
  borderWeight: {},
  lineJoin: {
    type: String
  },
  extData: {}
}

export default {
  name: 'PolylinePlugin',

  data () {
    return {
      polyline: null
    }
  },

  render (h) {
    return ''
  },

  inject: ['$mapPromise'],

  props,

  mounted () {
    this.$mapPromise.then(map => {
      let options = {
        ...getPropsValue(this, props)
      }
      this.polyline = new AMap.Polyline(options)

      this.polyline.setMap(map)

      bindProps(props)
    })
  },

  destroyed () {
    if (this.polyline) {
      this.polyline.setMap(null)
    }
  }
}
