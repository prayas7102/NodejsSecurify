function login(username, password) {
    let attempts = 0;
    const maxAttempts = 5;
    
    while (attempts < maxAttempts) {
        if (username === 'admin' && password === 'password123') {
            return 'Login successful';
        } else {
            attempts++;
            if (attempts === maxAttempts) {
                return 'Invalid username or password';
            }
        }
    }
}