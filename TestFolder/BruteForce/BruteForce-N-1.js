function createRateLimitedFunction(maxAttempts, interval) {
    let attempts = 0;
    let lastAttemptTimestamp = 0;
  
    return function login(username, password) {
        const now = Date.now();
        
        // Check if the maximum attempts have been reached within the interval
        if (attempts >= maxAttempts && now - lastAttemptTimestamp < interval) {
            return "Rate limited";
        }
    
        // Simulate authentication check
        if (password === "correct_password") {
            attempts = 0; // Reset attempts on successful login
            return "Login successful";
        } else {
            attempts++;
            lastAttemptTimestamp = now;
            return "Invalid password";
        }
    };
}
  
// Create the rate-limited login function with max attempts = 3 and interval = 60000ms (1 minute)
const loginFunction = createRateLimitedFunction(3, 60000);

// Test the function
console.log(loginFunction("user123", "wrong_password")); // Output: Invalid password
console.log(loginFunction("user123", "wrong_password")); // Output: Invalid password
console.log(loginFunction("user123", "wrong_password")); // Output: Invalid password
console.log(loginFunction("user123", "wrong_password")); // Output: Rate limited
console.log(loginFunction("user123", "correct_password")); // Output: Login successful