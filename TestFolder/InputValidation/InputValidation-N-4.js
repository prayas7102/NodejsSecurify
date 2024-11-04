const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

function validateUser(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    age: Joi.number().integer().min(1).max(120).required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.validatedData = value;
  next();
}

app.post('/api/user', validateUser, (req, res) => {
  const { name, age } = req.validatedData;
  // Your logic to handle the request using the validated 'name' and 'age'
  res.json({ name, age });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
