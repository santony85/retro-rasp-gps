var piWifi = require('pi-wifi');
 
piWifi.connect('ESP32AP', 'Santony85', function(err) {
  if (err) {
	return console.error(err);
  }
  else{
	console.log('Successful connection!');  
  }
  
});

/*piWifi.scan(function(err, networks) {
	  if (err) {
		return console.error(err.message);
	  }
	  console.log(networks);
	});*/