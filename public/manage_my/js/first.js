
$(function(){
    var myPage = 1; //当前页码
    var myPagesize = 5; //每页的条数
    function getFirstData(){
        //表格数据渲染
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: myPage,
                pageSize: myPagesize
            },
            success: function (backData) {
                console.log(backData);
                $('tbody').html(template('firstTmp', backData));
                $('table th').addClass('text-center');
                $('table td').addClass('text-center');
                // console.log(template('firstTmp',backData));
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
                        getFirstData();
                    }
                });
            }
        })
    }
    getFirstData();

    //添加分类里表单验证数据
    $('form').bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '分类名不能为空'
                    }
                }
            },
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //点击登陆,开启进度条
        NProgress.start();
        //使用ajax提交逻辑
        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: $('form').serialize(),
            success: function(backData){
                console.log(backData);
                getFirstData();
                //关闭模态框
                $('.modal-add').modal('hide');
                //数据返回,关闭进度条
                NProgress.done();
            }
        })
    });
})