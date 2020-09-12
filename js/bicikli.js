$(document).ready(function() {

	dohvatanjeProizvoda()
	dohvatanjeMarki()
	dohvatanjeRamova()

	document.querySelector("#pretraga").addEventListener("keyup", filtriranjePoImenu)


	$(".sort").click(sortiranje)


	$(".donji").hide();
	$(".gornja p").toggle(function() {
		$(this).next().slideDown();
	}, function() {
		$(this).next().slideUp();
	});


	$(".gornja").hover(function() {
		$(this).css({
			cursor: 'default'
		});
	})
});




// ISPIS PROIZVODA

function dohvatanjeProizvoda () {

	$.ajax({
		method: "get",
		url: "json/bicikli.json",
		dateType: "json",
		success: function(proizvodi){
			ispisivanjeProizvoda(proizvodi);
		},
		error: function(err) {
			console.log(err);
		}
	});
}



function ispisivanjeProizvoda(proizvodi){
		var ispis = "";
		for(let proizvod of proizvodi){
			ispis += `<div class="col-md-4 col-sm-6 portfolio-item svi-proizvodi">
	                    <a href="#portfolioModal4" class="portfolio-link" data-toggle="modal">
	                        <div class="portfolio-hover ">
	                            <div class="portfolio-hover-content">
	                                <i class="fa fa-plus fa-3x"></i>
	                            </div>
	                        </div>
	                        <img src="img/products/${proizvod.slika.src}" class="img-responsive" alt="${proizvod.slika.src}"/>
	                    </a>
	                    <div class="portfolio-caption">
	                        <h4>${proizvod.naziv}</h4>
	                        <p class="text-muted">Cena: ${proizvod.cena} din</p>
	                 		<a href='#' class='dodaj-u-korpu' data-id="${proizvod.id}">Ubaci u korpu</a>
	                    </div>
	                </div>`
		}

		document.querySelector("#portfolio .container .row .col-lg-8 .row").innerHTML = ispis;


		$(".dodaj-u-korpu").click(dodajUKorpu)	
	};






// ISPIS MARKI

function dohvatanjeMarki () {
	$.ajax({
		url: 'json/marke.json',
		type: 'GET',
		dataType: 'json',
		success: function(marke){
			ispisMarki(marke)
		},
		error: function(err) {
			console.log(err);
		}
	});

}
	

function ispisMarki (marke) {
	
	let ispis = ""
	marke.forEach( function(m) {
		ispis += `
			<input type="checkbox" name="marka" class='marka' value="${m.id}"> <span>${m.naziv}</span><br/>`
	});

	document.querySelector(".marke").innerHTML = ispis

	$(".marka").click(filtriranjePoMarkama)

}



// ISPIS RAMOVA

function dohvatanjeRamova () {
	 $.ajax({
		url: 'json/bicikli.json',
		type: 'GET',
		dataType: 'json',
		success: function(bicikli){
			razlicitiRamovi(bicikli)
		},
		error: function(err) {
			console.log(err);
		}
	});
}



function razlicitiRamovi (bicikli) {
	let razliciti = []
	for (let bicikl of bicikli) {
		for (ram of bicikl.ramovi) {
			if(jedinstvenRam(razliciti, ram))
				razliciti.push(ram)
		}
	}
	
	ispisRamova(razliciti)
}



function jedinstvenRam (niz, ram) {
	let jedinstven = false
	if(niz.length > 0){
		let ramoviId = niz.map(r => r.id)
		if(ramoviId.indexOf(ram.id) == -1)
			jedinstven = true
	}
	else
		jedinstven = true
	return jedinstven
}


function ispisRamova (ramovi) {
	let ispis = ""
	ramovi.forEach( function(r) {
		ispis += `
			<input type="checkbox" name="ram" class="ram" value="${r.id}"> <span>${r.vrednost}</span><br/>
		`
	});

	$("#ramovi").html(ispis)

	$(".ram").click(filtriranjeRam)
}




// FILTRIRANJE RAMOVA


function filtriranjeRam () {
	let cekirani = []
	let sviCb = document.getElementsByName("ram")
	// console.log(sviCb)
	for (cb of sviCb) {
		if(cb.checked)
			cekirani.push(cb)
	}
	cekirani = cekirani.map(c => parseInt(c.value))
	console.log(cekirani)

	$.ajax({
		url: 'json/bicikli.json',
		type: 'GET',
		dataType: 'json',
		success: function(bicikli){
			// filtriranjRamaUslov(bicikli, cekirani)
			if(cekirani.length > 0)
				bicikli = filtriranjRamaUslov(bicikli, cekirani)
			console.log(bicikli)
			ispisivanjeProizvoda(bicikli)
		},
		error: function(err) {
			console.log(err);
		}
	});

}



