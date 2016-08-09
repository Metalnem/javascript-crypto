(function () {
	const crypto = window.crypto;
	const subtle = crypto.subtle;

	const algorithm = 'HMAC';
	const hash = 'SHA-256';

	function generateKey() {
		const options = {
			name: algorithm,
			hash: {
				name: hash
			}
		};

		return subtle.generateKey(options, false, ['sign', 'verify']);
	}

	function sign(message, key) {
		const options = {
			name: algorithm
		};

		return subtle.sign(options, key, message);
	}

	function verify(signature, message, key) {
		const options = {
			name: algorithm
		};

		return subtle.verify(options, key, signature, message);
	}

	return {
		generateKey: generateKey,
		sign: sign,
		verify: verify
	};
})();
