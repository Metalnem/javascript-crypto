(function (exports) {
	function newEncryptionKey() {
		const options = {
			name: 'AES-GCM',
			length: 256
		};

		return window.crypto.subtle.generateKey(options, false, ['encrypt', 'decrypt']);
	}

	function encrypt(message, key) {
		const nonceSize = 12;
		const nonce = window.crypto.getRandomValues(new Uint8Array(nonceSize));

		const options = {
			name: 'AES-GCM',
			iv: nonce
		};

		return window.crypto.subtle.encrypt(options, key, message).then(ciphertext => {
			const final = new Uint8Array(nonce.byteLength + ciphertext.byteLength);

			final.set(new Uint8Array(nonce), 0);
			final.set(new Uint8Array(ciphertext), nonce.byteLength);

			return final.buffer;
		});
	}

	function decrypt(message, key) {
		const isView = ArrayBuffer.isView(message);

		if (!isView && !(message instanceof ArrayBuffer)) {
			const message = 'Failed to execute decrypt: The provided value is not of type ArrayBuffer or ArrayBufferView';
			return Promise.reject(new TypeError(message));
		}

		const nonceSize = 12;
		const view = isView ? message : new Uint8Array(message);
		const nonce = view.subarray(0, nonceSize);
		const ciphertext = view.subarray(nonceSize);

		const options = {
			name: 'AES-GCM',
			iv: nonce
		};

		return window.crypto.subtle.decrypt(options, key, ciphertext);
	}

	exports.newEncryptionKey = newEncryptionKey;
	exports.encrypt = encrypt;
	exports.decrypt = decrypt;
})(window);
