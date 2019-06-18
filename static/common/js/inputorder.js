
var bankTop = localStorage.getItem("Token");
var SalesIdMe = null;
function addinput() {
  var isNull = ifNull()
  if (isNull == true) {
    $.ajax({
      type: 'POST',
      url: AllUrl + "/v2/sales/order/insert",
      headers: {
        'authorization': localStorage.getItem("Token")
      },
      data: {
        account: $("#account_  option:selected").val(), //接单员
        adult_num: $("#adult_num").val(), //成人
        bill_order_id: $("#bill_order_id").val(), //销售单号
        check_in: $("#check_in").val(),
        check_out: $("#check_out").val(),
        children: $("#children").val(),
        class_id: 8,
        client: $("#client").val(), //客户名
        description: $("#description").val(),
        order_name: $("#order_name").val(), //订单名
        platform: $("#suulp  option:selected").val(),
        platform_num: 1,
        price: $("#price").val(),
        remarks: 2,
        sales_currency: $("#Currency").val(), //货币
        sales_rate: $("#Rate").val(), //汇率 
        type: $("#type-hidden").val(),
      },
      dataType: "json",
      success: function (data) {
        if (data) {
          console.log(data);
          // numBaer(data);
          addSuppl.sullSupplone(data);
          SalesIdMe = data.Message
          // window.location.href = "alluser.html";
        } else {
          alert("失败");
        }
      },
      error: function (data) {
        alert("添加失败");
      }
    });
  }

}

function addSupplyorder() {
  $.ajax({
    type: 'POST',
    url: AllUrl + "/v2/supplier/order/insert",
    headers: {
      'authorization': localStorage.getItem("Token")
    },
    data: {
      Currency: $("#Currency").val(),
      End: $("#End").val(),
      Oprator: $("#account_  option:selected").val(),
      OpratorRate: 1,
      PName: $("#order_name").val(),
      Price: $("#Price").val(),
      Remark: $("#description").val(),
      Rate: $("#Rate").val(),
      Start: $("#Start").val(),
      Supplier: $("#Supplier").val(),
      SupplierId: $("#SupplierId").val(),
      SalesId: SalesIdMe,
      Type: $("#type-hidden").val(),

    },
    dataType: "json",
    success: function (data) {
      if (data) {
        console.log(data)
        alert("添加成功");
        // window.location.href = "alluser.html";
      } else {
        alert("失败");
      }
    },
    error: function (data) {
      alert("供应订单号重复，请重新填写");
    }
  });
}

function ifNull() {

  if ($("#account").val() == "") {
    alert('请把订单号填写完整');
    return false;
  }
  if ($("#adult_num").val() == "") {
    alert('人数不能为空');
    return false;
  }
  if ($("#bill_order_id").val() == "") {
    alert('接单员不能为空');
    return false;
  }
  if ($("#instre").val() == "") {
    alert('入住时间不能为空');
    return false;
  }
  if ($("#instreout").val() == "") {
    alert('离店时间不能为空');
    return false;
  }
  if ($("#class_id").val() == "") {
    alert('公司不能为空');
    return false;
  }
  if ($("#account").val() == "") {
    alert('单号为空不能');
    return false;
  }
  if ($("#client").val() == "") {
    alert('客人姓名不能为空');
    return false;
  }
  if ($("#description").val() == "") {
    alert('备注不能为空');
    return false;
  }
  if ($("#order_name").val() == "") {
    alert('订单名称不能为空');
    return false;
  }
  if ($("#sales_currency").val() == "") {
    alert('货币不能为空');
    return false;
  }
  if ($("#Ussales_rateer").val() == "") {
    alert('汇率不能为空');
    return false;
  } else {
    return true;
  }

}


var addSuppl = {
  addSupplone: function (data) {
    // numBaer();
    var Currency = $("#Currency").val(),
      End = $("#End").val(),
      Oprator = 1,
      OpratorRate = 1,
      PName = $("#order_name").val(),
      Price = $("#Price").val(),
      Remark = $("#Remark").val(),
      Start = $("#Start").val(),
      Supplier = $("#Supplier").val(),
      SupplierId = $("#SupplierId").val(),
      Type = $("#type-hidden").val();
    if (Currency == 1) {
      Currency = "CNY"
    }
    if (Currency == 2) {
      Currency = "HKD"
    }
    localSupply("S_")
    var tr = [];

    tr += `<tr> <td>${SalesIdMe}</td>`
    tr += `<td>${SupplierId}</td>`
    tr += `<td>${PName}</td>`
    tr += `<td>${Start}${End}</td>`
    tr += `<td>${Cmp[Supplier]}</td>`
    tr += `<td>${Price}</td>`
    tr += `<td>${Price}${Currency}</td>`
    tr += `<td>${Currency}</td>`
    tr += `<td>${Config.SullType[Type]}</td>`
    tr += `<td><button onclick="addSupplyorder()">确认</button><button onclick="addSuppl.removaupplone()">删除</button></td></tr>`


    $("#testad").html(tr);
  },
  removaupplone: function () {
    $("#testad").html("")
  },

  sullSupplone: function (data) {
    var Currency = $("#Currency").val(),
      bill_order_id = $("#bill_order_id").val(), //销售单号
      check_in = $("#check_in").val(),
      check_out = $("#check_out").val(),
      description = $("#description").val(),
      order_name = $("#order_name").val(), //订单名
      platform = $("#suulp").val(),
      price = $("#price").val(),
      type = $("#type-hidden").val();

    if (Currency == 1) {
      Currency = "CNY"
    }
    if (Currency == 2) {
      Currency = "HKD"
    }
    localSupply("S_")
    var tr = [];
    tr += `<tr><td>${data.Message}</td>`
    tr += `<td>${bill_order_id}</td>`
    tr += `<td>${order_name}</td>`
    tr += `<td>${check_in}${check_out}</td>`
    tr += `<td>${Cmp[platform]}</td>`
    tr += `<td>${price}${Currency}</td>`
    tr += `<td>${price}</td>`
    tr += `<td>${Currency}</td>`
    tr += `<td>${Config.SullType[type]}</td>`
    tr += `<td><button type="button" class="btn btn-hover btn-dark btn-block" data-toggle="modal" data-target="#myModal">添加供应单</button></td> </tr>`

    $("#suultestad").html(tr);
  },
  // removaupplone: function () {
  //   $("#suultestad").removeChild("tr")
  // }

}

function isSen() {
  if (confirm("确认录入吗？")) {
    addinput();

  } else {
    return false;
  }
}


