
$(function(){

    /* 获取本地缓存的历史纪录的函数 */
    function getHistory(){
        var history = window.localStorage.getItem('search_history');
        if(history == null){
            history = [];
        }else {
            //把字符串转化为数组
            history = JSON.parse(history);
        }
        return history;
    }
    /* 渲染页面函数 */
    function renderHistory(){
        //先从本地缓存获取历史纪录
        var history = getHistory();
        //渲染历史纪录到页面
        $('.history_list ul').html(template('historyTmp',history));
    }

    renderHistory(); //默认渲染一次

    $('form button').click(function(event){
        
        //获取搜索的内容
        var searchValue = $(this).prev().val().trim();

        if(searchValue == ''){
            //阻止其跳转跳转到商品列表页面
            event.preventDefault();
            mui.alert('兄弟,请输入搜索的内容哦','友情提示',function(e){
                console.log(e);
            })
            return false;
        }
        console.log(searchValue);
        // window.localStorage.setItem('search_history');
        //获取本地缓存的历史纪录
        var history = getHistory();
        //添加搜索的内容前判断这个内容是否存在
        var index = history.indexOf(searchValue);
        if(index != -1){
            //存在则把这个数据删掉,再重新加到数组最前面
            history.splice(index,1);
            
        }
        history.unshift(searchValue);
        console.log(history);

        window.localStorage.setItem('search_history',JSON.stringify(history));

        //渲染历史纪录到页面
        // $('.history_list ul').html(template('historyTmp',history));
        renderHistory();
    })

    //点击x删除该条记录
    $('.history_list ul').on('click','.fa-close',function(){
        // console.log(222);
        var history = getHistory();
        var index = $(this).parent().index();
        // console.log(index);
        history.splice(index,1);
        //转成字符串再设置给本地缓存的历史纪录,同时渲染页面
        window.localStorage.setItem('search_history',JSON.stringify(history));
        renderHistory();
    })

    //清空记录
    $('.searh-history span').last().click(function(){
        console.log(222);
        mui.confirm('你确定要删除所有历史纪录???','友情提示',['确定','取消'],function(e){
            console.log(e);
            if(e.index == 0){
                //清除本地历史纪录缓存
                window.localStorage.removeItem('search_history')
                //渲染页面
                renderHistory();
            }
        })
    })

    //点击历史纪录搜索
    $('.history_list ul').on('click','li',function(){
        var key = $(this).children('a').html();
        // 将点击的历史纪录提到最前
        var history = getHistory();
        var index = history.indexOf(key);
        history.splice(index,1);
        history.unshift(key);
        window.localStorage.setItem('search_history',JSON.stringify(history));
        //跳转到商品列表页面
        window.location.href = './searchList.html?key=' + key;
    })
})