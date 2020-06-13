const host = "https://yanxue.qiweibang.com/web/index.php?r=api/"

function get(url,data){
    return new Promise((resolve,reject)=>{
        if(!url)return
        wx.request({
          url: host+url,
          method:'GET',
          data:data,
          success:function(res){
              res.statusCode == 200?resolve(res.data):reject(res.data)
          },
          fail(err){
              reject(err)
          }
        })
    })
}

function post(url,data){
    return new Promise((resolve,reject)=>{
        if(!url)return
        wx.request({
          url: host+url,
          method:'POST',
          data:data,
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success:function(res){
              res.statusCode == 200?resolve(res.data):reject(res.data)
          },
          fail(err){
              reject(err)
          }
        })
    })
}

module.exports={
    get,
    post
}