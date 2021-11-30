const app = getApp();
Page({
  data: {
    scrollTo: '',
    items: [
      ['课程形式变化', 'a1'],
      ['自习与答疑', 'a2'],
      ['考试', 'a3'],
      ['奖学金评定', 'a4'],
      ['转专业，双、二、辅', 'a5'],
      ['保研、考研与留学', 'a6'],
      ['资源网站', 'a7'],
    ],
    CustomBar: app.globalData.CustomBar

  },
  modalClick(e) {
    this.setData({
      modalName: null
    }, function () {
      this.setData({
        scrollTo: e.currentTarget.dataset.target
      })
    })

  },
  showModal() {
    this.setData({
      modalName: 'DrawerModal'
    })
  },
  hideModal() {
    this.setData({
      modalName: null
    })
  },
});