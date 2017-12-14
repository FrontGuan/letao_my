$(function () {

    //获取验证码
    $('.mui-input-row').last().children('button').click(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/user/vCode',
            success: function (backData) {
                console.log(backData);
                //把获取的验证码给对应的input框
                $('input[name=vCode]').val(backData.vCode);

                //点击注册
                $('form button[type=submit]').click(function (e) {
                    e.preventDefault();
                    // console.log($('form').serialize());
                    var pass1 = $('.pass1').val();
                    var pass2 = $('.pass2').val();
                    console.log(pass1, pass2);
                    //两次输入密码不一致 返回
                    if (pass1 != pass2) {
                        mui.toast('两次密码输入不一致哦~');
                        return;
                    }
                    //未点击同意会员服务协议 返回
                    if($('.form-bottom input[type=checkbox]').prop('checked') == false){
                        mui.toast('你还未同意《会员服务协议》哦~');
                        return;
                    }
                    $.ajax({
                        url: '/user/register',
                        type: 'post',
                        data: $('form').serialize(),
                        success: function (backData) {
                            console.log(backData);
                        }
                    })
                })
            }
        })
    })
})