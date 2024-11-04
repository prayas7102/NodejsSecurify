const plaintextPassword = 'supersecretpassword';
const hashedPassword = hashPassword(plaintextPassword); // Assuming hashPassword is a hashing function

test('Should hash passwords', () => {
  expect(hashedPassword).not.toBe(plaintextPassword);
});
