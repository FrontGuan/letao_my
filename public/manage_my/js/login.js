$(function () {

    $('form').bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 12,
                        message: '用户名长度必须在3到12之间'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '用户名长度必须在6到16之间'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //点击登陆,开启进度条
        NProgress.start();
        //使用ajax提交逻辑
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: $('form').serialize(),
            success: function(backData){
                console.log(backData);
                if(backData.success){
                    //验证成功
                    window.location.href = 'index.html';
                }else {
                    //验证失败
                    //获取表单校验实例
                    var validator = $("form").data('bootstrapValidator'); 
                    if(backData.error == 1000) {
                        //更新用户名错误提示字段的状态
                        validator.updateStatus('username', 'INVALID', 'callback');
                    }else {
                        //更新密码错误提示字段的状态
                        validator.updateStatus('password', 'INVALID', 'callback');
                    }
                }
                //数据返回,关闭进度条
                NProgress.done();
            }
        })
    });

    //重置表单
    $('button[type=reset]').click(function(){
        var validator = $("form").data('bootstrapValidator');
        validator.resetForm();
    })

})