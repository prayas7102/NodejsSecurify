const text = "42 is the answer, but 7 is also important.";
const regex = /(b|b)*/;
let match;
while ((match = regex.exec(text)) !== null) {
  console.log(`Number: ${match[0]}, Position: ${match.index}`);
}