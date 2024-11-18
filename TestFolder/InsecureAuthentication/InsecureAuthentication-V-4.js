const sessionId = generateSessionId(); // Assuming generateSessionId is a function generating insecure session IDs

test('Should use secure session IDs', () => {
  const isSecure = sessionId.match(/^SECURE-[a-zA-Z0-9]{16}$/);
  expect(isSecure).toBeTruthy();
});
