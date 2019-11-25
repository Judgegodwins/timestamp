// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:date', (req, res, done) => {
  var dateString = req.params.date;
  
  if(/\d{5}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    
    let date= new Date(dateInt);
    
    res.json({unix: dateInt, UTC: date.toUTCString()});
  }
  let dateObject = new Date(dateString);
  
  if(dateObject.toString() =='Invalid Date') {
    res.json({'error': 'Invalid Date'})
  } else {
    
    res.json({ unix: new Date(dateString).valueOf(), UTC: new Date(dateString).toUTCString() });
    
  }
  
})
function sendJson(a, b, c, cb) {
  var time, unixTime
  try {
    time = new Date(a, b, c).toUTCString();
    unixTime = new Date(a, b, c).getTime();
  }
  catch(err) {
    cb(err, null)
    return
  }
  cb(null, [unixTime, time])
}
app.get('/api/timestamp/', (req, res) => {
  res.json({ unix: new Date().getTime(), UTC: new Date().toUTCString() })
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
}); 