// components/scaleContainer/index.js
import { clone } from '../../utils/tool/style'
const regeneratorRuntime = require('../../lib/regenerator-runtime/runtime')
Component({
  externalClasses: ['custom-canteen-manage-scale'],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    startTouches: [],
    touchType: 'move', // scale move other
    translateX: 0,
    translateY: 0,
    scale: 1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    monitorTouchStart(e) {
      const touches = e.touches
      this.setData({ startTouches: clone(touches), touchType: touches.length === 2 ? 'scale' : touches.length === 1 ? 'move' : 'other' })
    },
    async monitorTouchMove(e) {
      // console.log('move', e)
      const touches = e.touches
      const { touchType, scale, startTouches, translateY, translateX } = this.data
      if (touchType === 'move') {
        const query = wx.createSelectorQuery().in(this)
        const distanceX = touches[0].clientX - startTouches[0].clientX
        const distanceY = touches[0].clientY - startTouches[0].clientY
        let viewWid = 0, viewHei = 0
        await query.select('.pages').boundingClientRect(res => {
          // 可视区域的宽高
          const { width, height } = res
          viewWid = width
          viewHei = height
        }).exec()
        query.select('.inner-page').boundingClientRect(result => {
          // 实际的宽高
          const { width: reallyWid, height: reallyHei } = result
          // console.log('可视区域宽高', viewWid, viewHei, '实际宽高', reallyWid, reallyHei)
          const newTranslateX = translateX + distanceX
          const newTranslateY = translateY + distanceY
          const limitTranslateX = reallyWid * scale - (viewWid - 24)
          const limitTranslateY = reallyHei * scale - (viewHei - 24)
          const disX = newTranslateX >= 0 ? 0 : newTranslateX <= -limitTranslateX ? -limitTranslateX : newTranslateX
          const disY = newTranslateY >= 0 ? 0 : newTranslateY <= -limitTranslateY ? -limitTranslateY : newTranslateY
          if (reallyWid * scale > viewWid) {
            this.setData({ translateX: disX, startTouches: clone(touches) })
          }
          if (reallyHei * scale > viewHei) {
            this.setData({ translateY: disY, startTouches: clone(touches) })
          }
        }).exec()
      } else if (touchType === 'scale') {
        let xNewMove = touches[1].clientX - touches[0].clientX;
        let yNewMove = touches[1].clientY - touches[0].clientY;
        let newDistance = Math.sqrt(xNewMove * xNewMove + yNewMove * yNewMove);
        let xOldMove = startTouches[1].clientX - startTouches[0].clientX;
        let yOldMove = startTouches[1].clientY - startTouches[0].clientY;
        let oldDistance = Math.sqrt(xOldMove * xOldMove + yOldMove * yOldMove)
        let newScale = scale + 0.005 * (newDistance - oldDistance)
        // console.log('缩放比例', newScale)
        // console.log('触点信息对比', touches, startTouches)
        newScale = newScale >= 2 ? 2 : newScale <= 1 ? 1 : newScale
        this.setData({ scale: newScale })
        if (newScale === 1) {
          this.setData({ translateX: 0, translateY: 0 })
        }
      }
    },
    monitorTouchEnd(e) {
      // console.log('end', e)
    },

  }
})
