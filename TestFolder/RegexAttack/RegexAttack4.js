const date = "2023-07-27";
const regex = /^(a+)+[a-zA-Z]$/;
const isValidDate = regex.test(date);
console.log(isValidDate); // Output: true