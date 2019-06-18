
allPage("/v2/sales/order/list/number");

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
              tr += `<td>${time}&nbsp<span style="font-size:12px">录入</span>
              </td>`
              tr += `<td>${ele.order_name}</td>`
              tr += `<td>${ele.client}</td>`
              tr += `<td>${Scc[17]}</td>`
              tr += `<td>${ele.bill_id}</td>`
              tr += `<td>${ele.price}</td>`
              tr += `<td>${ele.price}${currency}</td>`
              tr += `<td>${ele.price}${currency}</td>`
              tr += `<td>${Acc[ele.account]}</td>`
              tr += `<td class = "susasd">
             <span>修改</span></td></tr>`
              $("#uesesulle").html(tr);
            })
          }

        },
      })
      // 更改状态

    }
  });
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
      }
    } else {
      data = {
        client: $('#incal_cjy').val(),

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

          }
        } else {
          data = {
            client: $('#incal_cjy').val(),

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
                tr += `<td>${time}&nbsp<span style="font-size:12px">录入</span>
              </td>`
                tr += `<td>${ele.order_name}</td>`
                tr += `<td>${ele.client}</td>`
                tr += `<td>${Scc[17]}</td>`
                tr += `<td>${ele.bill_id}</td>`
                tr += `<td>${ele.price}</td>`
                tr += `<td>${ele.price}${currency}</td>`
                tr += `<td>${ele.price}${currency}</td>`
                tr += `<td>${Acc[ele.account]}</td>`
                tr += `<td class = "susasd">
             <span>修改</span></td></tr>`
                $("#uesesulle").html(tr);
              })
            }
            // 更改状态


          },
        })

      }

    });
  } else {
    $("#uesesulle").html("查询无此订单");
  }
}












