
var bankStatusId = "";

$.ajax({
  url: AllUrl + "/v2/sales/order/list/number",
  async: false,//同步方式发送请求，true为异步发送
  type: "GET",
  headers: {
    'authorization': Token
  },
  data: {
    finance_status: "1"
  },
  dataType: "json",
  success: function (data) {
    page(data)
  }
})



function page(data) {
  var dataList = data.Data;
  $.jqPaginator('#pagination2', {
    totalPages: Math.ceil(dataList / 10),
    visiblePages: 10,
    currentPage: 1,
    first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
    prev: '<li class="prev"><a href="javascript:;">前一页</a></li>',
    next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',
    last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
    page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
    onPageChange: function (num, ) {
      $.ajax({
        url: AllUrl + "/v2/sales/order/list/" + num,
        async: false,//同步方式发送请求，true为异步发送
        type: "GET",
        headers: {
          'authorization': Token
        },
        data: {
          finance_status: "1"
        },
        dataType: "json",
        success: function (data) {
          var dataList = data.Data;
          var cian = [];
          var Status, Type;
          var tr = [];

          if (dataList.length > 0) {
            dataList.forEach(function (ele, index) {
              var time = getdate(ele.create_time);

              if (ele.currency == 1) {
                currency = 'CNY'
              }
              if (ele.currency == 2) {
                currency = 'HDK';
              }
              localAde("A_");
              localCompany("S_");
              tr += `<tr><td>${ele.id}</td>`
              tr += `<td>${time}&nbsp<span style="font-size:12px">录入</span></td>`
              tr += `<td>${Scc[17]}</td>`
              tr += `<td>${ele.bill_id}</td>`
              tr += `<td>${ele.price}&nbsp${currency}</td>`
              tr += `<td>${ele.price}&nbsp${currency}</td>`
              tr += `<td>${ele.price}</td>`
              tr += `<td>${Config.SullType[ele.type]}</td>`
              tr += `<td>${Acc[ele.account]}</td>`
              tr += `<td><span class = "susasd" class="btn btn-hover btn-dark btn-block" data-toggle="modal" data-target="#myModal">
               生成账单</span> </td> </tr>` 
              //  <span class="susasd" class="btn btn-hover btn-dark btn-block" data-toggle="modal" data-target="#myModal1">付款</span>
              // 

              $("#uesesulle").html(tr);

            })
          }
          // 更改状态
          $("table tr").click(function () {
            var td = $(this).find("td");
            bankStatusId = td[0].innerText;
            fnindcj.fnined(bankStatusId);
            fnindcj.payMent();
          })
        },
      })
    }
  })
}


var fnindcj = {
  fnined: function (bankStatusId) {
    var asa = bankStatusId
    $("#str").html(asa);
    $("#adk").html(asa);
    return asa;
  },
  gatheRing: function () {
    fnindcj.fnined(bankStatusId);
    console.log(bankStatusId)

    $.ajax({
      type: 'POST',
      url: AllUrl + "/v2/bill/sales/insert",
      headers: {
        'authorization': localStorage.getItem("Token")
      },
      data: {
        name:$("#myname").val(),
        remark:$("#Remarks").val(),
      },
      dataType: "json",
      success: function (data) {
        if (data) {
          console.log(data)
          alert(bankStatusId + "创建账单成功");
          // window.location.href = "alluser.html";
        } else {
          alert("失败");
        }
      },
      error: function (data) {
        alert(bankStatusId + "创建账单失败");
      }
    });

  },
  payMent: function () {
    fnindcj.fnined(bankStatusId);
    console.log(bankStatusId)
    $.ajax({
      url: AllUrl + "/v2/supplier/order/list/number",
      async: false,//同步方式发送请求，true为异步发送
      type: "GET",
      headers: {
        'authorization': Token
      },
      data: {
        SalesId: bankStatusId
      },
      dataType: "json",
      success: function (data) {
        var last = data.Data;
        payMentAs(last)
      }
    })


  }

}
//订单号对应的供应单
function payMentAs(last) {
  var tr = [];
  $.ajax({
    url: AllUrl + "/v2/supplier/order/list/1",
    async: false,//同步方式发送请求，true为异步发送
    type: "GET",
    headers: {
      'authorization': Token
    },
    data: {
      SalesId: bankStatusId
    },
    dataType: "json",
    success: function (data) {
      lister = data.Data;
      localCompany("S_");
      if (lister.length) {
        lister.forEach((ele, index) => {
          console.log(ele)
          if (ele.cost_currency == 1) {
            cost_currency = 'CNY'
          }
          if (ele.cost_currency == 2) {
            cost_currency = 'HDK'
          }
          tr += `<tr><td>${Config.SullType[ele.supplier_type]}</td>`
          tr += `<td>${Scc[ele.supplier]}</td>`
          tr += `<td>${ele.product_name}</td>`
          tr += `<td>${ele.cost_price}&nbsp${cost_currency}</td>`
          tr += `<td class="incytype"><input type="text" placeholder="0.00"></td>`
          tr += `<td>${cost_currency}</td>`
          tr += `<td><span class="susasd">付款</span></td>`
          tr += `</tr>`

          $("#insd").html(tr)



        })
      }

    }
  })
}

