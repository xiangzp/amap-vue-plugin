/* eslint-disable no-undef */
import bindEvents from '../utils/events'

const props = {
  massOptions: {
    type: Object,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  options: {
    type: Object
  }
}

const events = ['click', 'mouseover', 'mouseout']

export default {
  name: 'MassMarksPlugin',

  data () {
    return {
      massMarker: null
    }
  },

  render (h) {
    return ''
  },

  computed: {
    massMarkerStyle () {
      return this.massOptions.style
    }
  },

  inject: ['$mapPromise'],

  props: props,

  mounted () {
    this.$mapPromise.then(map => {
      this.massMarker = new AMap.MassMarks(this.data, this.massOptions)
      this.massMarker.setMap(map)
      bindEvents(this, this.massMarker, events)
    })
  },

  watch: {
    massMarkerStyle () {
      if (this.massMarker) {
        this.massMarker.setStyle(this.massMarkerStyle)
      }
    },
    data () {
      if (this.massMarker) {
        this.massMarker.setData(this.data)
      }
    }
  },

  destroyed () {
    if (this.massMarker) {
      this.massMarker.clear()
    }
  }
}
