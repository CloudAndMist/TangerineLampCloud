// pages/index2/index2.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 树洞位置
    TreeholeAddress: {
      work: "/pages/index2/treeHole/1/work",
      life: "/pages/index2/treeHole/2/life",
      emotion: "/pages/index2/treeHole/3/emotion",
      study: "/pages/index2/treeHole/4/study",
      game: "/pages/index2/treeHole/5/game",
      exam: "/pages/index2/treeHole/6/exam"},
    // 各个子树洞的图片
    work: "/pages/index2/logo/work.svg",
    game: "/pages/index2/logo/game.svg",
    emotion:"/pages/index2/logo/emotion.svg",
    exam:"/pages/index2/logo/exam.svg",
    life: "/pages/index2/logo/life.svg",
    study:"/pages/index2/logo/study.svg",
    // 轮播图
    picList: [
      "cloud://mobile-app-dev-5ghxm1jwd77edd2b.6d6f-mobile-app-dev-5ghxm1jwd77edd2b-1323023468/index2/swiper/1.jpg",
      "cloud://mobile-app-dev-5ghxm1jwd77edd2b.6d6f-mobile-app-dev-5ghxm1jwd77edd2b-1323023468/index2/swiper/2.jpg",
      "cloud://mobile-app-dev-5ghxm1jwd77edd2b.6d6f-mobile-app-dev-5ghxm1jwd77edd2b-1323023468/index2/swiper/3.jpg"
    ],
    tempTreeholeName: null, // 临时存放树洞名称的地方
  },

  /**
   * 跳转到对应分区
   */
  gotoTreehole: function(res) {
    let temp = res.currentTarget.dataset.treeholename
    console.log("即将前往树洞：",temp, this.data.TreeholeAddress[temp])
    // let tempurl = this.data.TreeholeAddress + "?title=" + temp
    let tempurl = "/pages/index2/treeHole/treeHole?title=" + temp 
    wx.navigateTo({
      url: tempurl,
    })
  },

  /**
   * 跳转到树洞编辑页面
   */
  gotoPersonalEditor: function() {
    if (app.globalData.isLogin){
      wx.navigateTo({
        url: "/pages/index2/editPage/personalEditor"
      })
    }
    // 如果没有登录则提醒先登录
    else {
      wx.switchTab({
        url: '/pages/index3/index3',
      })
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1500
      })
    }
  },

  onLoad(){
    console.log('是否登录',app.globalData.isLogin)
  }
})