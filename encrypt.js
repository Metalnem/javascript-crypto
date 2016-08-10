window.encryption = (function () {
	class Encryption {
		generateKey() {
			const options = {
				name: 'AES-GCM',
				length: 256
			};

			return window.crypto.subtle.generateKey(options, false, ['encrypt', 'decrypt']);
		}

		encrypt(message, key) {
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

		decrypt(message, key) {
			const nonceSize = 12;
			const nonce = message.slice(0, nonceSize);
			const ciphertext = message.slice(nonceSize);

			const options = {
				name: 'AES-GCM',
				iv: nonce
			};

			return window.crypto.subtle.decrypt(options, key, ciphertext);
		}
	}

	return new Encryption();
})();
