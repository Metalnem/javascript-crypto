describe('Hashing', () => {
	it('generate password hash and verify it against original password', done => {
		const password = 'Super_secret123!';

		window.hashPassword(password).then(hash => {
			return window.verifyPasswordHash(hash, password).then(valid => {
				expect(valid).toBe(true);
				done();
			});
		});
	});
});
