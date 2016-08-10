window.signing = (function () {
	class Signing {
		generateKey() {
			const options = {
				name: 'ECDSA',
				namedCurve: 'P-256'
			};

			return window.crypto.subtle.generateKey(options, false, ['sign', 'verify']);
		}

		sign(message, privateKey) {
			const options = {
				name: 'ECDSA',
				hash: {
					name: 'SHA-256'
				}
			};

			return window.crypto.subtle.sign(options, privateKey, message);
		}

		verify(signature, message, publicKey) {
			const options = {
				name: 'ECDSA',
				hash: {
					name: 'SHA-256'
				}
			};

			return window.crypto.subtle.verify(options, publicKey, signature, message);
		}
	}

	return new Signing();
})();
