const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
var maxRoom;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomList:[],
    openId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.initOpenID();
    wx.hideLoading();
    wx.getSystemInfo({
      success: (res) =>[
          this.setData({
              bottom: res.screenHeight - res.safeArea.bottom
          })
      ]
    })
  },

    //从云端获取房间信息
    async getRooms(openId) {
      // console.log(openId)
      let nowDate = this.getNowDate();
      let tomorrow = nowDate + 86400000;
      let roomList = []
      db.collection("chatroom_group_llm").orderBy('time','asc').limit(13).where({
        members: _.all([openId]),
        // timeCount: _.gt(nowDate)
      })
      .get().then(res=>{
        roomList = res.data
        for(var i=0;i<roomList.length;i++){
          roomList[i]["showCancel"] = true
          // if(roomList[i].timeCount > tomorrow){
          //   roomList[i]["showCancel"] = true
          // }
        }
        this.setData({
          roomList:roomList
        })
      })
    },

    //获取预约条数
    getCount(openId){
      let nowDate = this.getNowDate();
      db.collection("chatroom_group_llm").where({
        members: _.all([openId]),
        timeCount: _.gt(nowDate)
      }).count().then(res=>{
        maxRoom = res.total
      })
    },
  
    getOpenID: async function() {
      if (this.openid) {
        this.getRooms(this.openid);
        this.getCount(this.openid);
        return this.openid
      }
  
      const { result } = await wx.cloud.callFunction({
        name: 'login',
      })
      // console.log(result.openid)
      this.getRooms(result.openid);
      this.getCount(result.openid);
      return result.openid
    },
  
    async try(fn, title) {
      try {
        await fn()
      } catch (e) {
        this.showError(title, e)
      }
    },
  
    async initOpenID() {
      return this.try(async () => {
        const openId = await this.getOpenID()
        // console.log(openId)
        this.setData({
          openId,
        })
      }, '初始化 openId 失败')
    },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.roomList.length<maxRoom){
      let oldData = this.data.roomList;
      wx.showLoading({
        title: '加载中',
      })
      let nowDate = this.getNowDate();
      db.collection("chatroom_group_llm").orderBy('timeCount','asc').skip(oldData.length).limit(8).where({
        members: _.all([this.data.openId]),
        timeCount: _.gt(nowDate)
      })
      .get().then(res=>{
        let newList = res.data;
        let newData = oldData.concat(newList);
        this.setData({
          roomList:newData
        })
      })
      wx.hideLoading();
    }else{
      wx.showToast({
        title: '到底了哦',
        icon: 'success',
        duration: 1000
      })
    }
  },

  //导航
  navTo(e){
    let groupId = e.currentTarget.dataset.groupid;
    wx.navigateTo({
      url: "/pages/index1/advice/room_llm/room_llm?groupId="+groupId
    })
  },

  getNowDate(){
    let timestamp = Date.parse(new Date());
    let nowTime = new Date(timestamp);
    let year = nowTime.getFullYear();
    let month = nowTime.getMonth();
    let date = nowTime.getDate();
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    let time = year + "/" + month + "/" + date;
    let nowDate = Date.parse(new Date(time));
    return nowDate;
  },

  // 取消预约
  cancel_advice(e){
    var that = this
    wx.showModal({
      title: '确认删除咨询？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#f58220',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          let groupId = e.currentTarget.dataset.groupid;
          let adviceId = e.currentTarget.dataset.adviceid;
          console.log("groupId:",groupId)
          db.collection('chatroom_group_llm').doc(groupId).remove().then(res=>{
            console.log("删除成功")
            that.getRooms(that.data.openId)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 创建新的心理咨询房间
  newRoom(){
    var that = this
    var timeNow = Date.now()
    var groupId = this.data.openId+timeNow;
    var members = [this.data.openId];
    db.collection("chatroom_group_llm").add({
      //要提交一下时间戳 格林威治时间
      //预约的时间 统一格式
      data: {
        // timeCount: exactTime,
        time: timeNow,
        groupId: groupId,
        members:members
      }
    }).then(res => {
      console.log("添加成功")
      that.getRooms(that.data.openId)
    })
  }

})