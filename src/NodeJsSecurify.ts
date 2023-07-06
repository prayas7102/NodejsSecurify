// NodeJsSecurify, a typescript based npm package to secure your nodejs 
// application code according to OWASP guidelines and check for best 
// practices.

import * as esprima from 'esprima';
import * as fs from "fs";
import * as path from 'path';

// traversing all the gitignore files and including all the file names 
// not be parsed in gitIgnoreFiles string

function findGitIgnoreFiles(directory: string) {
    let gitIgnoreFiles: string = "";

    function traverseDirectory(dir: any) {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                traverseDirectory(filePath); // Recursively traverse subdirectories
            } else if (file === '.gitignore') {
                const fileContent: string = fs?.readFileSync(filePath, 'utf8');
                gitIgnoreFiles += (fileContent);
            }
        });
    }

    traverseDirectory(directory);
    return gitIgnoreFiles;
}

// Recursively traverse all the files in given directory path.
// Ensure it does the same when installed by anyone in any directory of their system.
// So make such changes to ensure the former. 

function parseJSFiles(directory: string, gitIgnoreFilesArray: string[]) {

    let files: string[] = fs.readdirSync(directory);
    files = files.filter(function (e) { 
        return gitIgnoreFilesArray.indexOf(e) === -1; 
    });

    for (const file of files) {

        const filePath: string = path.join(directory, file);
        const stat: any = fs?.statSync(filePath);
        const fileLastName = path.extname(filePath);

        if (stat.isDirectory()) {
            parseJSFiles(filePath, gitIgnoreFilesArray); // Recursively parse files in subdirectories
        }
        else if (fileLastName === '.js' || fileLastName === '.jsx') {

            console.log(filePath);
            const fileContent: string = fs?.readFileSync(filePath, 'utf8');

            // Parse the file content using the esprima parser
            const jsonAst: esprima.Program = esprima?.parseScript(fileContent, { loc: true, comment: true, tokens: true, tolerant: true, jsx: true });
            const strAst: string = JSON.stringify(jsonAst, null, 1);

            // Write data in 'name_of_file_being_parsed.json'.
            fs?.writeFile(`./EsprimaOutput/${file}.json`, strAst, (err: any) => {
                if (err) throw err;
            });
        }
    }
}

try {
    __dirname = 'C:/Users/hp/Desktop/NodeSecurify/API_Based_Email_Sender';

    // concat all the results from gitignore files
    let gitIgnoreFiles: string = findGitIgnoreFiles(__dirname);
    let gitIgnoreFilesArray: string[] = gitIgnoreFiles.split('\n');

    // including node_modules in gitIgnoreFilesArray
    gitIgnoreFilesArray.push('node_modules');

    // parsing all the .js & .jsx files, except files in gitIgnoreFilesArray
    parseJSFiles(__dirname, gitIgnoreFilesArray);
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