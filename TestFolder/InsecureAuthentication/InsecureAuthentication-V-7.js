const { username, password } = require('./credentials'); // Assuming credentials.js contains hardcoded credentials

test('Should not have hardcoded credentials', () => {
  expect(username).not.toBe('admin');
  expect(password).not.toBe('password123');
});
