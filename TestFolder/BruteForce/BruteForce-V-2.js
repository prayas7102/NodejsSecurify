function login(username, password) {
    const maxAttempts = 5;
    const delay = 1000;
    let attempts = 0;

    while (attempts < maxAttempts) {
        if (username === 'user' && password === 'securepass') {
            return 'Login successful';
        } else {
            attempts++;
            setTimeout(() => {}, delay);
        }
    }
    return 'Invalid username or password';
}