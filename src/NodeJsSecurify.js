"use strict";
// NodeJsSecurify, a typescript based npm package to secure your nodejs 
// application code according to OWASP guidelines, check for best 
// practices and highlight errors.
Object.defineProperty(exports, "__esModule", { value: true });
var esprima = require("esprima");
var fs = require("fs");
var path = require("path");
// Construct an absolute path
var absolutePath = path === null || path === void 0 ? void 0 : path.resolve('/');
console.log(absolutePath);
// Specify the file you want to parse
var filePath = "API_Based_Email_Sender/Backend/controller/EmailController.js";
console.log(filePath);
// Read the content of the file
var fileContent = fs === null || fs === void 0 ? void 0 : fs.readFileSync(filePath, "utf-8");
try {
    // Parse the file content using the esprima parser
    var jsonAst = esprima === null || esprima === void 0 ? void 0 : esprima.parseScript(fileContent, { loc: true });
    var strAst = JSON.stringify(jsonAst, null, 1);
    console.log(jsonAst);
    // console.log(strAst);
    // Write data in 'EsprimaOutput.json' .
    fs === null || fs === void 0 ? void 0 : fs.writeFile('./EsprimaOutput/ParsedOutput.json', strAst, function (err) {
        // In case of a error throw err.
        if (err)
            throw err;
    });
}
catch (error) {
    console.error("Error parsing file:", error);
}
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
