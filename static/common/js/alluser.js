var uesrname;
var bankStatusId;
function yz() {
    var number = $("#number").val();
    var phone = $("#phone").val();
    var psd = $("#psd").val();
    if (number == "") {
        alert("请填写所有的空格！");
        return false;
    }

    if (isPoneAvailable(phone) == false) {
        alert("请填写正确手机号！");
        return;
    }
    if (psd == "" || psd.length < 6) {
        alert("密码长度不能小于6位！");
        return false;
    }

}
function adduser() {
    var isfals = yz();
    if (isfals != false) {
        $.ajax({
            type: "POST",
            url: AllUrl + '/v2/account/insert/account',
            headers: {
                'authorization': Token
            },
            data: {
                classId: jQuery("#accountNumber  option:selected").val(),
                name: jQuery("#name").val(),
                number: $("#number").val(),
                phone: $("#phone").val(),
                position: jQuery("#Title  option:selected").val(),
                psd: $("#psd").val(),
                remarks: 1,
            },
            dataType: "json",
            success: function (data) {
                if (data) {
                    console.log(data)
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
}

//检验手机号码
function isPoneAvailable(str) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
        // alert('请填写正确手机号')
        return false;
    } else {
        return true;
    }
}
//全部用户
(function () {
    function allUsers() {
        var Token = localStorage.getItem("Token");
        $.ajax({
            url: AllUrl + '/v2/account/list/number',
            async: false, //同步方式发送请求，true为异步发送
            type: "GET",
            headers: {
                'authorization': Token
            },
            dataType: "json",
            success: function (data) {
                var dataList = data.Data;
                page(dataList);
            }
        });

    }
    allUsers();
}())

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
$("table tr").click(function () {
    var td = $(this).find("td");
    bankStatusId = td[0].innerText;
    uesrname = td[2].innerText;
    fnindcj.fnined(bankStatusId, uesrname)
})

var fnindcj = {
    fnined: function (bankStatusId, uesrname) {
        var asa = bankStatusId
        // console.log(bankStatusId)
        $("#strid").html(uesrname)
        return asa;
    },
    onOk: function () {
        // console.log(000)
        fnindcj.fnined(bankStatusId);
        console.log(bankStatusId)
        $.ajax({
            type: 'POST',
            url: AllUrl + "/v2/account/update/status",
            headers: {
                'authorization': localStorage.getItem("Token")
            },
            data: {
                Id: bankStatusId,
                Status: jQuery("#sukes option:selected").val()
            },
            dataType: "json",
            success: function (data) {
                if (data) {
                    console.log(data)
                    window.location.href = "alluser.html";
                } else {
                    alert("失败");
                }
            },
            error: function (data) {
                alert("失败");
            }
        });
    }
}
