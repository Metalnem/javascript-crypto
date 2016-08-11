(function (exports) {
	function newMacKey() {
		const options = {
			name: 'HMAC',
			hash: {
				name: 'SHA-256'
			}
		};

		return window.crypto.subtle.generateKey(options, false, ['sign', 'verify']);
	}

	function generateMac(message, key) {
		const options = {
			name: 'HMAC'
		};

		return window.crypto.subtle.sign(options, key, message);
	}

	function verifyMac(signature, message, key) {
		const options = {
			name: 'HMAC'
		};

		return window.crypto.subtle.verify(options, key, signature, message);
	}

	exports.newMacKey = newMacKey;
	exports.generateMac = generateMac;
	exports.verifyMac = verifyMac;
})(window);
