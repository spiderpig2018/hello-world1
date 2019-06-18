
var bankTop = localStorage.getItem("Token");
var bankStatusId;
//获取所有银行卡
function allBank() {
    $.ajax({
        url: AllUrl + "/v2/card/list/number",
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

// 分页
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
        onPageChange: function (num, type) {
            // var bankTop = localStorage.getItem("Token");
            $.ajax({
                url: AllUrl + '/v2/card/list/' + num,
                async: false,//同步方式发送请求，true为异步发送
                type: "GET",
                headers: {
                    'authorization': bankTop
                },
                dataType: "json",
                success: function (data) {
                    var dataList = data.Data;
                    // console.log(data.Data)

                    var td = [];
                    var Status, Type;
                    localCompany("G_");
                    if (dataList.length > 0) {
                        dataList.forEach(function (ele, index) {
                            if (ele.status == 1) {
                                Status = '正常'
                            }
                            if (ele.status == 2) {
                                Status = '停用';

                            }
                    console.log(ele)
                            
                            td += '<tr ><td data-th="Age"><span class="bt-content">' + ele.id + '</span></td>'
                            td += '<td data-th="Age"><span class="bt-content">' + ele.name + '</span></td>'
                            td += '<td data-th="Age"><span class="bt-content" id="Name">' + ele.bill_day + '</span></td>'
                            td += '<td data-th="Gender"><span class="bt-content" id="Number">' +Scc[ele.class_id]+ '</span></td>'
                            td += '<td data-th="Gender"><span class="bt-content" id="Phone">' + ele.number + '</span></td>'
                            td += '<td data-th="Gender"><span class="bt-content">' + ele.repayment_day + '</span></td>'
                           
                            td += '<td data-th="Gender"><span class="bt-content" id="">' + banktype[ele.type] + '</span></td>'
                            td += '<td data-th="Gender"><span class="bt-content" id="">' + ele.user + '</span></td>'
                            td += '<td data-th="Gender"><span class="bt-content" id="">'
                            + '<button  data-toggle="modal" data-target="#myModal1">' + Status + '</button></span></td></tr>'
                            $("#all_bank").html(td);
                        })
                    }

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
                window.location.href = "bank.html";
            } else {
                alert("修改失败");
            }
        },
        error: function (data) {
            alert("修改失败");
        }
    });
}

//添加银行卡
function addBank() {
    var isbank = check();
    if (isbank == true) {
        $.ajax({
            type: 'POST',
            url: AllUrl + "/v2/card/insert",
            headers: {
                'authorization': localStorage.getItem("Token")
            },
            data: {
                BankName: jQuery("#bankname  option:selected").text(),
                BillDay: $("#test1").val(),
                ClassId: jQuery("#bankId  option:selected").val(),
                Number: $("#number").val(),
                RepaymentDate: $("#RepaymentDate").val(),
                Status: jQuery("#Status  option:selected").val(),
                Type: jQuery("#Type  option:selected").val(),
                User: $("#User").val()
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
}
//银行卡验证
function check() {
    if ($("#bankname").val() == "") {
        alert('请填写银行');
        return false
    }

    if ($("#bankId").val() == "") {
        alert(' 请填写所有空格');
        return false
    }
    if ($("#test1").val() == "") {
        alert('请填写账单日');
        return false
    }
    if ($("#number").val() == "") {
        alert('请填写银行账号');
        return false
    }
    if ($("#User").val() == "") {
        alert('请填写持卡人名字');
        return false
    }

    var account = $("#number").val();
    if (account == "" || account.length < 16 || account.length > 19) {
        alert("银行卡号不正确");
        //$("#accountInfo").html("银行卡号长度必须在16到19之间");
        return false;
    }

    var rg = /^\d{6,t}$/g;
    if (!account.match(rg)) { }
    var num = /^\d*$/;  //全数字
    if (!num.exec(account)) {
        alert("银行卡号必须全为数字");
        //$("#accountInfo").html("银行卡号必须全为数字");
        return false;
    }
    //开头6位
    var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
    if (strBin.indexOf(account.substring(0, 2)) == -1) {
        alert("银行卡号开头6位不符合规范");
        //$("#accountInfo").html("银行卡号开头6位不符合规范");
        return false;
    }
    var lastNum = account.substr(account.length - 1, 1);//取出最后一位（与luhm进行比较）
    var first15Num = account.substr(0, account.length - 1);//前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array();  //奇数位*2的积 <9
    var arrJiShu2 = new Array(); //奇数位*2的积 >9

    var arrOuShu = new Array();  //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) {//奇数位
            if (parseInt(newArr[j]) * 2 < 9)
                arrJiShu.push(parseInt(newArr[j]) * 2);
            else
                arrJiShu2.push(parseInt(newArr[j]) * 2);
        }
        else //偶数位
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }

    for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }

    for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

    //计算Luhm值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhm = 10 - k;

    if (lastNum == luhm) {
        // addBankname();
        // alert("Luhm验证通过");
        //$("#banknoInfo").html("Luhm验证通过");
        return true;
    }
    else {
        // alert("银行卡号必须符合Luhm校验")
        //$("#banknoInfo").html("银行卡号必须符合Luhm校验");
        return false;
    }
}




