(function () {
	const crypto = window.crypto;
	const subtle = crypto.subtle;

	const algorithm = 'HMAC';
	const hash = 'SHA-256';

	class Authentication {
		generateKey() {
			const options = {
				name: algorithm,
				hash: {
					name: hash
				}
			};

			return subtle.generateKey(options, false, ['sign', 'verify']);
		}

		sign(message, key) {
			const options = {
				name: algorithm
			};

			return subtle.sign(options, key, message);
		}

		verify(signature, message, key) {
			const options = {
				name: algorithm
			};

			return subtle.verify(options, key, signature, message);
		}
	}

	return new Authentication();
})();
