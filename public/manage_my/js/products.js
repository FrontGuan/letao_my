$(function () {
    var myPage = 1; //当前页码
    var myPagesize = 5; //每页的条数
    function getProductsData() {
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

    //上传文件插件使用
    $("#fileUpload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            console.log(data.result.picAddr);
            // var img =  '<img src="'+ data.result.picAddr +'" alt="">';
            $('<img style="width:60px" src="' + data.result.picAddr + '" alt="">').appendTo($('form .form-group:last'));
            if ($('form .form-group:last img').length = 3) {
                // $("form").data('bootstrapValidator').updateStatus('pic1', 'VALID')
            }
        }
    });

    //超过3张图片不能上传
    $('form input[type=file]').click(function (event) {
        if ($('form .form-group:last img').length == 3) {
            event.preventDefault();
        }
    })

    //双击图片取消上传
    $('form .form-group:last').on('dblclick', 'img', function () {
        //销毁自己
        $(this).remove();
    })

    //为添加商品form添加表单验证
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
            // pic1: {
            //     validators: {
            //         //不能为空
            //         notEmpty: {
            //             message: '请上传三张图片'
            //         }
            //     }
            // },
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '产品名称不能为空'
                    }
                }
            },
            oldPrice: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '老价格不能为空'
                    }
                }
            },
            price: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '原价不能为空'
                    }
                }
            },
            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入产品描述'
                    }
                }
            },
            size: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入产品尺寸'
                    }
                }
            },
            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户库存不能为空'
                    }
                }
            },
            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '归属品牌不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: $('form').serialize(),
            success: function(backData){
                console.log(backData);
                //重置表单并关闭模态框
                $('form input').val('');
                $('form textarea').val('');
                //清空三张图片
                $('form img').remove();
                $('.modal-add').modal('hide');
                getProductsData();
            }
        })
    });
})