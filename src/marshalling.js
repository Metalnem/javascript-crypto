(function (exports) {
	function exportPublicKey(publicKey) {
		return window.crypto.subtle.exportKey('spki', publicKey);
	}

	function importPublicKey(publicKey) {
		const options = {
			name: 'ECDSA',
			namedCurve: 'P-256'
		};

		return window.crypto.subtle.importKey('spki', publicKey, options, true, ['verify']);
	}

	function exportPrivateKey(privateKey) {
		return window.crypto.subtle.exportKey('pkcs8', privateKey);
	}

	function importPrivateKey(privateKey) {
		const options = {
			name: 'ECDSA',
			namedCurve: 'P-256'
		};

		return window.crypto.subtle.importKey('pkcs8', privateKey, options, true, ['sign']);
	}

	exports.exportPublicKey = exportPublicKey;
	exports.importPublicKey = importPublicKey;
	exports.exportPrivateKey = exportPrivateKey;
	exports.importPrivateKey = importPrivateKey;
})(window);
