$(document).ready(function() {
	
	document.querySelector(".btn").addEventListener("click", provera);

});

if(window.location.href == "http://bicycleshop.unaux.com/prijava.html"){

function provera(){


	// definisanje promenjivih

	var imePrez = document.querySelector("#name");
	var imePrezRe = /^[A-Z][a-z]{2,25}\s([A-Z][a-z]{2,25})+$/;
	var email = document.querySelector("#email");
	var emailRe = /^(([a-z\d]+\.{1}){2}\d{1,3}\.\d{2}@ict.edu.rs)|(([a-z\d]+\.*)+@(gmail|hotmail|yahoo)\.com)$/;


	// provara regularnim izrazima

	if(!imePrezRe.test(imePrez.value)){
		imePrez.classList.add('forma_crveno');
	}
	else{
		imePrez.classList.remove('forma_crveno');
	}
	if(!emailRe.test(email.value)){
		email.classList.add("forma_crveno");
	}
	else{
		email.classList.remove("forma_crveno");
	}


	if(imePrezRe.test(imePrez.value) == true && emailRe.test(email.value) == true){
		$("#success").html("Uspesno ste se logovali")
	}
	else{
		$("#success").html("")
	}
}

}



if(window.location.href == "http://bicycleshop.unaux.com/registracija.html"){


function provera () {

	var greska = 0
	
	var imePrez = document.querySelector("#name");
	var imePrezRe = /^[A-Z][a-z]{2,25}\s([A-Z][a-z]{2,25})+$/;
	var email = document.querySelector("#email");
	var emailRe = /^(([a-z\d]+\.{1}){2}\d{1,3}\.\d{2}@ict.edu.rs)|(([a-z\d]+\.*)+@(gmail|hotmail)\.com)$/;
	var pass = document.querySelector("#pass");
	var passRe = document.querySelector("#passRe");
	var passRi = /^[\w\d\S]{8,25}$/

	console.log(pass)

	if(!imePrezRe.test(imePrez.value)){
		imePrez.classList.add('forma_crveno');
		greska++
	}
	else{
		imePrez.classList.remove('forma_crveno');
	}
	if(!emailRe.test(email.value)){
		email.classList.add("forma_crveno");
		greska++
	}
	else{
		email.classList.remove("forma_crveno");
	}
	if(!passRi.test(pass.value)){
		pass.classList.add("forma_crveno");
		console.log('radi')
		greska++
	}
	else{
		pass.classList.remove("forma_crveno");
	}
	if(passRe.value != pass.value || passRe.value == ""){
		passRe.classList.add("forma_crveno");
		greska++
	}
	else{
		passRe.classList.remove("forma_crveno");
	}


	if(greska == 0){
		$("#success").html("Uspesno ste se registrovali")
	}
	else{
		$("#success").html("")		
	}
}


}