var AllUrl = "http://192.168.0.107:8080";

var Config = {

  "accountType": {
    0: "未激活",
    1: "正常使用",
    2: "停用",
    3: "离职",
  },
  "SullType": {
    0: "酒店",
    1: "交通",
    2: "票务",
    3: "其他",
  },
  "Statusd": {
    0: "已录入",
    1: '审核通过',
    2: '核计完成',
    3: '收/付款中',
    4: '已完成',
    5: '订单取消',
    6: '修改中',
    7: '取消中',
    8: '收/付款中(未处理)',
  },
  "payment": {
    0: "银联收款",
    1: '后台直收',
    2: '公账收款',
    3: '其他收款方式',
  },
  "paymentMethod": {
    0: "信用卡还款",
    1: '授信付款',
    2: '月结付款',
    3: '半月结付款',
  },
  "BillClass": {
    0: "销售单",
    1: '供应单',
    2: '总账单',
  },
  "operationType": {
    0: "查看",
    1: '录入',
    2: '提交',
    3: '审核',
    4: '核计',
    5: '生成',
  },
  "checkType": {
    0: "月结",
    1: '日结',
    2: '提半月结交',
    3: '实时',
    4: '授信额度',
  },
  "SupplierType": {
    0: "供应商",
    1: '销售商',
  },
  "ModifyType": {
    0: "销售单",
    1: '供应单',
  },
  "billingState": {
    0: "待审核",
    1: '已生成',
    2: '收/付款中',
    3: '收/付款中(未处理)',
    4: '账单已结清',
  },
  "statusType": {
    0: "待确认",
    1: '已完成',
    2: '已取消',
  }
}

//调用ajax
var Token = localStorage.getItem("Token");
function AjaxRequest(type, url, data, Jump) {
  $.ajax({
    type: type,
    url: AllUrl + url,
    headers: {
      'authorization': Token
    },
    data: {data},
    dataType: "json",
    success: function (data) {
      if (data) {
        alert("添加成功");
        // window.location.href = Jump + ".html";
      } else {
        alert("失败");
      }
    },
    error: function (data) {
      alert("添加失败");
    }
  });
}

//时间戳转换
function getdate(time) {
  var now = new Date(parseInt(time)),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate();
  return y + "/" + (m < 10 ? "0" + m : m) + "/" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
}

//page
function allPage(url) {
  $.ajax({
    url: AllUrl + url,
    type: "GET",
    dataType: "json",
    headers: {
      'authorization': Token
    },
    success: function (data) {
      if (data) {
        page(data);
      } else {
        alert('失败');
      }
    },
    error: function (data) {
      alert('操作失败');
    }
  })
}


var Acc = {}, Scc = {}, Cmp = {}, Bck = {};
function localAde(srt) {
  for (var i = 0; i <= localStorage.length - 1; i++) {
    if (localStorage.key(i).substring(2, 0) == srt) {
      Acc[localStorage.key(i).substring(2)] = localStorage.getItem(localStorage.key(i))
    }
  }
}
function localCompany(srt) {
  for (var i = 0; i <= localStorage.length - 1; i++) {
    if (localStorage.key(i).substring(2, 0) == srt) {
      Scc[localStorage.key(i).substring(2)] = localStorage.getItem(localStorage.key(i))
    }
  }
}
function localBack(srt) {
  for (var i = 0; i <= localStorage.length - 1; i++) {
    if (localStorage.key(i).substring(2, 0) == srt) {
      Bck[localStorage.key(i).substring(2)] = localStorage.getItem(localStorage.key(i))
    }
  }
}
function localSupply(srt) {
  for (var i = 0; i <= localStorage.length - 1; i++) {
    if (localStorage.key(i).substring(2, 0) == srt) {
      Cmp[localStorage.key(i).substring(2)] = localStorage.getItem(localStorage.key(i))
    }
  }
}

//下拉框
$('input[list]').on('input', function (e) {
  var $input = $(e.target),
    $options = $('#' + $input.attr('list') + ' option'),
    $hiddenInput = $('#' + $input.attr('id') + '-hidden'),
    label = $input.val();
  $hiddenInput.val(label);
  for (var i = 0; i < $options.length; i++) {
    var $option = $options.eq(i);
    if ($option.text() === label) {
      $hiddenInput.val($option.attr('data-value'));
      break;
    }
  }
});

//查询条件
function CjyInquire(url, data) {
  $.ajax({
    url: AllUrl + url,
    type: "GET",
    dataType: "json",
    headers: {
      'authorization': Token
    },
    data:data,
    success: function (data) {
      if (data.length != 0) {
        cjYpage(data)
      } else {
        alert('查询信息不存在');
      }
    },
    error: function (data) {
      alert('查询失败');
    }
  })
}
