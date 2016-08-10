(function () {
	const crypto = window.crypto;
	const subtle = crypto.subtle;

	const algorithm = 'ECDSA';
	const curve = 'P-256';
	const hash = 'SHA-256';

	class Signing {
		generateKey() {
			const options = {
				name: algorithm,
				namedCurve: curve
			};

			return subtle.generateKey(options, false, ['sign', 'verify']);
		}

		sign(message, privateKey) {
			const options = {
				name: algorithm,
				hash: {
					name: hash
				}
			};

			return subtle.sign(options, privateKey, message);
		}

		verify(signature, message, publicKey) {
			const options = {
				name: algorithm,
				hash: {
					name: hash
				}
			};

			return subtle.verify(options, publicKey, signature, message);
		}
	}

	return new Signing();
})();
