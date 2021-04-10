var express = require('express');
var ejs = require('ejs');
var app = express();
var http = require('http');
var path = require('path');

const { exec } = require("child_process");



var http = require( "http" ).createServer( app );
var io = require( "socket.io" )( http , {
	  allowEIO3: true // false by default
	});

app.set('view engine', 'ejs'); 
app.use(express.static(path.join(__dirname, 'public')));
var piWifi = require('pi-wifi');

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort("/dev/serial0", { baudRate: 9600 }) ///dev/serial0 9600

const parser = new Readline('\r\n') //'\r\n'
port.pipe(parser)



var GPS = require('gps');
var gps = new GPS;

gps.on('data', function(data) {
  //console.log(gps.state);
  io.emit('gps', gps.state);
});

parser.on('data', function(data){
	//console.log(data.indexOf("$GPRMC"))
	//if(data.indexOf("$GPRMC")==0)
	  {
	  //console.log(data)	
	  }
	//console.log("trame")
	gps.update(data);
	/*var res = data.split(",");
	var snd={
		lat:res[0],
		lon:res[1]
	}
	io.emit('gps', snd);*/
	//console.log(res[0]);
	//console.log(res[1]);
})


app.get('/', function (req, res) {

	res.render('index', {title: 'index'});

});

app.get('/map', function (req, res) {

	res.render('map', {title: 'index'});

});

app.get('/wifi', function (req, res) {

	res.render('wifi', {title: 'index'});

});

app.get('/setwifi/:ap', function (req, res) {
	var ap = req.params.ap.toString();
	// Connect to a network
	piWifi.connect(ap, 'Santony85', function(err) {
		  if (err) {
			return console.error(err.message);
		  }
		  console.log('Successful connection!');
		  res.send("ok");	
		});
	/*wifi.connect({ ssid: ap, password: 'Santony85' }, error => {
	  if (error) {
		console.log(error);
		res.send("error");
	  }
	  else{
	    console.log('Connected');
	    res.send("ok");	  
	  }*/

	//});
	

});

io.on('connection', (socket) => {
	//console.log('a user connected');
	socket.on('disconnect', () => {
	  //  console.log('user disconnected');
	});
});


/******* end of implementation *******/
http.listen(1001);
console.log('Listening on port 1001...');

