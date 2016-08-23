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
		}).catch(error => done.fail(error.message));
	});

	it('tamper with the message to verify that it will fail MAC verification', done => {
		window.newMacKey().then(key => {
			const message = 'The quick brown fox jumps over the lazy dog';
			const encoded = new TextEncoder('utf-8').encode(message);

			return window.generateMac(encoded, key).then(signature => {
				encoded[encoded.length - 1] ^= 1;

				return window.verifyMac(signature, encoded, key).then(valid => {
					if (valid) {
						done.fail('Expected message to be rejected');
					} else {
						expect(true).toBe(true);
						done();
					}
				});
			});
		}).catch(error => done.fail(error.message));
	});
});
