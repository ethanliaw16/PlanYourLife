/*
By: Christian Bonnell
*/

// Prompt object
// var prompt = require('prompt');
var date = require('date');

var keywords = [];

var keys = [];
var keyValues = [];

// The following variables hold the values of the JSON file
var add = 'false';
var download = 'false';
var remind = 'false';
var remove = 'false';
// Used with Tasks
var destination = '';
var item = '';
// Used with Calendar
var time = '';
var where = '';
var event = '';
var duration = '';

/*
Current means to get user input until front end integration is complete

prompt.start();
prompt.get(['command'], function (err, result) {
	KWI(result.command);
});

// Following 

/*
Currently not implemented
Will communicate with front end to grab the users input and pass it to KWI
*/
function getInput(command){
	console.log('Command: ' + command);
	KWI(command);
}

/*
Function sets the fields to a specific value for testing purposes.
*/	
function resetFields(){
	keywords = [];
	keys = [];
	keyValues = [];
	add = 'false';
	download = 'false';
	remind = 'false';
	remove = 'false';
	destination = '';
	item = '';
	time = '';
	where = '';
	event = '';
	duration = '';
}

/*
Function that identifiese keywords of command and sends a JSON file to backend for API calls requests.
Done through helper method
s*/
function KWI(command){
	resetFields();
	getKeyWords();
	command = command.toLowerCase();
	command = command.split(' ');
	extractCache(command);
	updateJSON();
	userEvent = createEvent();
	if(
		add === 'false' && 
		download === 'false' && 
		remind === 'false' && 
		remove === 'false'){
		throw new Error("Input does not contain the add, download, remind or false key words.");
	} else if(
		destination === '' && 
		item === '' && 
		time === '' && 
		where === '' && 
		event === '' && 
		duration === ''){
		throw new Error("No content provided(i.e. Destination, time, location, etc.");
	}
	// console.log(userEvent);
	return userEvent;
}

/*
Pulls the key words from the server.
Currently just populates the keywords array until back end integration is complete
*/
function getKeyWords(){
	keywords.push('add');
	keywords.push('download');
	keywords.push('remind me to');
	keywords.push('remind');
	keywords.push('remove');
	keywords.push('to');
	keywords.push('at');
	keywords.push('from');
	keywords.push('for');
	keywords.push('on');
	keywords.push('me');
	keywords.push('event');
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
	keys.push(keyword.trim());
	keyValues.push(values.trim());
	// console.log('keys: ' + keys);
	// console.log('keyValues: ' + keyValues);
}

// Goes through the extracted cache and assigns the JSON values the correct values
function updateJSON(){

	// console.log(keys);
	switch(keys[1]){
		case 'add':
			if(keys[2] != 'event'){
				addRequest();
				break;
			}
		case 'remind':
			remindRequest();
			break;
		default:
			break;
	}

}

/*
Function that parses an 'add' request to populate the corresponding JSON
*/
function addRequest(){

	for(i = 1; i < keys.length; i++){
		if(keys[i] === 'add'){
			add = 'true';
			item = keyValues[i];
		} else if(keys[i] === 'to'){
			destination = keyValues[i];
		} else {
			// console.log('Out of key words');
		}
	}
}

/*
Function that parses a 'remind' request to populate the corresponding JSON
*/
function remindRequest(){

	foundTo = false; //boolean to determine if the first 'to' indicating the request is a remind request has been found

	for(i = 1; i < keys.length; i++){
		// if(keys[i] === 'remind'){ 
		// 	remind = 'true';
		// 	event = keyValues[i];
		// } else 
		if(keys[i] === 'to' || keys[i] === 'event' && !foundTo){ //only treats 'to' as a keyword once when parsing the string
			remind = 'true';
			foundTo = true;
			event = keyValues[i];
		} else if(keys[i] === 'on'){
			time = convertDay(keyValues[i]);
		} else if(keys[i] === 'at'){
			time = keyValues[i];
		} else if(keys[i] === 'from'){
			where = keyValues[i];
		} else if(keys[i] === 'for'){
			duration = keyValues[i];
		} else {
			// console.log('Out of key words');
		}
	}
}

function convertDay(dateTime){
	var date = new Date();
	if(dateTime === 'monday'){
		return getNextDayOfWeek(date, 1);
	} else if (dateTime === 'tuesday'){
		return getNextDayOfWeek(date, 2);
	} else if (dateTime === 'wednesday'){
		return getNextDayOfWeek(date, 3);
	} else if (dateTime === 'thursday'){
		return getNextDayOfWeek(date, 4);
	} else if (dateTime === 'friday'){
		return getNextDayOfWeek(date, 5);
	} else if (dateTime === 'saturday'){
		return getNextDayOfWeek(date, 6);
	} else if (dateTime === 'sunday'){
		return getNextDayOfWeek(date, 7);
	} else {
		return dateTime;
	}
}

function getNextDayOfWeek(date, dayOfWeek) {

    var resultDate = new Date(date.getTime());

    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);

    return resultDate;
}

function createEvent(){
	var newEvent = {
		'add': add,
		'download': download,
		'remind': remind,
		'remove': remove,
		'destination': destination,
		'item': item,
		'time': time,
		'where': where,
		'event': event,
		'duration': duration,
	};
	// console.log(newEvent);
	return newEvent;
}

/*
Function that identifiese keywords of command and sends a JSON file to backend for API calls requests.
Done through helper method
s*/
function KWI(command){
	resetFields();
	getKeyWords();
	command = command.toLowerCase();
	command = command.split(' ');
	extractCache(command);
	updateJSON();
	userEvent = createEvent();
	if(add === 'false' && download === 'false' && remind === 'false' && remove === 'false'){
		throw("Input does not contain the add, download, remind or false key words.");
	}
	// console.log(userEvent);
	return userEvent;
}

module.exports.KWI = KWI;
module.exports.getNextDayOfWeek = getNextDayOfWeek;