//查询
var oncjy = document.getElementById('oncjy');
oncjy.onclick = function () {
  if ($('#incal_cjy').val() != "") {
    console.log(001)
    var isNumber = /^\d+$/.test($('#incal_cjy').val());
    var data;
    if (isNumber) {
      data = {
        bill_order_id: $('#incal_cjy').val(),
        finance_status: 1
      }
    } else {
      data = {
        client: $('#incal_cjy').val(),
        finance_status: 1
      }
    }
    CjyInquire("/v2/sales/order/list/number", data);
  } else {
    alert('请输入查询条件')
  }
}

function cjYpage(data) {
  if (data.Data != 0) {
    var dataList = data.Data;
    $.jqPaginator('#pagination2', {
      totalPages: Math.ceil(dataList / 10),
      visiblePages: 10,
      currentPage: 1,
      first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
      prev: '<li class="prev"><a href="javascript:;">前一页</a></li>',
      next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',
      last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
      page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
      onPageChange: function (num, ) {
        var isNumber = /^\d+$/.test($('#incal_cjy').val());
        var data;
        if (isNumber) {
          data = {
            bill_order_id: $('#incal_cjy').val(),
            finance_status: 1
          }
        } else {
          data = {
            client: $('#incal_cjy').val(),
            finance_status: 1
          }

        }
        $.ajax({
          url: AllUrl + "/v2/sales/order/list/" + num,
          async: false,//同步方式发送请求，true为异步发送
          type: "GET",
          headers: {
            'authorization': Token
          },
          data: data,
          dataType: "json",
          success: function (data) {
            var tr = [];
            var dataList = data.Data
            if (dataList.length > 0) {
              dataList.forEach(function (ele, index) {
                console.log(ele)
                var time = getdate(ele.create_time);
                if (ele.currency == 1) {
                  currency = 'CNY'
                }
                if (ele.currency == 2) {
                  currency = 'HDK';
                }
                localAde("A_");
                localCompany("S_");
                tr += `<tr><td>${ele.id}</td>`
                tr += `<td>${time}&nbsp<span style="font-size:12px">录入</span></td>`
                tr += `<td>${Scc[ele.platform]}</td>`

                tr += `<td>${ele.bill_id}</td>`
                tr += `<td>${ele.price}</td>`
                tr += `<td>${ele.price}${currency}</td>`
                tr += `<td>${ele.price}${currency}</td>`
                tr += `<td>${Config.SullType[ele.type]}</td>`
                tr += `<td>${Acc[ele.account]}</td>`
                tr += `<td><span class = "susasd" class="btn btn-hover btn-dark btn-block" data-toggle="modal" data-target="#myModal">
               收款
               </span><span class="susasd" class="btn btn-hover btn-dark btn-block" data-toggle="modal" data-target="#myModal1">付款</span>
              </td></tr>`
                $("#uesesulle").html(tr);
              })
            }
            // 更改状态
            $("table tr").click(function () {
              var td = $(this).find("td");
              var lo_id = td[0].innerText;

              bankStatusId = lo_id
              console.log(bankStatusId)
              fnindcj.fnined(bankStatusId);
            })

          },
        })

      }

    });
  } else {
    $("#uesesulle").html("查询无此订单");
  }
}












