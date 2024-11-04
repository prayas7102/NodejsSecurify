const weakJwt = generateWeakJwt(); // Assuming generateWeakJwt is a function generating a weak JWT

test('Should not use weak JWT security', () => {
  const jwtParts = weakJwt.split('.');
  const header = JSON.parse(atob(jwtParts[0]));
  expect(header.alg).not.toBe('none');
});
