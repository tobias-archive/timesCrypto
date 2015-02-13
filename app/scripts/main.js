/*global timesData, console */

var phase = document.getElementById("phase"),
	submit = document.getElementById("submit"),
	radio = document.getElementsByName("operation"),
	message = document.getElementById("message"),
	textOutput = document.getElementById("textOutput");

submit.addEventListener("click", function(e) {
	e.preventDefault();
	var abstracts = timesData.results,
		phaseArray = UT.toNumberArray(phase.value),
		isEncrypt = radio[0].checked,
		num = [],
		order = [],
		output;

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

	console.log(message)

	if ( isEncrypt ) {
		output = UT.encrypt(message.value, order)
	} else {
		output = UT.decrypt(message.value, order)
	}

	textOutput.insertAdjacentHTML("beforeend", output);
	textOutput.insertAdjacentHTML("beforeend", "<p><button id=\"copy\" >Copy Me</button><p>");

	var client = new ZeroClipboard( document.getElementById("copy") );

	client.on( 'ready', function(event) {
        // console.log( 'movie is loaded' );

        client.on( 'copy', function(event) {
          event.clipboardData.setData('text/plain', output);
        });

 	});



})