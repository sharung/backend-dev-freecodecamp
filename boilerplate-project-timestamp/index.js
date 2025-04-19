// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

// unix date
app.get("/api/:date?",(req,res) => {
  const date_string = req.params.date;
  // const current_date = new Date();
  let date;

  if (!date_string) {
    date = new Date();
  } else {
    // cek input berupa unix
    const isUnix = !isNaN(date_string)&&/^\d+$/.test(date_string);
    date = isUnix ? new Date(parseInt(date_string)) : new Date(date_string)
  }

  // validasi data kosong
  if(isNaN(date)){
      res.json({error: 'Invalid Date'});
    }

  
    res.json({unix: date.getTime(), utc: date.toUTCString()});    
  
})

// utc date
// app.get("api/2015-12-25",(req,res) => {
//   const date = new Date('2015-12-25')
//   res.json({unix: date.parse(), utc: date.toUTCString()})
// })


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
