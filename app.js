$(window).scroll(function()
{
    let scrollTop = $(window).scrollTop();
    let headerHeight = $('.menu').height();
 
    if(scrollTop > headerHeight) {
        $('.menu').css('background', '#212121');
    }else{
        $('.menu').css('background', 'rgba(0,0,0,.3)');
    }
});

$('#checkout').click(function() {

    let gateway = $('#gateway:checked');
    let termos  = $("#termos");
    if(!termos.is(':checked')) { return termos.focus(); }
    $(this).prop('disabled', true);

    $.ajax({
        url: "/carrinho/checkout",
        type:"POST",
        dataType:'JSON',
        data: { gateway: gateway.val() },
        complete: function (result){
            console.log(result.responseText);
            const r = JSON.parse(result.responseText);
            if(r.response === "ok"){
                location.href = r.url;
            }else{
                $(this).prop('disabled', false);
            }
        }
    });
});

$('#toProducts').on('click', function(e) {
    e.preventDefault();

    document.getElementById("products").scrollIntoView();
});

$('.add-to-cart').on('click',function(e){
    e ? e.preventDefault() : false;
    let id = $(this).attr('id');
    $.ajax({
        url: "/carrinho/actions/add",
        type:"POST",
        data: { 'id':id },
        complete: function (){
            window.location.href = "/carrinho";
        }
    });
    return false;
});

$('.remove-from-cart').on('click',function(e){
    e ? e.preventDefault() : false;
    $.ajax({
        url:  "/carrinho/actions/remove",
        type:"POST",
        data: {'id':$(this).attr('id')},
        complete: function (){
            window.location.reload();
        }
    });
    return false;
});

$('.att-cart').on('click',function(e){
    e ? e.preventDefault() : false;

    var id  = $(this).attr('id');
    var p = id.split('-');
    var s   = '.quantia-'+p[1];
    var get = $(s).val();

    $.ajax({
        url:  "/carrinho/actions/att",
        type:"POST",
        data: {'id':p[0], 'qnt':get},
        complete: function (){
            window.location.reload();
        }
    });
    return false;
});

$('#checkout').click(function() {
    let gateway = $('.gateway:checked');
    let termos  = $("#termos");

    if(!termos.is(':checked')) { return termos.focus(); }
    $(this).prop('disabled', true);

    $.ajax({
        url: "/carrinho/checkout",
        type:"POST",
        dataType:'JSON',
        data: { gateway: gateway.val() },
        complete: function (result){
            console.log(result.responseText);
            const r = JSON.parse(result.responseText);
            if(r.response === "ok"){
                location.href = r.url;
            }else{
                $(this).prop('disabled', false);

            }
        }
    });
});