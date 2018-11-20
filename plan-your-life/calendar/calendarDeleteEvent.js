//test google calendar code

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = '../src/ServerFunctions/token.json' //'token.1.json';

var eventPath = './calendar/event.json';
var credentials = './calendar/credentials.json';

//hard coded event json
/*var event = {
  'summary': 'Work Meeting',
  'location': 'Case Western Reserve University',
  'description': 'This is a demo.',
  'start': {
    'dateTime': '2018-11-7T09:00:00-07:00',
    'timeZone': 'America/New_York',
  },
  'end': {
    'dateTime': '2018-11-7T17:00:00-07:00',
    'timeZone': 'America/New_York',
  },
};*/
var event;
fs.readFile(eventPath, (err, content) => {
  if (err) return console.log('Error loading event information file:', err);
  event = JSON.parse(content)
});

// Load client secrets from a local file.
fs.readFile(credentials, (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), deleteEvent);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

// Steps to take to make events:
// Refer to the Node.js quickstart on how to setup the environment:
// https://developers.google.com/calendar/quickstart/node
// Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
// stored credentials.



/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function deleteEvent(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  
  calendar.events.delete({
    calendarId: 'primary',
    eventId: 'ci3p85e3rahmovp9kj1nkrsc7o',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    else
      console.log('Event deleted.');
    
  });
}
  


  





