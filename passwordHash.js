window.passwordHashing = (function () {
	class PasswordHashing {
		hash(password) {
			const encoder = new TextEncoder('utf-8');
			const buf = encoder.encode(password);

			const options = {
				name: 'PBKDF2'
			};

			return window.crypto.subtle.importKey('raw', buf, options, false, ['deriveBits']).then(key => {
				const salt = window.crypto.getRandomValues(new Uint8Array(16));

				const options = {
					name: 'PBKDF2',
					salt: salt,
					iterations: 86000,
					hash: {
						name: 'SHA-256'
					}
				};

				return window.crypto.subtle.deriveBits(options, key, 96).then(hash => {
					const final = new Uint8Array(salt.byteLength + hash.byteLength);

					final.set(new Uint8Array(salt), 0);
					final.set(new Uint8Array(hash), salt.byteLength);

					return final.buffer;
				});
			});
		}
	}

	return new PasswordHashing();
})();
