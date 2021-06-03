// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var dbName = event.dbName       //  数据库名称
  var limCount = event.limCount   //  想要拉回的数量
  var theKey = event.theKey       //  条件关键字
  var theValue = event.theValue   //  条件值
  var order = event.order         //  排序依据
  var length = event.length       //  树洞列表的长度
  return await db.collection(dbName).where({theKey:theValue}).skip(length).orderBy(order, 'desc').limit(limCount).get()
}