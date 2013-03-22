
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , url = require('url')
  , child = require('child_process')
  , exec = require('child_process').exec
  , spawn = require('child_process').spawn
  , fork = require('child_process').fork
  , tty = require('tty')
  , util = require('util');

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',

  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}



io.sockets.on('connection', function (socket) {
	socket.on('Streamer', function(data) {
		var Status 			= { 'State' : data['Status'] };
		var MeetingType		= data['Meeting Type'];
		var MeetingID		= data['Meeting ID'];
		var MeetingDate		= data['Meeting Date'];
		
		// Updates the status document that the application uses to track its current streaming state.
		fs.writeFile(__dirname + '/server-state.json', JSON.stringify(Status), function(error) {
			if (error) {
				//console.log(error);
			} else {
				fs.readFile(__dirname + '/server-state.json', function(error, data) {
						if(error) {
							//console.log(error);	
						} else {
							content = JSON.parse(data);
							//console.log(content['State']);
							
							if(content['State'] == 'true') {
								var videoNode = fork(__dirname + '/module.js');
								videoNode.send({'Meeting Type' : MeetingType, 'Meeting ID' : MeetingID, 'Meeting Date' : MeetingDate});
								//console.log('{' + Message + '}');
							}
						}
				});
			}
		});
		
	});
	
	
});