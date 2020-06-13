const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// const formateDate = date =>{
//   let year = date.getFullYear()
//   let month = date.getMonth() + 1
//   let day = date.getDate()
//   if(month < 10) month = '0'+month
//   if(day < 10) day = '0'+ay
//   return year + '-' + month + '-' + day
// }

function formateDate(addDay=0){
  let date = new Date
  date.setDate(date.getDate() + addDay)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  if(month < 10) month = '0'+month
  if(day < 10) day = '0'+ay
  return year + '-' + month + '-' + day
}
// 尝试封装函数
// const promisic = function (n) {
//   return function (t = {}) {
//       return new Promise((c, r) => {

//           const s = Object.assign(t, {
//               success: n => {
//                   c(n)
//               }, fail: n => {
//                   r(n)
//               }
//           });
//           n(s)
//       })
//   }
// }

module.exports = {
  formatTime: formatTime,
  formateDate:formateDate
}
