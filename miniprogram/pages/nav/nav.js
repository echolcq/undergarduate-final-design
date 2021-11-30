// pages/nav/nav.js
import { listData } from '../../utils/data.js';

Page({
  data: {
    loading: true,
    TabCur: 0,
    topScrollView: ['院系', '教学楼', '宿舍', '餐饮', '场馆', '校门', '服务'],
    latitude: 30.5641590000,
    longitude: 103.9787720000,
  },

  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    });
    this.mapCtx = wx.createMapContext('map')
  },

  onShow: function() {
    let id = this.data.TabCur;
    this.mapTool(listData[id].list)
    this.setData({
      loading: false
    })
  },

  tabSelect(e) {
    let id = e.currentTarget.dataset.id
    this.mapTool(listData[id].list)
    this.setData({
      TabCur: id,
      scrollLeft: (id - 1) * 60,
      animation: null,
      scrollTop: 0
    })
  },

  tapmarker: function(e) {
    console.log(e)
    this.setData({
      animation: e.markerId
    })
  },

  goToDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },

  goToNav: function (event) {
    wx.openLocation({
      latitude: event.currentTarget.dataset.latitude,
      longitude: event.currentTarget.dataset.longitude,
      scale: 18,
      name: event.currentTarget.dataset.name,
    })
  },

  mapTool: function(list) {
    let points = [];
    let markers = [];
    list.forEach(item => {
      points.push({
        latitude: item.latitude, 
        longitude: item.longitude
      })
      markers.push({
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude,
        callout: {
          content: item.title,
          color: '#0081ff',
          fontSize: 10,
          bgColor: '#ffffff',
          padding: 2,
          display: 'ALWAYS',
          anchorY: 6
        },
        iconPath: '/images/location.png',
        width: 24,
        height: 24,
      })
    })
    this.setData({
      list: list,
      points: points,
      markers: markers
    })
  },
  onShareAppMessage: function () {},
  onShareTimeline() {}

})