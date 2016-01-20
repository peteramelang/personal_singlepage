(function(){
	$(document).ready(function() {
		initPage();

		$(window).resize(function() {
			initPage();
		});
	});

	function initPage() {
		$('.container').width($('header').width());

	}

})();
