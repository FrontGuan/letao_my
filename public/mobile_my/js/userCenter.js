
$(function(){
    //查询个人信息
    $.ajax({
        url:'/user/queryUserMessage',
        success:function(backData){
            console.log(backData);
            $('span.userName').html(backData.username);
            $('span.phoneNumber').html(backData.mobile);
        }
    })


    //登出
    $('.btn_exit button').click(function(){
        $.ajax({
            url: '/user/logout',
            success:function(backData){
                // console.log(backData);
                if(backData.success){
                    window.location.href = 'login.html';
                }
            }
        })
    })
})