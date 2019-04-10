// JavaScript Document

//城市选择
$(document).ready(function() {
        $(".CurrentCity :first").click(function(){
			$('#City_list').toggle(500);
			})
		$(".Publish").click(function(){
		    $("#TxtContent").show(200);
			})
});
//

$(window).load(function () {
    $('img[nopic="true"]').each(function () {
//        alert(this.naturalWidth);
        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
//            alert(this.src);
            this.src = 'http://res.edushi.com/dian/3g/images/DefaultImg.jpg';
        }
    });
});