

var Token = localStorage.getItem("Token");
$('#form').click(function () {
    $.ajax({
        type: "POST",
        url: AllUrl + "/v2/account/login/account",
        data: {
            Number: $('#username').val(),
            Psd: $.md5($("#password").val())
        },
        dataType: "json",

        headers: {
            'authorization': Token
        },
        success: function (data) {
            var State = data.State;
            var message = data.Message;
            if (State == true) {
                localStorage.setItem("Token", data.Message);
                window.location.href = "../index.html";
                localStorage.getItem("Token");
                // downloadStorage();
                // 调用cookice
            } else {
                alert(message)
            }
        },
        error: function () {
            alert("登录失败");

        }
    });
});

