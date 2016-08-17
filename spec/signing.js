describe('Signing', () => {
	it('generate signature and verify it against original message', done => {
		window.newSigningKey().then(key => {
			const message = 'The quick brown fox jumps over the lazy dog';
			const encoded = new TextEncoder('utf-8').encode(message);

			return window.exportPrivateKey(key.privateKey)
				.then(exported => window.importPrivateKey(exported))
				.then(imported => window.sign(encoded, imported))
				.then(signature => {
					return window.verify(signature, encoded, key.publicKey).then(valid => {
						expect(valid).toBe(true);

						return window.exportPublicKey(key.publicKey)
							.then(exported => window.importPublicKey(exported))
							.then(imported => window.verify(signature, encoded, imported))
							.then(valid => {
								expect(valid).toBe(true);
								done();
							});
					});
				});
		});
	});
});
