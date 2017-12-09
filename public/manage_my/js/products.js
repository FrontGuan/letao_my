
$(function(){
    var myPage = 1; //当前页码
    var myPagesize = 5; //每页的条数
    function getProductsData(){
        //表格数据渲染
        $.ajax({
            url: '/product/queryProductDetailList',
            data: {
                page: myPage,
                pageSize: myPagesize
            },
            success: function (backData) {
                console.log(backData);
                $('tbody').html(template('productsTmp', backData));
                //居中显示
                $('table th').addClass('text-center');
                $('table td').addClass('text-center');
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPage, //当前页
                    totalPages: Math.ceil((backData.total / backData.size)), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        console.log(page);
                        //page给当前页
                        myPage = page;
                        getProductsData();
                    }
                });
            }
        })
    }
    getProductsData();
})