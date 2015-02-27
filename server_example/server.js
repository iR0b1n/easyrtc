// Load required modules
var http    = require("http");              // http server core module
var express = require("express");           // web framework external module
var io      = require("socket.io");         // web socket external module
var easyrtc = require("easyrtc");           // EasyRTC external module

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();
httpApp.use(express.static(__dirname + "/static/"));

// Start Express http server on port 8080
var webServer = http.createServer(httpApp).listen(80);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level":1});

// Start EasyRTC server
var rtc = easyrtc.listen(httpApp, socketServer);

// This object will take in an array of XirSys STUN and TURN servers
var iceConfig = [];
 
request.post('https://api.xirsys.com/getIceServers', {
  form: {
    ident: "&lt; Your username (not your email) &gt;",
    secret: "&lt; Your secret API token &gt;",
    domain: "&lt; www.yourdomain.com &gt;",
    application: "default",
    room: "default",
    secure: 1
    },
  },
function (error, response, body) {
  if (!error && response.statusCode == 200) {
    // body.d.iceServers is where the array of ICE servers lives
    iceConfig = body.d.iceServers;  
    console.log(iceConfig);
    callback(null, iceConfig);
  }
});
