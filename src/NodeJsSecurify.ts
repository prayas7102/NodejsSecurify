// NodeJsSecurify, a typescript based npm package to secure your nodejs 
// application code according to OWASP guidelines, check for best 
// practices and highlight errors.

import * as esprima from 'esprima';
import * as fs from "fs";
import * as path from 'path';

// Construct an absolute path
const absolutePath = path?.resolve('C:/Users/hp/Desktop/NodeSecurify');
console.log(absolutePath);

// recursively traverse all the files in given directory path
const filePath: string = "./API_Based_Email_Sender/Backend/controller/EmailController.js";

// Read the content of the file
const fileContent: string = fs?.readFileSync(filePath, "utf-8");

try {
    // Parse the file content using the esprima parser
    const jsonAst: esprima.Program = esprima?.parseScript(fileContent, { loc: true });
    const strAst: string = JSON.stringify(jsonAst, null, 1);

    // Write data in 'ParsedOutput.json' .
    fs?.writeFile('./EsprimaOutput/ParsedOutput.json', strAst, (err: any) => {
        if (err) throw err;
    });
}
catch (error: any) {
    console.error("Error parsing file:", error);
}

export class Log {

    static VariableDeclaration() {

    }
    static IfStatement() {

    }
    static ExpressionStatement() {

    }
    static ArrowstaticExpression() {

    }
    static AssignmentExpression() {

    }
    static MemberExpression() {

    }
    static ObjectExpression() {

    }
    static CallExpression() {

    }
    static VariableDeclarator() {

    }
    static NewExpression() {

    }
    static BinaryExpression() {

    }
    static Identifier() {

    }
    static Literal() {

    }
    static BlockStatement() {

    }
}