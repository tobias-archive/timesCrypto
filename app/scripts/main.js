/*global timesData, console */

console.log(timesData.results);

var phase = document.getElementById("phase"),
	submit = document.getElementById("submit");

function tooNumberArray( value ) {
	return UT.asNumber(UT.toArray(UT.clean( value )))
}


submit.addEventListener("click", function(e) {
	e.preventDefault();
	console.log( tooNumberArray(phase.value) )
})