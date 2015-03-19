/*global UT, ZeroClipboard */
/* jshint -W097 */

'use strict';

var submit = document.getElementById('submit'),
	phase = document.getElementById('phase');

var toNumberArray = function toNumberArray( array ) {
	var str = 'abcdefghijklmnopqrstuvwxyz',
		alphaArray = str.toUpperCase().split('');

	var plainAsNumber = [];

	for (var i = 0; i < array.length; i++) {
		for (var j=0; j < alphaArray.length; j++) {
			if (array[i] === alphaArray[j]) {
				plainAsNumber.push(j);
			}
		}
	}

	return plainAsNumber;
};

var createParams = function( opts ) {
	var uri = '';

	for (var key in opts) {
		uri += encodeURIComponent(key) + '=' + encodeURIComponent(opts[key]) + '&';
	}

	uri = '?'+uri;

	return uri;
};

var getData = function(){

	// Establishing a promise in return
	return new Promise(function(resolve, reject) {

	// Instantiates the XMLHttpRequest
		var client = new XMLHttpRequest();
		var url = 'https://radiant-bayou-8874.herokuapp.com/proxy';
		var opts = {
				url: 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json',
				source: 'nytimes'
			};
		var uri = createParams(opts);

		client.open('GET', url+uri, true);
		
		client.onreadystatechange = function(){
			if(this.readyState === 4){
				if(this.status === 200){
					// Performs the function 'resolve' the case this.status is equal to 200
					resolve(JSON.parse(this.response));
				} else{
					// Performs the function 'reject' the case is different this.status 200
					reject({'error':this.statusText});
				}
			}
		};

		client.send();
	});
};

var generateKey = function generateKey( data ) {
	var abstracts = data.results,
		phaseArray = toNumberArray(phase.value),
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
	var copy = document.getElementById('copy'),
		client = new ZeroClipboard( copy ),
		copyBack;

    client.on( 'copy', function(event) {
      event.clipboardData.setData('text/plain', output);
 	});

	client.on( 'aftercopy', function() {
		copy.innerHTML = 'Copied!';

	copyBack = window.setTimeout( function() {
			copy.innerHTML = 'Copy';
		}, 3000);
	});

};

submit.addEventListener('click', function(e) {
	e.preventDefault();
	var radio = document.getElementsByName('operation'),
		message = document.getElementById('message'),
		textOutput = document.getElementById('textOutput'),
		oput = document.getElementById('oput'),
		isEncrypt = radio[0].checked,
		output, key;

	getData().then( function( data ) {

		data = JSON.parse(data);

		key = generateKey( data );

		output = isEncrypt  ?  UT.encrypt(message.value, key) : UT.decrypt(message.value, key);

		message.value = '';
		phase.value = '';
		oput.innerHTML = '';


		textOutput.classList.remove('hide');

		oput.insertAdjacentHTML('beforeend', output);
		makeCopyBtn( output );
	});

});