function filtriranjRamaUslov (bicikli, cekirani) {

	 bicikli = bicikli.filter(b => {
			let postoji = true
			ramoviId = b.ramovi.map(r => r.id)
			// console.log(ramoviId)
			for (let value of cekirani) {
				if(ramoviId.indexOf(value) == -1){
					postoji = false
					break
				}
			}
			return postoji
		})

	 console.log(bicikli)
	 return bicikli
}




// FILTRIRANJE PO IMENU

function filtriranjePoImenu () {
	searchbox = document.querySelector("#pretraga");
	filtriraniPoImenu = [];

	$.ajax({
		url: 'json/bicikli.json',
		type: 'GET',
		dataType: 'json',
		success: function(proizvodi){
			const filtriraniPoImenu = proizvodi.filter(proizvod => {
	          if (proizvod.naziv.toLowerCase().indexOf(searchbox.value.toLowerCase()) !== -1) 
	            return true;          
	      });
			ispisivanjeProizvoda(filtriraniPoImenu);	
		},
		error: function(err) {
			console.log(err);
		}
	});
}



// FILTRIRANJE PO MARKAMA


function filtriranjePoMarkama () {

	var cbMarke = document.getElementsByName("marka")
	// console.log(cbMarke)
	let cekirani = []

	// cbMarke.forEach( function(cb) {
	// 	if(cb.checked){
	// 		let idMarke = cb.value
	// 		console.log(idMarke)
	// 	}
	// });

	cbMarke.forEach( function(cb) {
		if(cb.checked)
			cekirani.push(cb)
	});
	// console.log(cekirani)

	let filtrirani = []

	$.ajax({
		url: 'json/bicikli.json',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			// console.log(data)
			filtrirani = data.filter(function (b) {
				return cekirani.some(function (cb) {
					return b.idMarke == cb.value
				})
			})
			if(filtrirani.length == 0)
				ispisivanjeProizvoda(data)			
			else
			ispisivanjeProizvoda(filtrirani)
		},
		error: function(err) {
			console.log(err);
		}
	});
}







function sortiranje () {

	let tip = $(this).data("tip")
	let red = $(this).data("redosled")

	$.ajax({
		url: 'json/bicikli.json',
		type: 'GET',
		dataType: 'json',
		success: function(proizvodi){
			if(tip == "cena"){
				if(red == "asc"){
					proizvodi.sort(function (a, b) {
						if(a.cena > b.cena)
							return 1
						else if(a.cena < b.cena)
							return -1
						else
							return 0
					})
				}
				else{
					proizvodi.sort(function (a, b) {
						if(a.cena > b.cena)
							return -1
						else if(a.cena < b.cena)
							return 1
						else
							return 0
					})
				}
			}
			else{
				if(red == "asc"){
					proizvodi.sort(function (a, b) {
						if(a.naziv > b.naziv)
							return 1
						else if(a.naziv < b.naziv)
							return -1
						else
							return 0
					})
				}
				else{
					proizvodi.sort(function (a, b) {
						if(a.naziv > b.naziv)
							return -1
						else if(a.naziv < b.naziv)
							return 1
						else
							return 0
					})
				}
			}

			ispisivanjeProizvoda(proizvodi)

		},

		error: function(err) {
			console.log(err);
		}
	});

	
}




// KORPA


function proizvodiIzLocal () {
    return JSON.parse(localStorage.getItem("proizvodi")); 
}


function dodajUKorpu (e) {
	e.preventDefault()

	let id = $(this).data("id"); // id proizvoda
	console.log(id)

	let proizvod = proizvodiIzLocal();

	if(proizvod){
		if(daLiPostojiUNizu()){
			uvecajKolicinu()
		}
		else{
			dodavanjeNovogProizvoda();
		}
	}
	else{
		dodavanjePrvogProizvoda();
	}



	function daLiPostojiUNizu () {
		return proizvod.filter(x => x.idProizvod == id).length // vraca 1 ili 0
	}


	function dodavanjeNovogProizvoda () {
		var proizvodi = proizvodiIzLocal();

		proizvodi.push({
			idProizvod: id,
			kolicina: 1
		})

		localStorage.setItem("proizvodi", JSON.stringify(proizvodi));
	}

	function uvecajKolicinu () {
		var proizvodi = proizvodiIzLocal();
		console.log(proizvodi)

		for (let proizvod of proizvodi) {
			console.log(proizvod.idProizvod)
			if(proizvod.idProizvod == id){
				proizvod.kolicina++;
				break;
			}
		}

		localStorage.setItem("proizvodi", JSON.stringify(proizvodi));
	}


	function dodavanjePrvogProizvoda () {
        var proizvodi = [];

        proizvodi[0] = {
            idProizvod: id,
            kolicina: 1
        };

        localStorage.setItem("proizvodi", JSON.stringify(proizvodi));
    }
}