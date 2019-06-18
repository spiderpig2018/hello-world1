

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
            // console.log(ele) 
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
                var salesid = ele.sales_order_id;
                var str = price;
                $('#set').html(str)
                page(salesid,price)
              // console.log("供应订单编号：" + salesid, price)
            }
          })
        }
      }
    })
  }
}



// 分页
function page(salesid,price) {
  // console.log(salesid,price)
  $.jqPaginator('#pagination2', {
    totalPages:5,
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
        url: AllUrl + '/v2/sales/order/list/' + num,
        async: false, //同步方式发送请求，true为异步发送
        type: "GET",
        headers: {
          'authorization': Token
        },
        // data:{
        //   bill_order_id:salesid
        // },
        dataType: "json",
        success: function (data) {
          var dataList = data.Data;
          localCompany("G_");
        
          if (dataList.length > 0) {
            var tr = []
            dataList.forEach(function (ele, index) {
              if (ele.finance == 0) {
                var finance = `<span class = "susasd" onclick="fnindcj.onOk()"> 待核计</span>`;
              }
              if (ele.finance == 1) {
                var finance = '<span class="susasdhied"><i class="glyphicon glyphicon-ok"></i></span>';

              }
              var time = getdate(ele.create_time);

              if (ele.currency == 1) {
                currency = 'CNY'
              }
              if (ele.currency == 2) {
                currency = 'HDK';
              }
              if(ele.id == salesid){
                console.log(123)
                // ele.price = price;
              }
              localAde("A_");
              localCompany("S_");
              tr += `<tr><td>${ele.id}</td>`
              tr += `<td>${time}&nbsp<span style="font-size:12px">录入</span></td>`
              tr += `<td>${ele.order_name}</td>`
              tr += `<td>${ele.client}</td>`
              tr += `<td>${Scc[17]}</td>`
              tr += `<td>${ele.bill_id}</td>`
              tr += `<td>${ele.price}</td>`
              tr += `<td>${ele.price}${currency}</td>`
              tr += `<td>${ele.price}${currency}</td>`
              tr += `<td>${Acc[ele.account]}</td>`
              tr += `<td>${finance}</td></tr>`
              $("#uesesulle").html(tr);

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