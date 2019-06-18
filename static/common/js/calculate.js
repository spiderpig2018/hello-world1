
allPage("/v2/sales/order/list/number");


var bankStatusId = "";
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
          // 更改状态
          $("table tr").click(function () {
            var td = $(this).find("td");
            var lo_id = td[0].innerText;
            // calculate(lo_id)
            bankStatusId = lo_id
            fnindcj.fnined(bankStatusId);
          })
        },
      })

    }
  });
}

// var srt = "确认核计  " + bankStatusId + " 订单吗";
// $("#tass").html(srt);
var fnindcj = {
  fnined: function (bankStatusId) {
    var asa = bankStatusId
    return asa;
  },
  onOk: function () {
    fnindcj.fnined(bankStatusId);
    console.log(bankStatusId)
    $.ajax({
      type: 'POST',
      url: AllUrl + "/v2/sales/order/Accounting/" + bankStatusId,
      headers: {
        'authorization': localStorage.getItem("Token")
      },
      data: {
        Id: bankStatusId
      },
      dataType: "json",
      success: function (data) {
        if (data) {
          console.log(data)
          alert(bankStatusId + "核计成功");
          // window.location.href = "alluser.html";
        } else {
          alert("失败");
        }
      },
      error: function (data) {
        alert("先点击行再点击审核");
      }
    });

  }
}








