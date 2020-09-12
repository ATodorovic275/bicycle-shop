$(document).ready(function() {
	var proizvodi = JSON.parse(localStorage.getItem("proizvodi"));

	console.log(proizvodi)
	if(proizvodi == null){
    praznaKorpa()
  	}
	else if(proizvodi.length > 0){
		prikazProizvoda()
	}
	else if(proizvodi.length == 0){
		praznaKorpa()
	}

});



function prikazProizvoda () {

	var proizvodi = JSON.parse(localStorage.getItem("proizvodi")); 
	// console.log(proizvodi)


	$.ajax({
	 	url: "json/bicikli.json",
	 	success: function(data){
	 		// console.log(data);
	 		data = data.filter(p => {
	 			for (let pro of proizvodi) 
	 			{
	 				if(p.id == pro.idProizvod){
	 					p.kolicina = pro.kolicina
	 					return true;
	 				}
	 			}

	 		});
	 		// console.log(data);
			kreirajTabelu(data);

	 	},
	 	error: function(err){
	 		console.log(err);
	 	}

	})
}


function praznaKorpa () {

	var ispis = `<h3>Nemate proizvode u vasoj korpi</h3>`

	$("#portfolio .container .row .col-lg-9").html(ispis);
}

function kreirajTabelu (proizvodi) {
	var ispis = "";
	ispis += `
		<table class="timetable_sub" border='1px solid #fec503'>
				<thead>
					<tr>
						<th>Slika</th>
						<th>Naziv</th>
						<th>Cena</th>
						<th>Kolicina</th>	
						<th>Obrisi</th>
					</tr>
				</thead>
				<tbody>
				`
		for (pro of proizvodi) {
			ispis += ispisRedova(pro);
		}
					
		ispis += `
			</tbody>
			</table>
		`
		document.querySelector("#portfolio .container .row .col-lg-9").innerHTML = ispis;

}


function ispisRedova (pro) {
	return `
		<tr>
			<td>
				<img src="img/shop/${pro.slikaShop.src}" alt="${pro.slikaShop.alt}" class="img-responsive"/>				
			</td>
			<td>${pro.naziv}</td>
			<td>${pro.cena * pro.kolicina}</td>
			<td>${pro.kolicina}</td>
			<td>
				<div>
					<div><button onclick='izbrisiIzKorpe(${pro.id})'>Obrisi</button> </div>
				</div>
			</td>
		</tr>`			
}


function izbrisiIzKorpe(id) {
    let proizvodi = JSON.parse(localStorage.getItem("proizvodi"));
    let filtrirani = proizvodi.filter(p => p.idProizvod != id);

    localStorage.setItem("proizvodi", JSON.stringify(filtrirani));
    console.log(proizvodi.length)

    if(proizvodi.length == 1)
    	praznaKorpa()
    else   
   		prikazProizvoda();
}