'use strict'
/* jshint esversion: 6, asi: true, node: true */
// socket.js

// private
const debug = require('debug')
const debugWebSSH2 = require('debug')('WebSSH2')
const SSH = require('ssh2').Client
const net = require('net');
const onvif = require('node-onvif');
process.on('uncaughtException', function (err) {
    console.log(err);
});
const os = require('os');
const platform = os.platform();
console.log(platform);
const exec = require('child_process').execFile;

//启动xming
const xrun =function(){
	console.log("xrun() start");
	if(platform == 'win32') {
		exec(__dirname + '\\Xming\\xming.exe', [':0', '-clipboard', '-multiwindow'], function(err, data) { 
			console.log(err)
			console.log(data.toString());                       
		});
	}
};
xrun();

function scan(host, ports, callback) {
    let count = ports.length;
    let result = [];
    console.time(host + ' port scan time');
    for (let i = 0; i <= ports.length; i++) {
        var item = net.connect({
                host: host,
                port: ports[i]
            },
            function(port) {
                return function() {
                    result.push(port);
                    this.destroy();
                };
            }(ports[i])
        );
        item.on('error', function(err) {
            if (err.errno == 'ECONNREFUSED') {
                this.destroy();
            }
        });
        item.on('close', function() {
            if (!count--) {
//                console.timeEnd(host + ' port scan time');
                callback(result);
            }
        });
    }
}
// var fs = require('fs')
// var hostkeys = JSON.parse(fs.readFileSync('./hostkeyhashes.json', 'utf8'))
var termCols, termRows
var menuData = '<a id="logBtn"><i class="fas fa-clipboard fa-fw"></i> Start Log</a>' +
  '<a id="downloadLogBtn"><i class="fas fa-download fa-fw"></i> Download Log</a>'
//var fileNames = [
//	'docker-ce_18.06.1_ce_3-0_ubuntu_amd64.deb',
//	'eyecool-cpp-grpc_v10_2019.01.24.tar',
//	'eyecool-golang-grpc_v9_2019.01.24.tar',
//	'eyecool-mysql_5.7.22.tar',
//	'eyecool-mysql_data.tar.gz',
//	'codemeter_6.70.3152.500_amd64.deb.zip',
//	'LicenseRequest.WibuCmRaC',
//	'LicenseResponse.WibuCmRaU',
//];

