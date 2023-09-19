const userInput = "42";

const parsedInt = parseInt(userInput, 10); // Always specify the radix (base) to avoid unexpected results
console.log(parsedInt);

const parsedFloat = parseFloat(userInput);
console.log(parsedFloat);

const pattern = /^[a-zA-Z]+$/; // Regular expression to match only letters

if (pattern.test(userInput)) {
    console.log("Valid input: " + userInput);
} else {
    console.log("Invalid input: " + userInput);
}

const delay = 2000; // 2 seconds

const timerId = setTimeout(() => {
    console.log("Delayed message");
}, delay);

// Remember to clear the interval when it's no longer needed
// clearTimeout(timerId);

document.write()
// Use document.getElementById or querySelector to target the specific element
const outputDiv = document.getElementById("output");
outputDiv.innerHTML = "<p>Safe usage of document.write()</p>";

const targetDiv = document.getElementById("target");

// Safe usage of innerHTML
targetDiv.innerHTML = "<p>New content</p>";

// Safe usage of outerHTML
targetDiv.outerHTML = "<div id='new-target'><p>Replaced content</p></div>";

const url = "https://www.example.com";
const windowName = "Example_Window";

// Open a new window only on user action (e.g., button click)
function openNewWindow() {
    window.open(url, windowName);
}
