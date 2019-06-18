
//全局的JS

function initCjy() {
  downloadStorage();

}
initCjy();
//缓存本地localStorage
function downloadStorage() {
  //全部用户ID name
  $.ajax({
    url: AllUrl + '/v2/account/all',
    async: false,//同步方式发送请求，true为异步发送
    type: "GET",
    headers: {
      'authorization': Token
    },
    dataType: "json",
    success: function (data) {
      $.each(data.Data, (key, value) => {
        localStorage.setItem("A_" + value.id, value.name);
      })
    }
  })
  //全部银行卡ID name
  $.ajax({
    url: AllUrl + '/v2/card/all',
    async: false,//同步方式发送请求，true为异步发送
    type: "GET",
    headers: {
      'authorization': Token
    },
    dataType: "json",
    success: function (data) {
      // console.log(data)
      $.each(data.Data, (key, value) => {
          localStorage.setItem("C_" + value.id, value.name + " - 尾号" + value.number.substring(value.number.length - 4));
      })
    }
  })
  //所有公司
  $.ajax({
    url: AllUrl + '/v2/class/all',
    async: false,//同步方式发送请求，true为异步发送
    type: "GET",
    headers: {
      'authorization': Token
    },
    dataType: "json",
    success: function (data) {
      $.each(data.Data, (key, value) => {
        localStorage.setItem("G_" + value.id, value.name);
      })
    }
  })
  //所有供应商
  $.ajax({
    url: AllUrl + '/v2/supplier/all',
    async: false,//同步方式发送请求，true为异步发送
    type: "GET",
    headers: {
      'authorization': Token
    },
    dataType: "json",
    success: function (data) {
      $.each(data.Data, (key, value) => {
        localStorage.setItem("S_" + value.id, value.name);
      })
    }
  })
  //所有销售商
  $.ajax({
    url: AllUrl + '/v2/sales/all',
    async: false,//同步方式发送请求，true为异步发送
    type: "GET",
    headers: {
      'authorization': Token
    },
    dataType: "json",
    success: function (data) {
      $.each(data.Data, (key, value) => {
        localStorage.setItem("P_" + value.id, value.name);
      })
    }
  })
}

//用户管理
var userControl={
  
}

//公司管理
