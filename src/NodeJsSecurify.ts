// NodeJsSecurify, a typescript based npm package to secure your nodejs 
// application code according to OWASP guidelines and check for best 
// practices.

import * as esprima from 'esprima';
import * as fs from "fs";
// import * as path from 'path';

// Recursively traverse all the files in given directory path.
// Ensure it does the same when installed by anyone in any directory of their system.
// So make such changes to ensure the former. 
// 
const filePath: string = "./API_Based_Email_Sender/Backend/controller/EmailController.js";

// Read the content of the file
const fileContent: string = fs?.readFileSync(filePath, "utf-8");

try {
    // Parse the file content using the esprima parser
    const jsonAst: esprima.Program = esprima?.parseScript(fileContent, { loc: true });
    const strAst: string = JSON.stringify(jsonAst, null, 1);

    // Write data in 'name_of_file_being_parsed.json'.
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