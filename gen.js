const crypto = require('crypto');

const main = function(){
	var username = 'pi';
	var password = '';
	var key = 'dkksldwerq';
	var aesauth = encode(username, password, key);
	console.log('aesauth', aesauth);
	var user = decode(aesauth, key);
	console.log('user', user);
}

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
		name : userPass[0],
		pass : userPass[1]
	};
};

main();