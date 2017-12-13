
$(function(){
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		indicators: false
	});

	//点击所有搜索框去搜索页面
	$('.fa-search').on('tap',function(){
		console.log(111);
		window.location.href = 'search.html';
	})

	//点击底部导航跳到对应的页面
	$('.lt_footer .fa-home').on('tap',function(){
		window.location.href = './index.html';
	})
	$('span.fa-list-ul').on('tap',function(){
		window.location.href = './category.html';
	})
	$('span.fa-shopping-cart').on('tap',function(){
		window.location.href = './shoppingCar.html';
	})
	$('span.fa-user').on('tap',function(){
		window.location.href = './userCenter.html';
	})

	// 点击返回箭头 回到上一次的历史记录
	$('.lt_header .fa-chevron-left').on('tap',function(){
		//跳到前一次页面
		window.history.back();
	})
})


