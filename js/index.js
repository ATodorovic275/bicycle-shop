$(document).ready(function() {
		
	dohvatanjeSlajder()	


	$.ajax({
		method: "get",
		url: "json/bicikli.json",
		dateType: "json",
		success: function(proizvodi){
			
			// ISPISIVANJE PROIZVODA

			ispisivanjeProizvoda(proizvodi);
		},
		error: function(err) {
			console.log(err);
		}
	});


	$(".fa-arrow-right").click(slajder);
	$(".fa-arrow-left").click(slajder2);


	$("#slajder #levo").hover(function() {
		$(this).css({
			opacity : '0.3'
		});
	}, function() {
		$(this).css({
			opacity : '0'
		});
	});
	

	$("#slajder #desno").hover(function() {
		$(this).css({
			opacity : '0.3'
		});
	}, function() {
		$(this).css({
			opacity : '0'
		});
	});



});





function slajder () {
	var trenutnaSlika = $("#slajderNovi .prikazi");
	// console.log(trenutnaSlika);
	var sledeca = trenutnaSlika.next().length ? trenutnaSlika.next() : trenutnaSlika.parent().children(':first');
	trenutnaSlika.hide().removeClass('prikazi');
	sledeca.fadeIn(1000).addClass('prikazi');		 
}

function slajder2 () {
	var trenutnaSlika = $("#slajderNovi .prikazi");
	// console.log(trenutnaSlika);
	var sledeca = trenutnaSlika.prev().length ? trenutnaSlika.prev() : trenutnaSlika.parent().children(':last');
	trenutnaSlika.hide().removeClass('prikazi');
	sledeca.fadeIn(1000).addClass('prikazi');
	 
}


function ispisivanjeProizvoda (proizvodi) {
	let br = 0
	var ispis = "";
		for(let proizvod of proizvodi){
			if(br < 6){
			ispis += `<div class="col-md-4 col-sm-6 portfolio-item">
	                    <a href="#portfolioModal4" class="portfolio-link" data-toggle="modal">
	                        <div class="portfolio-hover">
	                            <div class="portfolio-hover-content">
	                                <i class="fa fa-plus fa-3x"></i>
	                            </div>
	                        </div>
	                        <img src="img/products/${proizvod.slika.src}" class="img-responsive" alt="${proizvod.slika.alt}"/>
	                    </a>
	                    <div class="portfolio-caption">
	                        <h4>${proizvod.naziv}</h4>
	                        <p class="text-muted">Cena: ${proizvod.cena} din</p>
	                    </div>
	                </div>`
		}
		br++
	}
		document.querySelector("#portfolio .container .row").innerHTML += ispis;

}


// slajder

function dohvatanjeSlajder () {
	$.ajax({
		method: "get",
		url: "json/slajder.json",
		dateType: "json",
		success: function(slajder){
			// console.log(slajder)
			ispisSlajder(slajder)
		},
		error: function(err) {
			console.log(err);
		}
	});
}


function ispisSlajder (slajder) {
	let ispis = ''
	slajder.forEach( function(el) {
		if(el.slika.alt == "slajder1")
			ispis += `<img src="img/slider/${el.slika.src}" alt="${el.slika.alt}" class="prikazi" />`
		else
			ispis += `<img src="img/slider/${el.slika.src}" alt="slajder1"/>`
	});

	$("#slajderNovi").html(ispis)
}


