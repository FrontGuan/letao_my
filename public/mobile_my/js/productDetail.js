$(function () {
    var id = window.location.search.slice(1).split('=')[1];
    console.log(id);
    $.ajax({
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function (backData) {
            console.log(backData);
            $('.lt_content .mui-scroll').html(template('productDetailTmp', backData));
            // console.log(template('productDetailTmp', backData));
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
            });

            //手动把渲染尺码
            var startSize = parseInt(backData.size.split('-')[0]);
            var endSize = parseInt(backData.size.split('-')[1]);
            for (var i = startSize; i <= endSize; i++) {
                $("<span class='size'>" + i + "</span>").appendTo($('li.productSize'));
            }

            //动态生成的,则需要对库存的mui数字输入框初始化
            mui('.mui-numbox').numbox();

        }
    })

    //点击尺码高亮显示
    $('.lt_content .mui-scroll').on('click', 'span.size', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })

    //点击底部加入购物车按钮
    $('.lt_footer.product .mui-btn-danger').click(function () {
        console.log(222);
        $.ajax({
            url: '/cart/addCart',
            type:'post',
            data:{
                productId:id,
                num: $('.mui-numbox-input').val(),
                size:$('span.size.active').html()
            },
            success: function (backData) {
                console.log(backData);
                if(backData.error == 400){
                    //没登陆跳转到登陆页面
                    window.location.href = './login.html';
                }
            }
        })
    })

})