
$(function(){
    //点击登陆
    $('form button[type=submit]').click(function(e){
        e.preventDefault();
        console.log($('form').serialize());
        $.ajax({
            url:'/user/login',
            type:'post',
            data:$('form').serialize(),
            success:function(backData){
                console.log(backData);
                if(backData.success){
                    //登陆成功
                    window.history.back();
                }
            }
        })
    })
})