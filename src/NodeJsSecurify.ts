// NodeJsSecurify, a typescript based npm package to secure your nodejs 
// application code according to OWASP guidelines and check for best 
// practices.

import * as esprima from 'esprima';
import * as fs from "fs";
import * as path from 'path';

// Recursively traverse all the files in given directory path.
// Ensure it does the same when installed by anyone in any directory of their system.
// So make such changes to ensure the former. 

function parseJSFiles(directory: string) {

    const files: string[] = fs.readdirSync(directory);

    for (const file of files) {

        if (file.indexOf('node_modules') !== -1 || file.indexOf('frontend') !== -1) return;

        const filePath: string = path.join(directory, file);

        const stat: any = fs?.statSync(filePath);

        if (stat.isDirectory()) {
            parseJSFiles(filePath); // Recursively parse files in subdirectories
        } 
        else if (path.extname(filePath) === '.js') {

            console.log(filePath);
            const fileContent: string = fs?.readFileSync(filePath, 'utf8');

            // Parse the file content using the esprima parser
            const jsonAst: esprima.Program = esprima?.parseScript(fileContent, { loc: true, comment: true, tokens: true, tolerant: true });
            const strAst: string = JSON.stringify(jsonAst, null, 1);

            // Write data in 'name_of_file_being_parsed.json'.
            fs?.writeFile(`./EsprimaOutput/${file}.json`, strAst, (err: any) => {
                if (err) throw err;
            });
        }
    }
}

try {
    __dirname = 'C:/Users/hp/Desktop/NodeSecurify/API_Based_Email_Sender'
    parseJSFiles(__dirname);
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