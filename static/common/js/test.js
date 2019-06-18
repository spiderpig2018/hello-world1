

function qusall() {//销售订单数量
  $.ajax({
    url: AllUrl + "/v2/sales/order/list/number",
    type: "GET",
    dataType: "json",
    headers: {
      'authorization': Token
    },
    success: function (data) {
      if (data) {
        var dataList = data.Data;
        var datasum = Math.ceil(dataList / 10)      
        allpd(datasum)
      } else {
        alert('失败');
      }
    },
    error: function (data) {
      alert('操作失败');
    }
  })
}

function allpd(datasum) {////销售订单列表数量

  var sum = 0
  for (var i = 0; i < datasum; i++) {
    sum++;
    $.ajax({
      url: AllUrl + "/v2/sales/order/list/" + sum,
      type: "GET",
      dataType: "json",
      headers: {
        'authorization': Token
      },
      success: function (data) {
        if (data) {
          var assd = data.Data
          $.each(assd, (index, ele) => {
            var inquiresuppid = ele.id;
            var pricesuppid = ele.price
            inquiresupp(inquiresuppid, pricesuppid);
            console.log(ele) 
          })
        }
      },
      error: function (data) {
        alert('操作失败');
      }
    })
  }
}

function inquiresupp(inquiresuppid, pricesuppid) {//供应订单数量
  $.ajax({
    url: AllUrl + "/v2/supplier/order/list/number",
    type: "GET",
    dataType: "json",
    headers: {
      'authorization': Token
    },
    data: {
      SalesId: inquiresuppid
    },
    success: function (data) {
      if (data) {
        var dataList = data.Data;
        var datasum = Math.ceil(dataList / 10)
        allpd(datasum)
      }
      if (data.Data != 0) {
        var dataList = data.Data;
        var datasum = Math.ceil(dataList / 10)
        inquiresum(datasum, inquiresuppid, pricesuppid);
        // console.log(data)
      }
    },
    error: function (data) {
      alert('操作失败');
    }
  })
}


function inquiresum(datasum, inquiresuppid, pricesuppid) {
  var sum = 0
  for (var i = 0; i < datasum; i++) {//供应订单列表
    sum++;
    $.ajax({
      url: AllUrl + "/v2/supplier/order/list/" + sum,
      type: "GET",
      dataType: "json",
      headers: {
        'authorization': Token
      },
      data: { SalesId: inquiresuppid },
      success: function (data) {
        if (data) {
          var assd = data.Data
          var arrstrs = new Array();
          arrstrs.push(assd);
          var arrstrsd = arrstrs.map(function (index, ele) {
            return index[ele]
          })
          $.each(arrstrsd, (index, ele) => {

            if (ele.sales_order_id = inquiresuppid) {
              var price = pricesuppid - (ele.cost_price);
              var salesid = ele.sales_order_id
              // console.log("供应订单编号：" + salesid, price)
              // console.log(sum)

              // page(salesid,price)
            }
          })
        }
      }
    })
  }
}



// 分页
function page(dataList) {
  $.jqPaginator('#pagination2', {
    totalPages: Math.ceil(dataList / 10),
    visiblePages: 10,
    currentPage: 1,
    first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
    prev: '<li class="prev"><a href="javascript:;">前一页</a></li>',
    next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',
    last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
    page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
    onPageChange: function (num, type) {
      var Token = localStorage.getItem("Token");
      $('#p2').text(type + '：' + num);
      $.ajax({
        url: AllUrl + '/v2/account/list/' + num,
        async: false, //同步方式发送请求，true为异步发送
        type: "GET",
        headers: {
          'authorization': Token
        },
        dataType: "json",
        success: function (data) {
          var dataList = data.Data;
          localCompany("G_");
          if (dataList.length > 0) {
            var tr = [];
            dataList.forEach(function (ele, index) {
              tr += `<tr><td>${ele.id}</td>`
              tr += `<td>${Scc[ele.class_id]}</td>`
              tr += `<td>${ele.name}</td>`
              tr += `<td>${ele.number}</td>`
              tr += `<td>${ele.phone}</td>`
              tr += `<td>${position[ele.position]}</td>`
              tr += `<td><span class = "susasd" data-toggle="modal" data-target="#myModal1" onclick="fnindcj.fnined(uesrname)" >${Config.accountType[ele.status]}</span></td></tr>`
              $("#tdbox").html(tr);
            })
          }
        },
      })
    }
  });

}




window.onload = function () {
  qusall();

}