
$(function(){
    //点击左边图标显示或隐藏letao_aside
    $('.letao_main a.glyphicon-glass').click(function(){
        $('.letao_aside').toggle();
        $('.letao_main').toggleClass('fullScreen');
    })

    //模态框弹出
    $('.letao_main a.glyphicon-log-out').click(function(){
        // console.log(111);
        $('.modal_myOpen').modal('show');
    })
    //点击确定按钮关闭模态框
    $('.modal-footer button.btn-primary').click(function(){
        $('.modal_myOpen').modal('hide');
    })

    //点击分类管理显示或隐藏
    $('.letao_aside ul>li:eq(1)>a').click(function(){
        $(this).siblings('ol').slideToggle();
    })
})