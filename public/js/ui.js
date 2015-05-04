$(document).ready(function(){

	$('ul.nav a#ui-nav').parent().addClass('active');
	var url = window.location;
	$('.sidebar a.list-group-item').filter(function() {
		return this.href == url;
	}).addClass('active');

	$('.btn-buy').click(function(){
		alert("Nice Try...");
	})

})