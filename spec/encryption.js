describe('Encryption', () => {
	it('apply encryption and decryption to get original message', done => {
		window.newEncryptionKey().then(key => {
			const message = 'The quick brown fox jumps over the lazy dog';
			const encoded = new TextEncoder('utf-8').encode(message);

			return window.exportEncryptionKey(key)
				.then(exported => window.importEncryptionKey(exported))
				.then(imported => window.encrypt(encoded, imported))
				.then(ciphertext => {
					return window.decrypt(ciphertext, key).then(plaintext => {
						const decoded = new TextDecoder('utf-8').decode(plaintext);
						expect(message).toEqual(decoded);
						done();
					});
				});
		}).catch(error => done.fail(error.message));
	});

	it('tamper with the ciphertext to verify that it will be rejected', done => {
		window.newEncryptionKey().then(key => {
			const message = 'The quick brown fox jumps over the lazy dog';
			const encoded = new TextEncoder('utf-8').encode(message);

			return window.encrypt(encoded, key).then(ciphertext => {
				const view = new Uint8Array(ciphertext);
				view[view.length - 1] ^= 1;

				return window.decrypt(ciphertext, key)
					.then(() => done.fail('Expected ciphertext to be rejected'));
			});
		}).catch(() => {
			expect(true).toBe(true);
			done();
		});
	});
});
