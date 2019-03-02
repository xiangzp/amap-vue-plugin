import loadAMapApi from './loadAMapApi'

import Map from './components/Map'
import TileLayer from './components/TileLayer'
import MassMarks from './components/MassMarks'
import FlexibleLayer from './components/FlexibleLayer'
import CustomLayer from './components/CustomLayer'
import Polyline from './components/Polyline'
import Marker from './components/Marker'
import CanvasLayer from './components/CanvasLayer'
import ImageLayer from './components/ImageLayer'
import Circle from './components/Circle'

let vAMapPlugin = {}

function aMapLoadedPromise (options) {
  const onGMapLoaded = () => {
    console.log('%cHello! The AMap API has been downloaded!', 'color: #37ba1d;font-weight: 700;')
  }
  if (typeof window === 'undefined') {
    // 没有window的情况下 返回空promise
    return new Promise(() => {}).then(onGMapLoaded)
  } else {
    // resolve赋值给 高德地图下载完成执行回调
    return new Promise((resolve, reject) => {
      window['vAMapInitByFlightadsb'] = resolve
      loadAMapApi(options)
    }).then(onGMapLoaded)
  }
}

vAMapPlugin.install = (Vue, options) => {
  // 获取加载高德地图的promise对象
  let _aMapLoadedPromise = aMapLoadedPromise(options)

  // 混入到Vue对象里，方便全局调用
  Vue.mixin({
    created () {
      this.$aMapLoadedPromise = _aMapLoadedPromise
    }
  })

  Vue.component('a-map', Map)
  Vue.component('a-tile-layer', TileLayer)
  Vue.component('a-mass-marks', MassMarks)
  Vue.component('a-flexible-layer', FlexibleLayer)
  Vue.component('a-custom-layer', CustomLayer)
  Vue.component('a-polyline', Polyline)
  Vue.component('a-marker', Marker)
  Vue.component('a-canvas-layer', CanvasLayer)
  Vue.component('a-image-layer', ImageLayer)
  Vue.component('a-circle', Circle)
}

export default vAMapPlugin
