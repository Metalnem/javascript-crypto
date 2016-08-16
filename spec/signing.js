describe('Signing', () => {
	it('generate signature and verify it against original message', done => {
		window.newSigningKey().then(key => {
			const message = 'The quick brown fox jumps over the lazy dog';
			const encoded = new TextEncoder('utf-8').encode(message);

			return window.sign(encoded, key.privateKey).then(signature => {
				return window.verify(signature, encoded, key.publicKey).then(valid => {
					expect(valid).toBe(true);
					done();
				});
			});
		});
	});
});
