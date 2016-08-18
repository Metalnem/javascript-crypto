describe('Hashing', () => {
	it('generate password hash and verify it against original password', done => {
		const password = 'Super_secret123!';

		window.hashPassword(password).then(hash => {
			return window.verifyPasswordHash(hash, password).then(valid => {
				expect(valid).toBe(true);
				done();
			});
		}).catch(error => done.fail(error.message));
	});

	it('generate password hash and verify that it runs long enough', done => {
		const password = 'Super_secret123!';
		const from = performance.now();

		window.hashPassword(password).then(() => {
			const to = performance.now();
			const duration = to - from;

			expect(duration).toBeGreaterThan(300);
			expect(duration).toBeLessThan(1000);
			done();
		}).catch(error => done.fail(error.message));
	});
});
