
$(function(){
    $('button[type=submit]').click(function(event){
        // alert(000);
        event.preventDefault();      
        $.ajax({
            url:'/employee/employeeLogin',
            data:$("form").serialize(),
            type: 'post',
            success:function(backData){
                console.log(backData);
            }
        })
    })
    
})