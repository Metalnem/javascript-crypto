(function (exports) {
	function hashPassword(password) {
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
				iterations: 500000,
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

	function verifyPasswordHash(passwordHash, password) {
		const isView = ArrayBuffer.isView(passwordHash);

		if (!isView && !(passwordHash instanceof ArrayBuffer)) {
			const message = 'Failed to execute verifyPasswordHash: The provided value is not of type ArrayBuffer or ArrayBufferView';
			return Promise.reject(new TypeError(message));
		}

		const encoder = new TextEncoder('utf-8');
		const buf = encoder.encode(password);

		const options = {
			name: 'PBKDF2'
		};

		return window.crypto.subtle.importKey('raw', buf, options, false, ['deriveBits']).then(key => {
			const saltSize = 16;
			const view = isView ? passwordHash : new Uint8Array(passwordHash);
			const salt = view.subarray(0, saltSize);

			const options = {
				name: 'PBKDF2',
				salt: salt,
				iterations: 500000,
				hash: {
					name: 'SHA-256'
				}
			};

			return window.crypto.subtle.deriveBits(options, key, 96).then(newHash => {
				const oldView = view.subarray(saltSize);
				const newView = new Uint8Array(newHash);

				return newView.every((element, index) => element === oldView[index]);
			});
		});
	}

	exports.hashPassword = hashPassword;
	exports.verifyPasswordHash = verifyPasswordHash;
})(window);
