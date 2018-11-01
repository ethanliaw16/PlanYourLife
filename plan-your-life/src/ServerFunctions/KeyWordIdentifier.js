/*
By: Christian Bonnell
Testing class
*/

// Prompt object
var prompt = require('prompt');

var keywords = [];

var keys = [];
var keyValues = [];

var summary = '';
var location = '';

/*
Current means to get user input until front end integration is complete
*/
prompt.start();
prompt.get(['command'], function (err, result) {
	KWI(result.command);
});

/*
Currently not implemented
Will communicate with front end to grab the users input and pass it to KWI
*/
function getInput(command){
	console.log('Command: ' + command);
	KWI(command);
}

/*
Function that identifiese keywords of command and sends a JSON file to backend for API calls requests.
Done through helper method
s*/
function KWI(command){
	getKeyWords();
	command = command.toLowerCase();
	command = command.split(' ');
	extractCache(command);
	returnValueA = createJSON();
	updateEvents();
	returnValueB = createEvent();
	console.log(returnValueB);
	return returnValueA;
}

/*
Pulls the key words from the server.
Currently just populates the keywords array until back end integration is complete
*/
function getKeyWords(){
	keywords.push('remind');
	keywords.push('add');
	keywords.push('to');
	keywords.push('at');
	keywords.push('on');
}

/*
Runs through the command and stores the key words with equivalent key word values in their respective arrays
*/
function extractCache(command){

	var keyword = '';
	var values = '';

	command.forEach(function(element){
		if (keywords.includes(element)) {
			keys.push(keyword.trim());
			keyValues.push(values.trim());
			keyword = element
			values = '';
		} else {
			values = values + ' ' + element;
		}
	});
	// Pushes the last keyword and value on to the arrays
	keys.push(keyword);
	keyValues.push(values);
	console.log('keys: ' + keys);
	console.log('keyValues: ' + keyValues);
}

function createJSON(){
	var JSON = '{';
	for (i = 1; i < keys.length; i++){
		JSON = JSON + keys[i] + ' : ' + keyValues[i] + ',';
	}
	JSON = JSON + '}';
	console.log(JSON);
	return JSON;
}

function updateEvents(){
	for(i = 1; i < keys.length; i++){
		if(keys[i] === 'remind'){
			summary = keyValues[i];
		} else if(keys[i] === 'at'){
			location = keyValues[i];
		} else {
			console.log('Out of key words');
		}
	}
}

function createEvent(){
	var event = {
		'summary': summary,
		'location': location,
		'start': {
		  'date': '2018-11-1',
		},
		'end': {
		  'date': '2018-11-1',
		},
	};
	return event;
}

module.exports.KWI = KWI;
module.exports.extractCache = extractCache;
module.exports.getKeyWords = getKeyWords;
module.exports.createJSON = createJSON;