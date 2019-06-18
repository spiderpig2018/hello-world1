
allPage("/v2/currency/all")
// 分页
function page(data) {
    var dataList = data.Data;
    $.jqPaginator('#pagination2', {
        totalPages: Math.ceil(dataList.length / 10),
        visiblePages: 10,
        currentPage: 1,
        first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
        prev: '<li class="prev"><a href="javascript:;">前一页</a></li>',
        next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',
        last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        onPageChange: function (num, type) {
            var bankTop = localStorage.getItem("Token");
            $.ajax({
                url: AllUrl + '/v2/currency/list/' + num,
                async: false,//同步方式发送请求，true为异步发送
                type: "GET",
                headers: {
                    'authorization': bankTop
                },
                dataType: "json",
                success: function (data) {
                    var dataList = data.Data;
                    var td = [];
                    var Status, Type;
                    if (dataList.length > 0) {
                        dataList.forEach(function (ele, index) {
                            if (ele.status == 1) {
                                Status = '正常'
                            }
                            if (ele.status == 2) {
                                Status = '停用';
                            }
                            if (ele.currency == 1) {
                                Type = '人民币'
                            }
                            if (ele.currency == 2) {
                                Type = '港币';
                            }
                            localCompany("S_")
                            td += '<tr ><td data-th="Age"><span class="bt-content">' + ele.id + '</span></td>'
                            td += '<td data-th="Age"><span class="bt-content">' + Scc[ele.class] + '</span></td>'
                            td += '<td data-th="Age"><span class="bt-content">' + Type + '</span></td>'
                            td += '<td data-th="Age"><span class="bt-content" id="Name">' + ele.end + '</span></td>'
                            td += '<td data-th="Gender"><span class="bt-content" id="Number">' + ele.rate + '</span></td>'
                            td += '<td data-th="Gender"><span class="bt-content" id="Phone">' + ele.start + '</span></td>'
                            td += '<td data-th="Gender"><span class="bt-content"><button  data-toggle="modal" data-target="#myModal1">' + Status + '</button></span></span></td></tr>'
                            $("#all_bank").html(td);
                        })
                    }

                    // $("table tr").click(function () {
                    //     var td = $(this).find("td");
                    //     var lo_id = td[0].innerText;
                    //     //更改状态             
                    //     bankStatusId = lo_id;
                    // })
                },
            })
        }
    });
}


//添加货币
function addCny() {
    if (isNotANumber($("#currRate").val()) == true) {
        $.ajax({
            type: 'POST',
            url: AllUrl + "/v2/currency/insert",
            headers: {
                'authorization': localStorage.getItem("Token")
            },
            data: {
                ClassId: $("#bankId").val(),
                Currency: jQuery("#currency  option:selected").val(),
                End: $("#currnumber").val(),
                Rate: $("#currRate").val(),
                Start: $("#currStart").val(),
                Status: jQuery("#Status  option:selected").val(),
            },
            dataType: "json",
            success: function (data) {
                if (data) {
                    alert("添加成功");
                    // window.location.href = "alluser.html";
                } else {
                    alert("失败");
                }
            },
            error: function (data) {
                alert("添加失败");
            }
        });
    } else {
        alert("请输入正确数值");
        return false;
    }


}


//更改状态
function qureds() {
    $.ajax({
        type: 'POST',
        url: AllUrl + "/v2/card/changes",
        headers: {
            'authorization': localStorage.getItem("Token")
        },
        data: {
            Id: bankStatusId,
            status: jQuery("#Status  option:selected").val()
        },
        dataType: "json",
        success: function (data) {
            if (data) {
                console.log(data)
                alert("修改成功");
                window.location.href = "currency.html";
            } else {
                alert("修改失败");
            }
        },
        error: function (data) {
            alert("修改失败");
        }
    });
}

function isNotANumber(inputData) {
    //isNaN(inputData)不能判断空串或一个空格
    //如果是一个空串或是一个空格，而isNaN是做为数字0进行处理的，而parseInt与parseFloat是返回一个错误消息，这个isNaN检查不严密而导致的。
    if (parseFloat(inputData).toString() == "NaN") {
        //alert("请输入数字……");注掉，放到调用时，由调用者弹出提示。
        return false;
    } else {
        return true;
    }
}

