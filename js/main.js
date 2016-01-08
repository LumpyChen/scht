(function($){
	$(document).ready(function(){
		
		$(".banner-image").backstretch("images/6.jpg"); 
		var curIndex = 0; 
		var timeInterval = 10000; 
		var arr = new Array(); 
		arr[0] = "images/1.jpg"; 
		arr[1] = "images/2.jpg"; 
		arr[2] = "images/3.jpg"; 
		arr[3] = "images/4.jpg"; 
		arr[4] = "images/5.jpg";
		arr[4] = "images/6.jpg"; 
		setInterval(changeImg,timeInterval); 
		function changeImg() { 
			if (curIndex == arr.length-1) {
				curIndex = 0; 
			} else { 
				curIndex += 1; 
			} 
			$(".banner-image").backstretch(arr[curIndex]); 
			$(".banner-image").addClass('animated fadeIn');
			setTimeout(function(){
				$(".banner-image").removeClass('animated fadeIn');
			},4000);
		} 
		
		// Fixed header
		//-----------------------------------------------
		$(window).scroll(function() {
			if (($(".header.fixed").length > 0)) { 
				if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
					$("body").addClass("fixed-header-on");
				} else {
					$("body").removeClass("fixed-header-on");
				}
			};
		});

		$(window).load(function() {
			if (($(".header.fixed").length > 0)) { 
				if(($(this).scrollTop() > 0) && ($(window).width() > 767)) {
					$("body").addClass("fixed-header-on");
				} else {
					$("body").removeClass("fixed-header-on");
				}
			};
		});

		// Animations
		//-----------------------------------------------
		if (($("[data-animation-effect]").length>0) && !Modernizr.touch) {
			$("[data-animation-effect]").each(function() {
				var $this = $(this),
				animationEffect = $this.attr("data-animation-effect");
				if(Modernizr.mq('only all and (min-width: 768px)') && Modernizr.csstransitions) {
					$this.appear(function() {
						setTimeout(function() {
							$this.addClass('animated object-visible ' + animationEffect);
						}, 400);
					}, {accX: 0, accY: -130});
				} else {
					$this.addClass('object-visible');
				}
			});
		};
		
		//Modal
		//-----------------------------------------------
		if($(".modal").length>0) {
			$(".modal").each(function() {
				$(".modal").prependTo( "body" );
			});
		}

	}); // End document ready
})(this.jQuery);