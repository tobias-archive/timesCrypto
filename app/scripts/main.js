/*global timesData, console */

console.log(timesData.results);

var phase = document.getElementById("phase"),
	submit = document.getElementById("submit");


submit.addEventListener("click", function(e) {
	e.preventDefault();
	console.log( UT.toNumberArray(phase.value) )
})