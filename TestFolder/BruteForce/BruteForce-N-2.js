const express = require('express');
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redisClient = require('./redisClient');

const app = express();
const loginLimiter = rateLimit({
    store: new RedisStore({
        client: redisClient,
        expiry: 60 * 15, // 15 minutes
    }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per 15 minutes
    message: 'Too many login attempts from this IP, please try again after 15 minutes.',
});

app.post('/login', loginLimiter, (req, res) => {
    const { username, password } = req.body;
    // Authenticate user logic
    res.send('Login successful');
});