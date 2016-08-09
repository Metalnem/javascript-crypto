(function () {
	const crypto = window.crypto;
	const subtle = crypto.subtle;

	const algorithm = 'AES-GCM';
	const keySize = 256;
	const nonceSize = 12;

	function append(buf1, buf2) {
		const result = new Uint8Array(buf1.byteLength + buf2.byteLength);

		result.set(new Uint8Array(buf1), 0);
		result.set(new Uint8Array(buf2), buf1.byteLength);

		return result.buffer;
	}

	function generateKey() {
		const options = {
			name: algorithm,
			length: keySize
		};

		return subtle.generateKey(options, false, ['encrypt', 'decrypt']);
	}

	function encrypt(message, key) {
		const nonce = crypto.getRandomValues(new Uint8Array(nonceSize));

		const options = {
			name: algorithm,
			iv: nonce
		};

		return subtle.encrypt(options, key, message).then(ciphertext => {
			return append(nonce, ciphertext);
		});
	}

	function decrypt(message, key) {
		const nonce = message.slice(0, nonceSize);
		const ciphertext = message.slice(nonceSize);

		const options = {
			name: algorithm,
			iv: nonce
		};

		return subtle.decrypt(options, key, ciphertext);
	}

	return {
		generateKey: generateKey,
		encrypt: encrypt,
		decrypt: decrypt
	};
})();
