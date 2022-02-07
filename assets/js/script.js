//Show/Hide div when select dropdown option
$(document).ready(function(){
    $(".data").hide();
    $("#name").on('change', function(){
        $("#" +$(this).val()).fadeIn(700);
    }).change();
});


$(document).ready(function(){
    $('.data').on(('click' , function(){
        $('#name').toggle();
    }):
    $('#name').toggle();
    
})
    