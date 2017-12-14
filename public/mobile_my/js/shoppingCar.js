$(function () {

    /* 初始化下拉刷新 */ 
    mui.init({
        pullRefresh: {
            container: ".lt_content", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                color: '#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
                height: '50px', //可选,默认50px.下拉刷新控件的高度,
                range: '100px', //可选 默认100px,控件可下拉拖拽的范围
                offset: '0px', //可选 默认0px,下拉刷新控件的起始位置
                auto: true, //可选,默认false.首次加载自动上拉刷新一次
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                callback: function () {
                    // mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                    $.ajax({
                        url: '/cart/queryCart',
                        success: function (backData) {
                            console.log(backData);
                            if (backData.error == 400) {
                                window.location.href = './login.html';
                            } else {
                                // console.log(template('shoppingCarTmp',backData));
                                $('#OA_task_2').html(template('shoppingCarTmp', backData));
                                setTimeout(function () {
                                    mui('.lt_content').pullRefresh().endPulldownToRefresh();
                                }, 2000)
                            }
                        }
                    })
                } 
            }
        }
    });

    //侧滑点击删除图标删除购物车对应数据
    $('#OA_task_2').on('tap', 'span.fa-trash-o', function () {
        var id = $(this).attr('data-id')
        $.ajax({
            url: '/cart/deleteCart',
            data: {
                id: [id]
            },
            success: function (backData) {
                console.log(backData);
                if (backData.success) {
                    //删除成功,人为刷新一下
                    // mui('.lt_content').pullRefresh().pulldownLoading()
                    // console.log(mui('.lt_content').pullRefresh().pulldownLoading());

                }
            }
        })
    })

    //点击选择框计算购物车总价
    $('#OA_task_2').on('click','input[type=checkbox]',function(){
        var price = parseInt($(this).parent().next().children('.price_desc').find('.price').html().slice(1));
        var num = parseInt($(this).parent().next().children('.price_desc').find('.num').html())
        // console.log(price,num);
        var totalPrice = price * num;
        var currentMoney = parseInt($('.lt_orderList p span').html());
        if($(this).prop('checked')){
            currentMoney += totalPrice;
            $('.lt_orderList p span').html(currentMoney);
        }else{
            currentMoney -= totalPrice;
            $('.lt_orderList p span').html(currentMoney);
        }
    })
    
})