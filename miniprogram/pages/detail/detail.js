// pages/detail/detail.js
import { listData } from '../../utils/data.js';

Page({
  data: {
    id: 0,
    latitude: 39.9913500000,
    longitude: 116.3607200000,
    detail: [],
    screenHeight: 1205
  },

  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    var id = options.id;
    this.setData({
      id: id,
      detail: listData[parseInt(id / 100 - 1)].list[id % 100],
    });
  },

  onShow: function () {
    var height = 1205
    wx.getSystemInfo({
      success: function (res) {
        height = (res.screenHeight * 2) - 130
      },
    })

    this.setData({
      screenHeight: height
    });
  },
  
  goToNav: function () {
    var id = this.data.id;
    wx.openLocation({
      latitude: listData[parseInt(id / 100 - 1)].list[id % 100].latitude,
      longitude: listData[parseInt(id / 100 - 1)].list[id % 100].longitude,
      scale: 18,
      name: listData[parseInt(id / 100 - 1)].list[id % 100].title,
    })
  },
  onShareAppMessage: function () {},
  onShareTimeline() {}
})

