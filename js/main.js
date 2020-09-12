$(document).ready(function() {
	prikazLinkova()

	$.ajax({
		method: "get",
		url: "json/meni.json",
		dataType: "json",
		success: function(odgovor){
			console.log(odgovor);
			var ispis = "";
			odgovor.forEach( function(element) {
			if(element.tekst == "Dokumentacija" || element.tekst == "SiteMap")
				return
			ispis += `
				<li>
                    <a class="page-scroll font" href="${element.putanja}" alt="">${element.tekst}</a>
                </li>`

			});
			
			document.querySelector(".navbar-right").innerHTML = ispis;

			var link = $(".navbar-right li");
			// link.hover(function(e) {
			// 	// alert(e.isPropagationStopped())
			// 	$(this).animate({
			// 		fontSize: "16px"}, 500);
			// 	e.stopPropagation()

			// }, function(e) {
			// 	$(this).animate({
			// 		fontSize: "14px"}, 500);
			// 	e.stopPropagation()

			// });



			link.mouseenter(function(e) {
				e.preventDefault()

				$(this).animate({
					fontSize: "16px"}, 500);
				e.stopPropagation()

			});
			link.mouseout(function(e) {
				e.preventDefault()

				$(this).animate({
					fontSize: "14px"}, 500);
				e.stopPropagation()

			});

			
		},
		error: function(err) {
			console.log(err);
		}

	});


	// HOVER EFEKAT

	var x = $(".social-buttons a");
	x.hover(function() {
		$(this).addClass('zutaBoja');
	}, function() {
		$(this).removeClass('zutaBoja');
	});


});


	

function ajaxFunc (funkcija) {
	$.ajax({
		method: "GET",
		url: "json/meni.json",
		dataType: "json",
		success: funkcija
	}) 
}



function prikazLinkova () {
	ajaxFunc(function (meni) {
		let ispis = "<ul>"
	meni.forEach( function(l) {
	 	ispis += `
	 		<li>
                <a class="page-scroll font" href="${l.putanja}" alt="${l.alt}">${l.tekst}</a>
            </li>`
	 	
  	});
  	ispis += "</ul>"
	// console.log(ispis)
  	$(".linkovi-futer").html(ispis)
  	
	})

}








