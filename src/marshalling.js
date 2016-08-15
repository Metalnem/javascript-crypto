(function (exports) {
	function exportPublicKey(publicKey) {
		return window.crypto.subtle.exportKey('spki', publicKey);
	}

	function importPublicKey(publicKey) {
		return window.crypto.subtle.importKey('spki', publicKey, true, ['verify']);
	}

	function exportPrivateKey(privateKey) {
		return window.crypto.subtle.exportKey('pkcs8', privateKey);
	}

	function importPrivateKey(privateKey) {
		return window.crypto.subtle.importKey('pkcs8', privateKey, true, ['sign']);
	}

	exports.exportPublicKey = exportPublicKey;
	exports.importPublicKey = importPublicKey;
	exports.exportPrivateKey = exportPrivateKey;
	exports.importPrivateKey = importPrivateKey;
})(window);
