const jwtToken = generateJwtToken('admin', 'HS256'); // Assuming generateJwtToken is a function generating a JWT with weak signing algorithm

test('Should not use weak signing algorithms for JWT', () => {
  const jwtParts = jwtToken.split('.');
  const header = JSON.parse(atob(jwtParts[0]));
  expect(header.alg).not.toBe('HS256');
});
