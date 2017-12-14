$(function () {
    //window.location.search 获取到的是?以及后面的内容 ?key=s
    var search = window.location.search.slice(1);
    key = search.split('=')[1];
    //中文编码的问题
    key = decodeURI(key);
    //放入搜索框中
    $('form input').val(key);
    console.log(key);

    function getData(obj) {
        //为lt_content添加loadging类
        $('.lt_content').addClass('loading');
        // 清除页面
        $('.lt_products ul').html('');
        //渲染搜索到的内容到页面
        $.ajax({
            url: '/product/queryProduct',
            data: {
                page: 1,
                pageSize: 999,
                proName: obj.search,
                price: obj.price || 2,
                num: obj.num || 2
            },
            success: function (backData) {
                console.log(backData);
                setTimeout(function () {
                    //移出loading类
                    $('.lt_content').removeClass('loading');
                    $('.lt_products ul').html(template('productsTmp', backData));
                }, 1500)
            }
        })
    }
    //默认调用一次
    getData({
        search: key
    });


    //点击搜索显示搜索的商品
    $('form button').click(function (e) {
        e.preventDefault();
        var search = $(this).prev().val();
        // console.log(search);
        getData({
            search: search
        });
    })

    //点击选项列表价格的箭头,切换方向,并根据箭头方向升序或降序对商品进行排序
    $('.option_price a').click(function () {
        $(this).parent().toggleClass('active')
        $(this).children('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
        if ($(this).children('span').hasClass('fa-angle-up')) {
            //升序
            getData({
                search: key,
                price: 1
            });
        } else {
            //降序
            getData({
                search: key,
                price: 2
            });
        }
    })
    //点击选项库存的箭头,切换方向,并根据箭头方向升序或降序对商品进行排序
    $('.option_num a').click(function () {
        $(this).parent().toggleClass('active')
        $(this).children('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
        if ($(this).children('span').hasClass('fa-angle-up')) {
            //升序
            getData({
                search: key,
                num: 1
            });
        } else {
            //降序
            getData({
                search: key,
                num: 2
            });
        }
    })



    //点击立即购买跳转到商品详情页面
    $('.lt_products ul').on('click', 'input[type=button]', function () {
        var id = $(this).attr('data-id');
        // console.log(id);
        window.location.href = './productDetail.html?id=' + id;
    })
})