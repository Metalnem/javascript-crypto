describe('Authentication', () => {
	it('generate MAC and verify it against original message', done => {
		window.newMacKey().then(key => {
			const message = 'The quick brown fox jumps over the lazy dog';
			const encoded = new TextEncoder('utf-8').encode(message);

			return window.generateMac(encoded, key).then(signature => {
				return window.verifyMac(signature, encoded, key).then(valid => {
					expect(valid).toBe(true);
					done();
				});
			});
		});
	});
});
