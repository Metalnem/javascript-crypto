window.authentication = (function () {
	class Authentication {
		generateKey() {
			const options = {
				name: 'HMAC',
				hash: {
					name: 'SHA-256'
				}
			};

			return window.crypto.subtle.generateKey(options, false, ['sign', 'verify']);
		}

		sign(message, key) {
			const options = {
				name: 'HMAC'
			};

			return window.crypto.subtle.sign(options, key, message);
		}

		verify(signature, message, key) {
			const options = {
				name: 'HMAC'
			};

			return window.crypto.subtle.verify(options, key, signature, message);
		}
	}

	return new Authentication();
})();
