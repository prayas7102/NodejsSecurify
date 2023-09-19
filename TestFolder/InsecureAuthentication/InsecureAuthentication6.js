const password = 'password123';

test('Should not allow weak passwords', () => {
  const isWeak = password.match(/^password\d{3}$/i);
  expect(isWeak).toBeFalsy();
});
