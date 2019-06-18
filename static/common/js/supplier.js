
var bankTop = localStorage.getItem("Token");
var bankStatusId;
//获取所有供应商数量
function allBank() {
    $.ajax({
        url: AllUrl + "/v2/supplier/list/number",
        type: "GET",
        dataType: "json",
        headers: {
            'authorization': bankTop
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
allBank()


function SorterPaging(number,url,data){
    this.number=number;
    this.url = url;
    this.allnumber = function(){
        $.ajax({
            url: AllUrl + this.url,
            type: "GET",
            dataType: "json",
            headers: {
                'authorization': bankTop
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
            // var bankTop = localStorage.getItem("Token");
            $.ajax({
                url: AllUrl + '/v2/supplier/list/' + num,
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
                    // console.log(dataList)

                    dataList.forEach(function (ele, index) {

                        if (ele.status == 1) {
                            Status = '正常'
                        }
                        if (ele.status == 2) {
                            Status = '停用';

                        }
                        td += '<tr ><td data-th="Age"><span class="bt-content">' + ele.id + '</span></td>'
                        td += '<td data-th="Age"><span class="bt-content">' + ele.name + '</span></td>'
                        td += '<td data-th="Age"><span class="bt-content" id="Name">' + ele.address + '</span></td>'
                        td += '<td data-th="Age"><span class="bt-content" id="Name">' + ele.advantage + '</span></td>'
                        td += '<td data-th="Gender"><span class="bt-content" id="Phone">' + ele.contact + '</span></td>'
                        td += '<td data-th="Gender"><span class="bt-content" id="Phone">' + ele.bill_type + '</span></td>'
                        td += '<td data-th="Gender"><span class="bt-content">' + ele.information + '</span></td>'
                        td += '<td data-th="Gender"><span class="bt-content" id="">'
                            + '<button  data-toggle="modal" data-target="#myModal1">' + Status + '</button></span></td>'

                        $("#all_bank").html(td);
                    })


                    $("table tr").click(function () {
                        var td = $(this).find("td");
                        var lo_id = td[0].innerText;
                        //更改状态             
                        bankStatusId = lo_id;
                    })
                },
            })
        }
    });
}
// 分页
function page(data) {
    // console.log(data)
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
        onPageChange: function (num, type) {
            // var bankTop = localStorage.getItem("Token");
            $.ajax({
                url: AllUrl + '/v2/supplier/list/' + num,
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
                    // console.log(dataList)

                    dataList.forEach(function (ele, index) {

                        if (ele.status == 1) {
                            Status = '正常'
                        }
                        if (ele.status == 2) {
                            Status = '停用';

                        }
                        td += '<tr ><td data-th="Age"><span class="bt-content">' + ele.id + '</span></td>'
                        td += '<td data-th="Age"><span class="bt-content">' + ele.name + '</span></td>'
                        td += '<td data-th="Age"><span class="bt-content" id="Name">' + ele.address + '</span></td>'
                        td += '<td data-th="Age"><span class="bt-content" id="Name">' + ele.advantage + '</span></td>'
                        td += '<td data-th="Gender"><span class="bt-content" id="Phone">' + ele.contact + '</span></td>'
                        td += '<td data-th="Gender"><span class="bt-content" id="Phone">' +Config.SupplierType[ele.type]  + '</span></td>'
                        td += '<td data-th="Gender"><span class="bt-content">' + ele.information + '</span></td>'
                        td += '<td data-th="Gender"><span class="bt-content" id="">'
                            + '<button  data-toggle="modal" data-target="#myModal1">' + Status + '</button></span></td>'

                        $("#all_bank").html(td);
                    })


                    $("table tr").click(function () {
                        var td = $(this).find("td");
                        var lo_id = td[0].innerText;
                        //更改状态             
                        bankStatusId = lo_id;
                    })
                },
            })
        }
    });
}



function qureds() {
    $.ajax({
        type: 'POST',
        url: AllUrl + "/v2/card/changes",
        headers: {
            'authorization': localStorage.getItem("Token")
        },
        data: {
            Id: bankStatusId,
            status: jQuery("#bankStatus  option:selected").val()
        },
        dataType: "json",
        success: function (data) {
            if (data) {
                console.log(data)
                alert("修改成功");
                // window.location.href = "";
            } else {
                alert("修改失败");
            }
        },
        error: function (data) {
            alert("修改失败");
        }
    });
}

//添加供应商
function addSupp() {
    1
    $.ajax({

        type: 'POST',
        url: AllUrl + "/v2/supplier/insert",
        headers: {
            'authorization': localStorage.getItem("Token")
        },
        data: {
            address: jQuery("#address").val(),
            advantage: $("#advantage").val(),
            billType: jQuery("#billType  option:selected").val(),
            contact: $("#contact").val(),
            information: $("#information").val(),
            name: $('#name').val(),
            status: jQuery("#Status  option:selected").val(),
            type: $("#type").val()
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
            alert("添加失败");
        }
    });



}
function isnull() {
    if (jQuery("#name").val() == "") {
        alert("名称为空");
        return false;
    }
    if (jQuery("#address").val() == "") {
        alert("地址为空");
        return false;
    }
    if (jQuery("#contact").val() == "") {
        alert("电话不能为空");
        return false;
    } else {
        true
    }
}

//添加销售商
function addSeller() {
    $.ajax({
        type: 'POST',
        url: AllUrl + "/v2/sales/insert",
        headers: {
            'authorization': localStorage.getItem("Token")
        },
        data: {
            address: jQuery("#address").val(),
            advantage: $("#advantage").val(),
            billType: jQuery("#billType  option:selected").val(),
            contact: $("#contact").val(),
            information: $("#information").val(),
            name: $('#name').val(),
            status: jQuery("#Status  option:selected").val(),
            type: $("#type").val()
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
            alert("添加失败");
        }
    });
}

//获取所有销售商数量
function allSeller() {
    $.ajax({
        url: AllUrl + "/v2/sales/list/number",
        type: "GET",
        dataType: "json",
        headers: {
            'authorization': bankTop
        },
        success: function (data) {
            if (data) {
                pageSeller(data);
            } else {
                alert('失败');
            }
        },
        error: function (data) {
            alert('操作失败');
        }
    })
}
allSeller()
//分页
function pageSeller(data) {
    console.log(data)
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
        onPageChange: function (num, type) {
            // var bankTop = localStorage.getItem("Token");
            $.ajax({
                url: AllUrl + '/v2/sales/list/' + num,
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
                    // console.log(dataList)

                    dataList.forEach(function (ele, index) {

                        if (ele.status == 1) {
                            Status = '正常'
                        }
                        if (ele.status == 2) {
                            Status = '停用';

                        }
                        td += '<tr ><td data-th="Age"><span class="bt-content">' + ele.id + '</span></td>'
                        td += '<td data-th="Age"><span class="bt-content">' + ele.name + '</span></td>'
                        td += '<td data-th="Age"><span class="bt-content" id="Name">' + ele.address + '</span></td>'
                        td += '<td data-th="Age"><span class="bt-content" id="Name">' + ele.advantage + '</span></td>'
                        td += '<td data-th="Gender"><span class="bt-content" id="Phone">' + ele.contact + '</span></td>'
                        td += '<td data-th="Gender"><span class="bt-content" id="Phone">' + Config.SupplierType[ele.type] + '</span></td>'
                        td += '<td data-th="Gender"><span class="bt-content">' + ele.information + '</span></td>'
                        td += '<td data-th="Gender"><span class="bt-content" id="">'
                            + '<button  data-toggle="modal" data-target="#myModal1">' + Status + '</button></span></td>'

                        $("#allSeller").html(td);
                    })

                    $("table tr").click(function () {
                        var td = $(this).find("td");
                        var lo_id = td[0].innerText;
                        console.log(lo_id)
                        //更改状态             
                        bankStatusId = lo_id;
                    })
                },
            })
        }
    });
}




