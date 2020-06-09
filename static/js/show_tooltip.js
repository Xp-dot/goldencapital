var isOpen = false;
$(function() {
 $('.fucking_hand').click(function(){
    if(!isOpen)
        $(".fucking_hand").attr('src',"/media/concurs_tooltip.jpg");
    else
        $(".fucking_hand").attr('src',"/media/ogon-2.jpeg");
    isOpen = !isOpen;
   return false;
 });
});