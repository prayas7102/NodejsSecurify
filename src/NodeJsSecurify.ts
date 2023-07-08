// NodeJsSecurify, a typescript based npm package to secure your nodejs 
// application code according to OWASP guidelines and check for best 
// practices.

import * as esprima from 'esprima';
import * as fs from "fs";
import * as path from 'path';
import * as colors from 'colors';
import { detectCallbackHell } from './Vulnerability/DetectCallBackHell';

const colours = colors;
export class Log {
    static NodeJsSecurifyResults() {
        console.log('Working');
    }
}

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
                // Recursively traverse subdirectories
                traverseDirectory(filePath);
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
        const stat: fs.Stats = fs?.statSync(filePath);
        const fileLastName: string = path.extname(filePath);

        if (stat.isDirectory()) {
            // Recursively parse files in subdirectories
            parseJSFiles(filePath, gitIgnoreFilesArray);
        }
        else if (fileLastName === '.js' || fileLastName === '.jsx') {

            console.log(filePath.blue);
            const fileContent: string = fs?.readFileSync(filePath, 'utf8');

            // Parse the file content using the esprima parser
            const jsonAst: esprima.Program = esprima?.parseScript(fileContent, { loc: true, comment: true, tokens: true, tolerant: true, jsx: true });
            const strAst: string = JSON.stringify(jsonAst, null, 1);

            // // Write data in 'name_of_file_being_parsed.json'.
            fs?.writeFile(`./EsprimaOutput/${file}.json`, strAst, (err: any): any => {
                if (err) throw err;
            });
        }
    }
}

try {
    __dirname = 'C:/Users/hp/Desktop/NodeSecurify/API_Based_Email_Sender';
    console.log('\nRoot Directory Name : '.yellow + __dirname.rainbow);

    // concat all the results from gitignore files
    let gitIgnoreFiles: string = findGitIgnoreFiles(__dirname);

    let gitIgnoreFilesArray: string[] = gitIgnoreFiles.split('\n');
    console.log("\nFile names in .gitignore files not getting parsed: \n".yellow);

    // including node_modules in gitIgnoreFilesArray
    gitIgnoreFilesArray.push('node_modules');
    const arrayString = gitIgnoreFilesArray.join(", ");
    console.log(arrayString.cyan);

    // parsing all the .js & .jsx files, except files in gitIgnoreFilesArray
    console.log("\nFile path name of .js & .jsx files getting parsed: \n".yellow);
    parseJSFiles(__dirname, gitIgnoreFilesArray);
    console.log("\n");

    // parsing files for callback-hell errors
    let files: string[] = fs.readdirSync('./EsprimaOutput');
    files.forEach((file: string)=>{
        detectCallbackHell('./EsprimaOutput/'+file);
    })

    Log.NodeJsSecurifyResults();
}
catch (error: any) {
    console.log("Error parsing file".underline.red);
    console.log("Please resolve error in file (check last file path) before running NodeJsSecurify".underline.red);
    console.error(error);
}