$(function () {
    var myPage = 1; //当前页码
    var myPagesize = 5; //每页的条数
    function getSecondData() {
        //表格数据渲染
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: myPage,
                pageSize: myPagesize
            },
            success: function (backData) {
                console.log(backData);
                $('tbody').html(template('secondTmp', backData));
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
                        getSecondData();
                    }
                });
            }
        })
    }
    getSecondData();

    //添加分类中一级分类下拉框值渲染
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        data: {
            page: 1,
            pageSize: 100
        },
        success: function (backData) {
            //代码清空dropdown-menu的值
            $('.dropdown-menu').html('');
            // console.log(backData);
            $.each(backData.rows, function (i, n) {
                console.log(n);
                var $li = '<li data-categoryId="' + n.id + '"><a href="#">' + n.categoryName + '</a></li>';
                $('.dropdown-menu').append($li);
            })
        }
    })

    //上传文件插件使用
    $("#fileUpload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            console.log(data.result.picAddr);
            // 把这个路径给img和用来存放的input
            $('form img').attr('src', data.result.picAddr);
            $('input[name=brandLogo]').val(data.result.picAddr);
            //更新brandLogo字段状态
            $("form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    });

    //点击dropdown-menu的li改变当前选择的值
    $('.dropdown-menu').on('click', 'li', function () {
        console.log($(this).find('a').html());
        $('.selected-value').html($(this).find('a').html());
        //存起来
        $('input[name=categoryId]').val($(this).attr('data-categoryId'));
        //更新categoryId字段状态
        $("form").data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })

    //添加分类表单验证
    $('form').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled'],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '品牌名称不能为空'
                    }
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请选择你要上传的图片'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: $('form').serialize(),
            success:function(backData){
                console.log(backData);
                //重新渲染并关闭模态框
                getSecondData();
                $('.modal-add').modal('hide');
                //重置表单
                $("form").data('bootstrapValidator').resetForm();
                $('.selected-value').html('请选择');
                $('input[name=brandName]').val('');
                //img的图片变为默认图片
                $('form img').attr('src','./images/none.png');
            }
        })
    });
})