// public
module.exports = function socket (socket) {
  // if websocket connection arrives without an express session, kill it
  if (!socket.request.session) {
    socket.emit('401 UNAUTHORIZED')
    debugWebSSH2('SOCKET: No Express Session / REJECTED')
    socket.disconnect(true)
    return
  }
  var conn = new SSH()
  socket.on('geometry', function socketOnGeometry (cols, rows) {
    termCols = cols
    termRows = rows
  })
  conn.on('banner', function connOnBanner (data) {
    // need to convert to cr/lf for proper formatting
    data = data.replace(/\r?\n/g, '\r\n')
    socket.emit('data', data.toString('utf-8'))
  })
  var update_file = function(socket, method, index, fileName) {
	  console.log('===============================================================================');
	  console.log('fileName = ' + fileName);
//	  socket.emit('data', data.toString('utf-8'))
	  conn.sftp(function(err, sftp) {
        if (err) throw err;
        var fs = require("fs"); // Use node filesystem
//        var readStream = fs.createReadStream( "run.sh" );
//        var filePath = "/Volumes/DISK/testFaceId2018.07.18.tar.gz";
//        var filePath = "/Volumes/DISK/软件/RDC_2.1.1_ALL.dmg";
//        var fileName = 'xshell.exe';
        var formFilePath = null;
        var toFilePath = null;
		if(fileName.indexOf('\\') > 0) {
			formFilePath = process.cwd() + '\\' + fileName;
			toFilePath = fileName.substring(fileName.lastIndexOf('\\') + 1);
		} else {
			formFilePath = __dirname + '/../upload/' + fileName;
			toFilePath = fileName;
		}
        console.log('formFilePath = ' + formFilePath);
        console.log('toFilePath = ' + toFilePath);
//        var formFilePath = 'G:\\xshell.exe';
//        var toFilePath = 'path-to-remote-file.txt';
        var readStream = fs.createReadStream(formFilePath);
        var writeStream = sftp.createWriteStream(toFilePath);
        writeStream.on('close',function () {
//            console.log( "- file transferred succesfully" );
        });
        writeStream.on('end', function () {
            console.log( "sftp connection closed" );
            conn.close();
        });
        var stat = fs.statSync(formFilePath);
        var totalSize = stat.size;//文件总大小
        var passedLength = 0;//一次传输数据大小
        var lastSize = 0;//上次同步文件大小
        var startTime = Date.now();//开始时间
        var onTime = startTime;
        var show = function() {
        	var progress = passedLength / totalSize;//进度
            var percent = Math.ceil((passedLength / totalSize) * 100 * 10) / 10;//进度
//            var size = Math.ceil(passedLength / 1000000);//已经传输大小
            var ksize = Math.ceil(passedLength / 1024);//已经传输大小
            var msize = Math.ceil(ksize / 1024 * 100) / 100;//已经传输大小
            var now = Date.now();
//            var kdiff = Math.ceil((ksize - lastSize)/((now - onTime)/1000));
            var mdiff = Math.ceil((ksize - lastSize) / 1024 / ((now - onTime) / 1000) * 100) / 100;
            onTime = now;
            lastSize = ksize;
            socket.emit('play_progress', {index: index, method: 'update', progress: progress});
//            var content = '已完成' + msize + 'MB, ' + percent + '%, 速度：' + kdiff + 'KB/s';
            var content = fileName + '	进度' + percent + '%	已完成' + msize + 'MB,	速度：' + mdiff + 'MB/s';
//            process.stdout.clearLine();
//            process.stdout.cursorTo(0);
//            process.stdout.write();
            console.log(content);
            if (passedLength < totalSize) {
                setTimeout(show, 200);
            } else {
                var endTime = Date.now();
//                console.log();
                console.log('共用时：' + (endTime - startTime) / 1000 + '秒。');
            }
        };
    // initiate transfer of file
//    readStream.on('data', (chunk) =>{process.stdout.write('.')}).pipe( writeStream ).on('finish', () => console.log('Done'));
    readStream.on('data', (chunk) =>{passedLength += chunk.length;}).pipe( writeStream );//.on('finish', () => console.log('Done'));
    setTimeout(show, 200);
});
	  
//	  var progress = 0
//		var interval = setInterval( function() {
//			progress = Math.min( progress + Math.random() * 0.1, 1 )
////			instance._setProgress(progress)
////			socket.emit('data', '' + progress)
//			socket.emit('progress', {index: data, progress: progress})
//			if( progress === 1 ) {
////				instance._stop(1)
//				clearInterval( interval )
//			}
//		}, 200);
  };

  conn.on('ready', function connOnReady () {
    console.log('WebSSH2 Login: user=' + socket.request.session.username + ' from=' + socket.handshake.address + ' host=' + socket.request.session.ssh.host + ' port=' + socket.request.session.ssh.port + ' sessionID=' + socket.request.sessionID + '/' + socket.id + ' mrhsession=' + socket.request.session.ssh.mrhsession + ' allowreplay=' + socket.request.session.ssh.allowreplay + ' term=' + socket.request.session.ssh.term)
    socket.emit('menu', menuData)
    socket.emit('allowreauth', socket.request.session.ssh.allowreauth)
    socket.emit('setTerminalOpts', socket.request.session.ssh.terminal)
    socket.emit('title', 'ssh://' + socket.request.session.ssh.host)
    if (socket.request.session.ssh.header.background) socket.emit('headerBackground', socket.request.session.ssh.header.background)
    if (socket.request.session.ssh.header.name) socket.emit('header', socket.request.session.ssh.header.name)
    socket.emit('footer', 'ssh://' + socket.request.session.username + '@' + socket.request.session.ssh.host + ':' + socket.request.session.ssh.port)
    socket.emit('status', '已建立SSH连接')
    socket.emit('statusBackground', 'green')
    socket.emit('allowreplay', socket.request.session.ssh.allowreplay)
    conn.shell({
      term: socket.request.session.ssh.term,
      cols: termCols,
      rows: termRows
    }, { x11: socket.request.session.x11forward !== undefined }, function connShell (err, stream) {
      if (err) {
        SSHerror('EXEC ERROR' + err)
        conn.end()
        return
      }
      // poc to log commands from client
      if (socket.request.session.ssh.serverlog.client) var dataBuffer
      //TOCO
      let socketok = false;
      let cmds = socket.request.session.cmds;
      if(cmds === undefined || cmds.length == 0) {
    	  socketok = true;
      }
      socket.on('data', function socketOnData (data) {
//    	console.log(dataBuffer);
//    	if(data.startsWith('download ') && data.length > 'download '.length) {
//    		var download = data.substring('download '.length, data.length);
//    		return;
//    	}
    	  if(!socketok) {
    		  return;
    	  }
    	  try {
    	      stream.write(data);
		  } catch (e) {
		  }
        // poc to log commands from client
        if (socket.request.session.ssh.serverlog.client) {
          if (data === '\r') {
            console.log('serverlog.client: ' + socket.request.session.id + '/' + socket.id + ' host: ' + socket.request.session.ssh.host + ' command: ' + dataBuffer)
            dataBuffer = undefined
          } else {
            dataBuffer = (dataBuffer) ? dataBuffer + data : data
          }
        }
      })
      socket.on('progress_method', function(data) {
    	  console.log('progress_method:' + JSON.stringify(data))
    	  var method = data.method;
    	  var index = data.index;
    	  var value = data.value;
    	  switch (method) {
			case 'download':
				conn.sftp(function(err, sftp) {
		  	        if (err) throw err;
//		  	        var fileName = 'LicenseRequest.WibuCmRaC';
			        var fileName = value;
//		  	        var moveFrom = '/home/land007/' + fileName;
		  	        var moveFrom = fileName;
		  	        console.log('moveFrom ' + moveFrom);
		  	        var moveTo = __dirname + '/../client/public/download/' + fileName;
		  	        console.log('moveTo ' + moveTo);
		  	        sftp.fastGet(moveFrom, moveTo , {}, function(downloadError){
		  	            if(downloadError) throw downloadError;
			            socket.emit('play_progress', {index: index, progress: 1, method: 'download', fileName: fileName});
		  	            console.log("Succesfully uploaded");
		  	        });
		          });
				break;
			case 'search_camera':
		    	  onvif.startProbe().then((device_info_list) => {
		    	    console.log(device_info_list.length + ' devices were found.');
		    	    socket.emit('play_progress', {index: index, progress: 1, method: 'search_camera', device_info_list: device_info_list});
		    	    device_info_list.forEach((info) => {
//		    	  	    console.log(info);
		    	      console.log('- ' + info.urn);
		    	      console.log('  - ' + info.name);
		    	      console.log('  - ' + info.xaddrs[0]);
		    	    });
		    	  }).catch((error) => {
		    	    console.error(error);
		    	  });
				break;
			case 'search_net':
				var ip_segment = value;
		    	  var hosts = [];
		    	for(let j = 0; j < 255; j++) {
//		    		hosts[hosts.length] = '192.168.0.' + j;
//		    		hosts[hosts.length] = '192.168.1.' + j;
//		    		hosts[hosts.length] = '10.2.0.' + j;
		    		hosts[hosts.length] = ip_segment + j;
		    	}
		    	var ports = [80, 554];
		    	for(let h in hosts){
		    		let host = hosts[h];
		    		scan(host, ports, function(result) {
		    			if(result.length > 0) {//TODO 多次调用，应该加上进度功能
		    				if(result.length == ports.length) {//TODO 都有的才输出
		    					console.log('host:' + host);
		    					console.log('index:' + index);
		    					socket.emit('play_progress', {index: index, method: 'search_net', progress: 1});
		    				    for (let i = 0; i < result.length; i++) {
		    				        console.log('端口:' + result[i]);
		    				    }
		    				}
		    			}
		    		});
		    	}
				break;
			case 'update':
				var fileName = value;
				update_file(socket, method, index, fileName);
				break;
			case 'update_file':
				var fileName = value;
				update_file(socket, method, index, fileName);
				break;
			default:
				break;
			}
      })
      socket.on('get_rtsp_url', function(data) {
    	// Create an OnvifDevice object
    	  let device = new onvif.OnvifDevice({
    	    xaddr: data.xaddr,
    	    user : data.username,
    	    pass : data.password
    	  });
    	  device.init().then(() => {
    	    let rtsp_url = device.getUdpStreamUrl();
    	    console.log(rtsp_url);
    	    socket.emit('open_rtsp_url', {rtsp_url: rtsp_url, username: data.username, password: data.password});
    	  }).catch((error) => {
    	    console.error(error);
    	  });
      })
      socket.on('control', function socketOnControl (controlData) {
        switch (controlData) {
          case 'replayCredentials':
            if (socket.request.session.ssh.allowreplay) {
              stream.write(socket.request.session.userpassword + '\n')
            }
          /* falls through */
          default:
            console.log('controlData: ' + controlData)
        }
      })
      socket.on('resize', function socketOnResize (data) {
        stream.setWindow(data.rows, data.cols)
      })
      socket.on('disconnecting', function socketOnDisconnecting (reason) { debugWebSSH2('SOCKET DISCONNECTING: ' + reason) })
      socket.on('disconnect', function socketOnDisconnect (reason) {
        debugWebSSH2('SOCKET DISCONNECT: ' + reason)
        err = { message: reason }
        SSHerror('CLIENT SOCKET DISCONNECT', err)
        conn.end()
        // socket.request.session.destroy()
      })
      socket.on('error', function socketOnError (err) {
        SSHerror('SOCKET ERROR', err)
        conn.end()
      })
      let timeout = null;
      stream.on('data', function streamOnData (buffer) {
    	  let data = buffer.toString('utf-8');
//    	  process.stdout.write(data);
//    	  process.stdout.write(Buffer.from(data).toString('base64'));
    	  let _data = data.replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, '');
    	  process.stdout.write(_data);
    	  if (_data.endsWith('$ ') || _data.endsWith('# ') || _data.endsWith('Password: ')) {//data.endsWith('\r\n') || 
    		  timeout = setTimeout(function() {
//    			  process.stdout.write('结束');
    			  if(!socketok) {
    				  let cmd = cmds.shift();
    				  if(cmd !== undefined) {
    					  try {
    						  stream.write(cmd);
    					  } catch (e) {
    					  }
    				  } else {
        				  socketok = true;
//        				  process.stdout.write('socketok');
        			  }
    			  }
    		  }, 1000);
    	  } else {
    		  if(timeout != null){
        		  clearTimeout(timeout);
        		  timeout = null;
        	  }
    	  }
    	  socket.emit('data', data)
      })
      stream.on('close', function streamOnClose (code, signal) {
        err = { message: ((code || signal) ? (((code) ? 'CODE: ' + code : '') + ((code && signal) ? ' ' : '') + ((signal) ? 'SIGNAL: ' + signal : '')) : undefined) }
        SSHerror('STREAM CLOSE', err)
        conn.end()
      })
      stream.stderr.on('data', function streamStderrOnData (data) {
        console.log('STDERR: ' + data)
      })
    })
  })
  if(socket.request.session.x11forward) {
	  conn.on('x11', function(info, accept, reject) {
		  var xserversock = new net.Socket();
		  xserversock.on('connect', function() {
			  var xclientsock = accept();
			  xclientsock.pipe(xserversock).pipe(xclientsock);
		  });
		  let x11forwards = socket.request.session.x11forward.split(':');
		  if(x11forwards == 2) {
			  let forward_host = x11forwards[0];
			  let forward_port = parseInt(x11forwards[1]);
			  xserversock.connect(forward_port, forward_host);
		  } else {
			  // connects to localhost:0.0
			  xserversock.connect(6000, 'localhost');
		  }
	  });
  }
  conn.on('end', function connOnEnd (err) { SSHerror('CONN END BY HOST', err) })
  conn.on('close', function connOnClose (err) { SSHerror('CONN CLOSE', err) })
  conn.on('error', function connOnError (err) { SSHerror('CONN ERROR', err) })
  conn.on('keyboard-interactive', function connOnKeyboardInteractive (name, instructions, instructionsLang, prompts, finish) {
    debugWebSSH2('conn.on(\'keyboard-interactive\')')
    finish([socket.request.session.userpassword])
  })
  if (socket.request.session.username && socket.request.session.userpassword && socket.request.session.ssh) {
    // console.log('hostkeys: ' + hostkeys[0].[0])
    conn.connect({
      host: socket.request.session.ssh.host,
      port: socket.request.session.ssh.port,
      username: socket.request.session.username,
      password: socket.request.session.userpassword,
      tryKeyboard: true,
      algorithms: socket.request.session.ssh.algorithms,
      readyTimeout: socket.request.session.ssh.readyTimeout,
      keepaliveInterval: socket.request.session.ssh.keepaliveInterval,
      keepaliveCountMax: socket.request.session.ssh.keepaliveCountMax,
      debug: debug('ssh2')
    })
  } else {
    debugWebSSH2('尝试在没有session.username/密码或定义的会话变量，可能是先前放弃的客户端会话。正在断开websocket客户端的连接。\r\n握手信息：\r\n  ' + JSON.stringify(socket.handshake))
    socket.emit('ssherror', 'WEBSOCKET错误-刷新浏览器并重试')
    socket.request.session.destroy()
    socket.disconnect(true)
  }

  /**
  * Error handling for various events. Outputs error to client, logs to
  * server, destroys session and disconnects socket.
  * @param {string} myFunc Function calling this function
  * @param {object} err    error object or error message
  */
  function SSHerror (myFunc, err) {
    var theError
    if (socket.request.session) {
      // we just want the first error of the session to pass to the client
      socket.request.session.error = (socket.request.session.error) || ((err) ? err.message : undefined)
      theError = (socket.request.session.error) ? ': ' + socket.request.session.error : ''
      // log unsuccessful login attempt
      if (err && (err.level === 'client-authentication')) {
        console.log('WebSSH2 ' + 'error: Authentication failure'.red.bold +
          ' user=' + socket.request.session.username.yellow.bold.underline +
          ' from=' + socket.handshake.address.yellow.bold.underline)
        socket.emit('allowreauth', socket.request.session.ssh.allowreauth)
        socket.emit('reauth')
      } else {
        console.log('WebSSH2 Logout: user=' + socket.request.session.username + ' from=' + socket.handshake.address + ' host=' + socket.request.session.ssh.host + ' port=' + socket.request.session.ssh.port + ' sessionID=' + socket.request.sessionID + '/' + socket.id + ' allowreplay=' + socket.request.session.ssh.allowreplay + ' term=' + socket.request.session.ssh.term)
        if (err) {
          theError = (err) ? ': ' + err.message : ''
          console.log('WebSSH2 error' + theError)
        }
      }
      socket.emit('ssherror', 'SSH ' + myFunc + theError)
      socket.request.session.destroy()
      socket.disconnect(true)
    } else {
      theError = (err) ? ': ' + err.message : ''
      socket.disconnect(true)
    }
    debugWebSSH2('SSHerror ' + myFunc + theError)
  }
}
