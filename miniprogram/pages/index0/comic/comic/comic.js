// pages/index0/comic/comic.js

const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图
    slides: [
      { url: 'cloud://mobile-app-dev-5ghxm1jwd77edd2b.6d6f-mobile-app-dev-5ghxm1jwd77edd2b-1323023468/index0/comic/swiper/1.jpg' },
      { url: 'cloud://mobile-app-dev-5ghxm1jwd77edd2b.6d6f-mobile-app-dev-5ghxm1jwd77edd2b-1323023468/index0/comic/swiper/2.jpg' },
      { url: 'cloud://mobile-app-dev-5ghxm1jwd77edd2b.6d6f-mobile-app-dev-5ghxm1jwd77edd2b-1323023468/index0/comic/swiper/3.png' }
    ],
    // item: 0,
    // tab: 0,

    // 漫画列表
    comicList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    })
    this.getComicList();
    wx.hideLoading();
  },

  // 获取漫画列表
  getComicList() {
    // 降序，越新的漫画排在越前面
    db.collection("index0_comic").orderBy('pushTime','desc').get().then(res=>{
      this.setData({
        comicList:res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})