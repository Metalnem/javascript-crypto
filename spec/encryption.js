describe('Encryption', () => {
	it('apply encryption and decryption to get original message', done => {
		window.newEncryptionKey().then(key => {
			const message = 'The quick brown fox jumps over the lazy dog';
			const encoded = new TextEncoder('utf-8').encode(message);

			return window.encrypt(encoded, key).then(ciphertext => {
				return window.decrypt(ciphertext, key).then(plaintext => {
					const decoded = new TextDecoder('utf-8').decode(plaintext);
					expect(message).toEqual(decoded);
					done();
				});
			});
		});
	});
});
