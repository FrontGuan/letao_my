
$(function(){
    //左边一级分类渲染
    $.ajax({
        url:'/category/queryTopCategory',
        success:function(backData){
            console.log(backData);
            $('.content_left ul').html(template('leftTmp',backData));
            //第一个高亮
            $('.content_left ul li').first().children('a').click();
            // $('.content_left ul li').first().addClass('active');
        }
    })

    //高亮显示点击的
    $('.content_left ul').on('click','a',function(){
        console.log($(this));
        $(this).parent().addClass('active').siblings().removeClass('active');
        var dataId = $(this).attr('data-id');
        //同时渲染右边的内容
        $.ajax({
            url: '/category/querySecondCategory',
            data: {
                id:dataId
            },
            success:function(backData){
                // console.log(backData);
                $('.content_right ul').html(template('rightTmp',backData));
            }
        })
    })
})