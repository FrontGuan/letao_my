$(function () {

    var myPage = 1;
    var myPagesize = 5;


    function getData() {
        //表格数据渲染
        $.ajax({
            url: '/user/queryUser',
            data: {
                page: myPage,
                pageSize: myPagesize
            },
            success: function (backData) {
                console.log(backData);
                $('tbody').html(template('userData', backData));
                $('table th').addClass('text-center');
                $('table td').addClass('text-center');
                // console.log(template('userData',backData));
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
                        getData();
                    }
                });
            }
        })
    }
    getData();

    //启用禁用功能
    $('tbody').on('click','button',function(){
        console.log($(this).parent().attr('data-id'));
        var myID = $(this).parent().attr('data-id');
        var isDelete = null;
        if($(this).html() == '启用'){
            isDelete = 0;
        }else {
            isDelete = 1;
        }
        console.log(isDelete);
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: myID,
                isDelete: isDelete
            },
            success: function(backData){
                console.log(backData);
                getData();
            }
        })
    })
})