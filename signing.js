(function (exports) {
	function newSigningKey() {
		const options = {
			name: 'ECDSA',
			namedCurve: 'P-256'
		};

		return window.crypto.subtle.generateKey(options, false, ['sign', 'verify']);
	}

	function sign(message, privateKey) {
		const options = {
			name: 'ECDSA',
			hash: {
				name: 'SHA-256'
			}
		};

		return window.crypto.subtle.sign(options, privateKey, message);
	}

	function verify(signature, message, publicKey) {
		const options = {
			name: 'ECDSA',
			hash: {
				name: 'SHA-256'
			}
		};

		return window.crypto.subtle.verify(options, publicKey, signature, message);
	}

	exports.newSigningKey = newSigningKey;
	exports.sign = sign;
	exports.verify = verify;
})(window);
