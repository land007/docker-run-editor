// initialize your app
// and ...
var config = require('./server/app').config
var server = require('./server/app').server

server.listen({ host: config.listen.ip, port: config.listen.port
})

console.log('WebSSH2 service listening on ' + config.listen.ip + ':' + config.listen.port)

server.on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    config.listen.port++
    console.warn('WebSSH2 Address in use, retrying on port ' + config.listen.port)
    setTimeout(function () {
      server.listen(config.listen.port)
    }, 250)
  } else {
    console.log('WebSSH2 server.listen ERROR: ' + err.code)
  }
})
if(typeof nw != 'undefined') {
	nw.Window.open('http://127.0.0.1:2222/ssh/host/192.168.0.96', {}, function(win) {});
//	nw.Window.open('http://127.0.0.1:2222/ssh/host/192.168.1.141', {}, function(win) {});
//	nw.Window.open('http://127.0.0.1:2222/ssh/host/192.168.0.225', {}, function(win) {});
}