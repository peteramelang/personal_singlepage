(function(){
	$(document).ready(function() {
		initPage();

		$(window).resize(function() {
			initPage();
		});
	});

	function initPage() {
		$('.container').width($('header').width());

		$('.imprint-toggle').on('click', function() {
			$('#imprint').toggle();

			setTimeout(function() {
				$('html, body').animate({
					scrollTop: $("#imprint").offset().top - 100
				}, 1000);
			}, 100);
		});
	}

})();
