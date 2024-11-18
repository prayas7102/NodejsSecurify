function authenticate(username, password) {
    const validUsername = 'admin';
    const validPassword = 'strongpass';
    let attemptCount = 0;

    while (attemptCount < 10) {
        if (username === validUsername && password === validPassword) {
            return 'Login successful';
        } else {
            attemptCount++;
        }
    }

    return 'Account locked temporarily';
}