// pages/testPost/testPost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url: 'http://110.41.175.204:8000/chatApi',
      data: {
        prompt: [ {role: "user", content: "蓝牙耳机坏了是去医院挂耳科还是牙科？"}]
      },
      header: {
        'content-type': 'application/json' // 默认值
        // 'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success (res) {
        console.log('success.')
        console.log(res.data.response)
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})