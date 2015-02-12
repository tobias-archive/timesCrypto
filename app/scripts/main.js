/*global timesData, console */

var phase = document.getElementById("phase"),
	submit = document.getElementById("submit"),
	radio = document.getElementsByName("operation"),
	message = document.getElementById("message");

submit.addEventListener("click", function(e) {
	e.preventDefault();
	var abstracts = timesData.results,
		phaseArray = UT.toNumberArray(phase.value),
		isDecrypt = radio[0].checked,
		num = [],
		order = [],
		encrypt;

	if ( isDecrypt ) {
		for (var i = 0; i < phaseArray.length; i++) {
			if ( phaseArray[i] > abstracts.length ) {
				num.push( phaseArray[i] - abstracts.length )
			} else {
				num.push( phaseArray[i] )
			}
		}

		for (var j = 0; j < num.length; j++) {
			order.push( abstracts[num[j]].abstract );
		}

		order = order.join();

		encrypt = UT.encrypt(message.value, order)
	}

	console.log(encrypt)

})