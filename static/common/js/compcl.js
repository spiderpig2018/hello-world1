
    function userAjax(srt) {
        var Token = localStorage.getItem("Token");
        $.ajax({
            url: AllUrl + '/v2/account/get/account',
            async: false,//同步方式发送请求，true为异步发送
            type: "GET",
            headers: {
                'authorization': Token
            },
            dataType: "json",
            success: function (data) {
                localStorage.setItem("srt", data.Data.position);
            }
        })
    }

    // userAjax();
    // var str = localStorage.getItem("srt");

    var str = 1;

    if (str == 6) {
        $.each(configur[6], function (index, ele) {
            var Title = '<li id="Basics"><h4>订单基础操作</h4></li>'
            $("#test").append(Title)
            $.each(ele, function (index, ele) {
                var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                $("#Basics").append(bod)
            })
        })
    }

    if (str == 5) {
        $.each(configur[6], function (index, ele) {
            Title = '<li id="Basics"><h4>订单基础操作</h4></li>'
            $("#test").append(Title)
            $.each(ele, function (index, ele) {
                var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                $("#Basics").append(bod);
            })
        })

        $.each(configur[5], function (index, ele) {
            $.each(configur[3], function (index, ele) {
                var Title = ' <li id="form"><h4>报表管理</h4></li>'
                $("#test").append(Title);
                $.each(ele[0], function (index, ele) {
                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#form").append(bod)
                })

                var Title = ' <li id="form1"><h4>报表管理(2)</h4></li>'
                $("#test").append(Title)
                $.each(ele[1], function (index, ele) {
                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#form1").append(bod)
                })
                var Title = ' <li id="form3"><h4>报表管理(3)</h4></li>'
                $("#test").append(Title)
                $.each(ele[2], function (index, ele) {

                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#form3").append(bod)
                })
                var Title = ' <li id="Receivables"><h4>收款操作</h4></li>'
                $("#test").append(Title)
                $.each(ele[3], function (index, ele) {

                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#Receivables").append(bod)
                })
                var Title = ' <li id="payment"><h4>付款操作</h4></li>'
                $("#test").append(Title)
                $.each(ele[4], function (index, ele) {

                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#payment").append(bod)
                })

                var Title = ' <li id="Order"><h4>订单操作</h4></li>'
                $("#test").append(Title)
                $.each(ele[5], function (index, ele) {

                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#Order").append(bod)
                })
            })
        })
    }

    if (str == 4) {
        $.each(configur[4], function (index, ele) {
            var Title = ' <div id="account"><h4>账号管理</h4></div>'
            $("#test").append(Title)
            $.each(ele[0], function (index, ele) {
                var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                $("#account").append(bod)
            })
            var Title = ' <li id="Grouping"><h4>分组管理</h4></li>'
            $("#test").append(Title)
            $.each(ele[1], function (index, ele) {
                var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                $("#Grouping").append(bod)
            })
            var Title = ' <li id="product"><h4>产品管理</h4></li>'
            $("#test").append(Title)
            $.each(ele[2], function (index, ele) {
                var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                $("#product").append(bod)
            })
        })
    }

    if (str == 3) {
        $.each(configur[6], function (index, ele) {
            Title = '<li id="Basics"><h4>订单基础操作</h4></li>'
            $("#test").append(Title)
            $.each(ele, function (index, ele) {
                var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                $("#Basics").append(bod);
            })
        })

        $.each(configur[5], function (index, ele) {
            $.each(configur[3], function (index, ele) {
                var Title = ' <li id="form"><h4>报表管理</h4></li>'
                $("#test").append(Title);
                $.each(ele[0], function (index, ele) {
                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#form").append(bod)
                })

                var Title = ' <li id="form1"><h4>报表管理(2)</h4></li>'
                $("#test").append(Title)
                $.each(ele[1], function (index, ele) {
                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#form1").append(bod)
                })
                var Title = ' <li id="form3"><h4>报表管理(3)</h4></li>'
                $("#test").append(Title)
                $.each(ele[2], function (index, ele) {

                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#form3").append(bod)
                })
                var Title = ' <li id="Receivables"><h4>收款操作</h4></li>'
                $("#test").append(Title)
                $.each(ele[3], function (index, ele) {

                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#Receivables").append(bod)
                })
                var Title = ' <li id="payment"><h4>付款操作</h4></li>'
                $("#test").append(Title)
                $.each(ele[4], function (index, ele) {

                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#payment").append(bod)
                })

                var Title = ' <li id="Order"><h4>订单操作</h4></li>'
                $("#test").append(Title)
                $.each(ele[5], function (index, ele) {

                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#Order").append(bod)
                })


                var Title = ' <li id="currency"><h4>货币管理</h4></li>'
                $("#test").append(Title)
                $.each(ele[6], function (index, ele) {
                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#currency").append(bod)
                })
                var Title = ' <li id="supply"><h4>供应商管理</h4></li>'
                $("#test").append(Title)
                $.each(ele[7], function (index, ele) {
                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#supply").append(bod)
                })
                var Title = ' <li id="Sale"><h4>销售商管理</h4></li>'
                $("#test").append(Title)
                $.each(ele[8], function (index, ele) {
                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#Sale").append(bod)
                })
                var Title = ' <li id="card"><h4>银行卡管理</h4></li>'
                $("#test").append(Title)
                $.each(ele[9], function (index, ele) {
                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#card").append(bod)
                })
            })
        })
    }

    if (str == 1 || str == 2 || str == "x") {
        $.each(configur[6], function (index, ele) {
            Title = '<li id="Basics"><h4>订单基础操作</h4></li>'
            $("#test").append(Title)
            $.each(ele, function (index, ele) {
                var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                $("#Basics").append(bod);
            })
        })

        $.each(configur[5], function (index, ele) {
            $.each(configur[3], function (index, ele) {
                var Title = ' <li id="form"><h4>报表管理</h4></li>'
                $("#test").append(Title);
                $.each(ele[0], function (index, ele) {
                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#form").append(bod)
                })

                var Title = ' <li id="form1"><h4>报表管理(2)</h4></li>'
                $("#test").append(Title)
                $.each(ele[1], function (index, ele) {
                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#form1").append(bod)
                })
                var Title = ' <li id="form3"><h4>报表管理(3)</h4></li>'
                $("#test").append(Title)
                $.each(ele[2], function (index, ele) {

                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#form3").append(bod)
                })
                var Title = ' <li id="Receivables"><h4>收款操作</h4></li>'
                $("#test").append(Title)
                $.each(ele[3], function (index, ele) {

                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#Receivables").append(bod)
                })
                var Title = ' <li id="payment"><h4>付款操作</h4></li>'
                $("#test").append(Title)
                $.each(ele[4], function (index, ele) {

                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#payment").append(bod)
                })

                var Title = ' <li id="Order"><h4>订单操作</h4></li>'
                $("#test").append(Title)
                $.each(ele[5], function (index, ele) {

                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#Order").append(bod)
                })


                var Title = ' <li id="currency"><h4>货币管理</h4></li>'
                $("#test").append(Title)
                $.each(ele[6], function (index, ele) {
                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#currency").append(bod)
                })
                var Title = ' <li id="supply"><h4>供应商管理</h4></li>'
                $("#test").append(Title)
                $.each(ele[7], function (index, ele) {
                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#supply").append(bod)
                })
                var Title = ' <li id="Sale"><h4>销售商管理</h4></li>'
                $("#test").append(Title)
                $.each(ele[8], function (index, ele) {
                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#Sale").append(bod)
                })
                var Title = ' <li id="card"><h4>银行卡管理</h4></li>'
                $("#test").append(Title)
                $.each(ele[9], function (index, ele) {
                    var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                    $("#card").append(bod)
                })
            })
        })

        $.each(configur[4], function (index, ele) {
            var Title = ' <li id="account"><h4>账号管理</h4></li>'
            $("#test").append(Title)
            $.each(ele[0], function (index, ele) {
                var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                $("#account").append(bod)
            })
            var Title = ' <li id="Grouping"><h4>分组管理</h4></li>'
            $("#test").append(Title)
            $.each(ele[1], function (index, ele) {
                var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                $("#Grouping").append(bod)
            })
            var Title = ' <li id="product"><h4>产品管理</h4></li>'
            $("#test").append(Title)
            $.each(ele[2], function (index, ele) {
                var bod = '<li><input name="" type="checkbox" value=' + ele + ' /><span>' + ele + '</span></li>';
                $("#product").append(bod)
            })
        })

    }

    function getCheckBoxVal() { //jquery获取所有选中的复选框的值 
        var chk_value = [];
        var powerid = "";
        var Jurisdiction = "";
        $("#test").find('input[type="checkbox"]').each(function () { //遍历，将所有选中的值放到数组中
            if (chk_value[$(this).parent().parent().children().first().text()] == null || chk_value[$(this).parent().parent().children().first().text()] == undefined) {
                chk_value[$(this).parent().parent().children().first().text()] = new Array();
            }
            if ($(this).prop("checked")) {
                chk_value[$(this).parent().parent().children().first().text()].push($(this).val());
            }
        });
        for (let index in chk_value) {
            var biaoji = true;
            var powerChild = powerFeck[index]
            for (let key in powerChild) {
                var i = powerChild[key].split(",").length;
                if (powerChild[key] == "") {
                    i = 0;
                }
                if (i == chk_value[index].length) {
                    var child = chk_value[index];
                    var flag = child.length;
                    var n = 0;
                    for (let i = 0; i < child.length; i++) {
                        if (powerChild[key].indexOf(child[i]) > -1) {
                            n++;
                        } else {
                            break;
                        }
                    }
                    if (n === flag) {
                        biaoji = false;
                        Jurisdiction += key;
                    }
                }
            }
            if (biaoji) {
                Jurisdiction += "0";
            }
        }
        console.log(Jurisdiction);
    }

    function romCheckBoxVal() {
        $("#test").find('input[name=""]:checked').each(function () { //遍历，将所有选中的值放到数组中
            chk_value = [];

        });
        console.log(chk_value.length == 0 ? '你还没有选择任何内容！' : chk_value);
    }


