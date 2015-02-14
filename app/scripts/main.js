/*global UT, ZeroClipboard, timesData, console */

'use strict';

var submit = document.getElementById('submit'),
	phase = document.getElementById('phase');

var generateKey = function generateKey() {
	var abstracts = timesData.results,
		phaseArray = UT.toNumberArray(phase.value),
		order = [],
		num = [],
		keyOrder;

	//Key streams the passphase to the number of abstracts
	for (var i = 0; i < phaseArray.length; i++) {
		if ( phaseArray[i] > abstracts.length ) {
			num.push( phaseArray[i] - abstracts.length );
		} else {
			num.push( phaseArray[i] );
		}
	}

	//orders the abstracts using the psspshase as a key
	for (var j = 0; j < num.length; j++) {
		order.push( abstracts[num[j]].abstract );
	}

	keyOrder = order.join();

	return keyOrder;
};

var makeCopyBtn = function makeCopyBtn( output ) {
	var client = new ZeroClipboard( document.getElementById('copy') );

    client.on( 'copy', function(event) {
      event.clipboardData.setData('text/plain', output);
 	});
};

submit.addEventListener('click', function(e) {
	e.preventDefault();
	var radio = document.getElementsByName('operation'),
		message = document.getElementById('message'),
		textOutput = document.getElementById('textOutput'),
		isEncrypt = radio[0].checked,
		output, key;

	key = generateKey();

	output = isEncrypt  ?  UT.encrypt(message.value, key) : UT.decrypt(message.value, key);

	textOutput.insertAdjacentHTML('beforeend','<p id="oput">'+output + '</p><p><button id="copy" class="btn btn-success">Copy Me</button><p>');
	makeCopyBtn( output );

	message.value = '';
	phase.value = '';

});
