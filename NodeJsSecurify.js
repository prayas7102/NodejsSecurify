// NodeJsSecurify, a nodejs based npm package to secure your JavaScript 
// according to OWASP guidelines application code, check for best 
// practices and highlight errors.

var esprima = require('esprima');
const fs = require("fs");

// Specify the file you want to parse
const filePath = "API_Based_Email_Sender/Backend/controller/EmailController.js";

// Read the content of the file
const fileContent = fs.readFileSync(filePath, "utf-8");

function VariableDeclaration() {

}

function IfStatement() {

}

function ExpressionStatement() {

}

function ArrowFunctionExpression() {

}
function AssignmentExpression() {

}
function MemberExpression() {

}
function ObjectExpression() {

}
function CallExpression() {

}
function VariableDeclarator() {

}
function NewExpression() {

}
function BinaryExpression() {

}
function Identifier() {

}
function Literal() {

}
function BlockStatement() {

}

try {
    // Parse the file content using the esprima parser
    const jsonAst = esprima.parseScript((fileContent));
    const strAst = JSON.stringify(jsonAst, null, 1);
    console.log(jsonAst);
    console.log(strAst);

    // Write data in 'EsprimaOutput.json' .
    fs.writeFile('EsprimaOutput.json', strAst, (err) => {
        // In case of a error throw err.
        if (err) throw err;
    });

}
catch (error) {
    console.error("Error parsing file:", error);
}