(function (exports) {
	function exportEncryptionKey(key) {
		return window.crypto.subtle.exportKey('raw', key);
	}

	function importEncryptionKey(key) {
		const options = {
			name: 'AES-GCM',
			length: 256
		};

		return window.crypto.subtle.importKey('raw', key, options, true, ['encrypt', 'decrypt']);
	}

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

	exports.exportEncryptionKey = exportEncryptionKey;
	exports.importEncryptionKey = importEncryptionKey;
	exports.exportPublicKey = exportPublicKey;
	exports.importPublicKey = importPublicKey;
	exports.exportPrivateKey = exportPrivateKey;
	exports.importPrivateKey = importPrivateKey;
})(window);
