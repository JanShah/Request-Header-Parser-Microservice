
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// --> 7)  Mount the Logger middleware here


// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
// app.get('/',function(req, res) {
//   res.send("Hello Express");
// });

 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

app.use(function(req, res, next) {
  console.log(req.method+" "+req.path+" - "+req.ip);
  // console.log(Object.keys(req));
  next();
})



/** 3) Serve an HTML file */
app.get('/',function(req, res) {
  res.sendFile(__dirname +'/views/index.html');
});


/** 4) Serve static assets  */
app.use(express.static(__dirname+'/public/'));
/** 5) serve JSON on a specific route */

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.use(bodyParser.urlencoded({extended: false}))


/** 6) Use the .env file to configure the app */
app.get('/json',function(req, res) {
  if(process.env.MESSAGE_STYLE==="uppercase") {
    res.json({"message":"HELLO JSON"});  
  } else {
    res.json({"message":"Hello json"});
  }
    
}); 


/** 8) Chaining middleware. A Time server */
//added middleware function, chained to run twice
app.get('/now',midTime,midTime,showTime);

function midTime(req,res,next) {
  if(!req.time)
    req.time = Date().toString();
  else
    console.log({"time":req.time});
  next();
}

function showTime(req,res) {
  res.json({"time":req.time,"really":"awesome"});
}

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo',function(req,res){
// console.log(req.params);
  // res.send("We got something");
  res.json({"echo":req.params.word});
})



/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.route('/name').get(function (req,res) {
  const firstname = req.query.first?req.query.first:"";
  const surname = req.query.last?req.query.last:"";
  res.json({"name":firstname+" "+surname});
})
  


/** 12) Get data form POST  */
app.route('/name').post(function(req,res){
  const first = req.body.first?req.body.first:"";
  const last = req.body.last?req.body.last:"";
  res.json({"name":`${first} ${last}`})
})



// Timestamp microservice
//todo

//request head parser
app.route('/api/whoami').get(function(req,res){
  res.json({"ipaddress":req.ip,"language":req.headers['accept-language'],"software":req.headers['user-agent']});
});



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
