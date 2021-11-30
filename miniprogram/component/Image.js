// component/Image.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imageHeight:  Number,
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: 0,
    width: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imageLoad(e) {
      this.setData({
        width: e.detail.width / e.detail.height * this.data.imageHeight,
        height: this.data.imageHeight
      })

    }
  }
})