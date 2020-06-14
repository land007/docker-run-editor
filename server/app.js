'use strict'
/* jshint esversion: 6, asi: true, node: true */
// app.js

const path = require('path')
// configPath = path.join(__dirname, 'config.json')
var nodeRoot = path.dirname(require.main.filename)
var configPath = path.join(nodeRoot, 'config.json')
var publicPath = path.join(nodeRoot, 'client', 'public')
console.log('WebSSH2 service reading config from: ' + configPath)
var config = require('read-config')(configPath)
const express = require('express')
const logger = require('morgan')
var session = require('express-session')({
  secret: config.session.secret,
  name: config.session.name,
  resave: true,
  saveUninitialized: false,
  unset: 'destroy'
})
var app = express()
const compression = require('compression')
var server = require('http').Server(app)
var myutil = require('./util')
const validator = require('validator')
var io = require('socket.io')(server, { serveClient: false })
var socket = require('./socket')
var expressOptions = require('./expressOptions')
const crypto = require('crypto');

// express
app.use(compression({ level: 9 }))
app.use(session)
app.use(myutil.basicAuth)
if (config.accesslog) app.use(logger('common'))
app.disable('x-powered-by')

// static files
app.use(express.static(publicPath, expressOptions))

app.get('/reauth', function (req, res, next) {
  var r = req.headers.referer || '/'
  res.status(401).send('<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=' + r + '"></head><body bgcolor="#000"></body></html>')
})

var handlers = function (req, res, next) {
  let key = 'dkksldwerq';
  res.sendFile(path.join(path.join(publicPath, 'client.htm')))
  // capture, assign, and validated variables
  let auth = req.params.auth;
  if(auth !== undefined) {
	  let user = decode(auth, key);
	  req.session.username = user.user;
	  req.session.userpassword = user.pass;
  } else {
	  req.session.username = req.params.user;
	  req.session.userpassword = req.params.pass;
  }
  let cmdstr = req.params.cmds;
  if(cmdstr !== undefined) {
	  console.log('cmdstr', cmdstr);
	  let cmds = aesDecrypt(cmdstr, key);
	  console.log('cmds', cmds);
	  req.session.cmds = JSON.parse(cmds);
  }
  if(req.session.cmds === undefined) {
	  req.session.cmds = [];
  }
//  req.session.cmds.unshift('export DISPLAY=localhost:10.0\n');
//  req.session.cmds.push('export DISPLAY=localhost:10.0\n');
  req.session.ssh = {
    host: (validator.isIP(req.params.host + '') && req.params.host) ||
      (validator.isFQDN(req.params.host) && req.params.host) ||
      (/^(([a-z]|[A-Z]|[0-9]|[!^(){}\-_~])+)?\w$/.test(req.params.host) &&
      req.params.host) || config.ssh.host,
//      port: (validator.isInt(req.query.port + '', { min: 1, max: 65535 }) &&
//        	req.query.port) || config.ssh.port,
      port: (validator.isInt(req.params.port + '', { min: 1, max: 65535 }) &&
      		req.params.port) || config.ssh.port,
    header: {
      name: req.query.header || config.header.text,
      background: req.query.headerBackground || config.header.background
    },
    algorithms: config.algorithms,
    keepaliveInterval: config.ssh.keepaliveInterval,
    keepaliveCountMax: config.ssh.keepaliveCountMax,
    term: (/^(([a-z]|[A-Z]|[0-9]|[!^(){}\-_~])+)?\w$/.test(req.query.sshterm) &&
      req.query.sshterm) || config.ssh.term,
    terminal: {
      cursorBlink: (validator.isBoolean(req.query.cursorBlink + '') ? myutil.parseBool(req.query.cursorBlink) : config.terminal.cursorBlink),
      scrollback: (validator.isInt(req.query.scrollback + '', { min: 1, max: 200000 }) && req.query.scrollback) ? req.query.scrollback : config.terminal.scrollback,
      tabStopWidth: (validator.isInt(req.query.tabStopWidth + '', { min: 1, max: 100 }) && req.query.tabStopWidth) ? req.query.tabStopWidth : config.terminal.tabStopWidth,
      bellStyle: ((req.query.bellStyle) && (['sound', 'none'].indexOf(req.query.bellStyle) > -1)) ? req.query.bellStyle : config.terminal.bellStyle
    },
    allowreplay: config.options.challengeButton || (validator.isBoolean(req.headers.allowreplay + '') ? myutil.parseBool(req.headers.allowreplay) : false),
    allowreauth: config.options.allowreauth || false,
    mrhsession: ((validator.isAlphanumeric(req.headers.mrhsession + '') && req.headers.mrhsession) ? req.headers.mrhsession : 'none'),
    serverlog: {
      client: config.serverlog.client || false,
      server: config.serverlog.server || false
    },
    readyTimeout: (validator.isInt(req.query.readyTimeout + '', { min: 1, max: 300000 }) &&
      req.query.readyTimeout) || config.ssh.readyTimeout
  }
  if (req.session.ssh.header.name) validator.escape(req.session.ssh.header.name)
  if (req.session.ssh.header.background) validator.escape(req.session.ssh.header.background)
  console.log('req.session.username', req.session.username);
  console.log('req.session.cmds', req.session.cmds);
};
//http://127.0.0.1:2222/ssh/host/192.168.1.241/port/22/user/pi/pass/xxx
app.get('/ssh/host/:host?/port/:port?/user/:user?/pass/:pass?', handlers)
//http://127.0.0.1:2222/ssh/host/192.168.1.241/port/22/auth/bGFuZDAwNzoxMjM0NTY3
app.get('/ssh/host/:host?/port/:port?/auth/:auth?', handlers)
//http://127.0.0.1:2222/ssh/host/192.168.1.241/port/22/auth/bGFuZDAwNzoxMjM0NTY3/cmd/be5de86c773794789593c706d11b61f9c65858492a12216ff139b04276547b5c
app.get('/ssh/host/:host?/port/:port?/auth/:auth?/cmds/:cmds?', handlers)
// express error handling
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// socket.io
// expose express session with socket.request.session
io.use(function (socket, next) {
  (socket.request.res) ? session(socket.request, socket.request.res, next)
    : next(next)
})

const aesEncrypt = function(data, key) {
  const cipher = crypto.createCipher('aes192', key);
  var crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

const aesDecrypt = function(encrypted, key) {
  const decipher = crypto.createDecipher('aes192', key);
  var decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const encode = function(username, password, key) {
	var encrypted = aesEncrypt(username + ':' +  password, key);
	return encrypted;
};

const decode = function(encrypted, key) {
	var decrypted = aesDecrypt(encrypted, key);
	console.log(decrypted);
	if (typeof decrypted !== 'string') {
		return undefined
	}
	var userPass = decrypted.split(':');
	if (userPass.length != 2) {
		return undefined
	}
	return {
		user : userPass[0],
		pass : userPass[1]
	};
};

// bring up socket
io.on('connection', socket)

module.exports = { server: server, config: config }
