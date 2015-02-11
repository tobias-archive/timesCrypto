/*global timesData, console */

console.log(timesData.results);

var phase = document.getElementById("phase"),
	submit = document.getElementById("submit"),
	radio = document.getElementsByName("operation"),
	message = document.getElementById("message");

submit.addEventListener("click", function(e) {
	e.preventDefault();

	console.log(radio[0].value)
	console.log( UT.toNumberArray(phase.value) );
	console.log( UT.encrypt(message.value, "This is my keyThis is my keyThis is my keyThis is my key" ))
})