// NodeJsSecurify, a typescript based npm package to secure your nodejs 
// application code according to OWASP guidelines, check for best 
// practices and highlight errors.

import * as esprima from 'esprima';
import * as fs from "fs";
import  * as path from 'path';

// Construct an absolute path
const absolutePath = path?.resolve('/');
console.log(absolutePath);


// Specify the file you want to parse
const filePath: string = "API_Based_Email_Sender/Backend/controller/EmailController.js";
console.log(filePath);
// Read the content of the file
const fileContent: string = fs?.readFileSync(filePath, "utf-8");

try {
    // Parse the file content using the esprima parser
    const jsonAst: esprima.Program = esprima?.parseScript(fileContent, { loc: true });
    const strAst: string = JSON.stringify(jsonAst, null, 1);
    console.log(jsonAst);
    // console.log(strAst);

    // Write data in 'EsprimaOutput.json' .
    fs?.writeFile('./EsprimaOutput/ParsedOutput.json', strAst, (err: any) => {
        // In case of a error throw err.
        if (err) throw err;
    });

}
catch (error: any) {
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