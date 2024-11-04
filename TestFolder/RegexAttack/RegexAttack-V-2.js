const password = "MyP@ssw0rd";
const regex = /^((?=(\w+))\1\s?)*$/;
const isValidPassword = regex.test(password);
console.log(isValidPassword); // Output: true