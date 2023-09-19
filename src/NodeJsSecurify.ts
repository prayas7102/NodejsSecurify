// NodeJsSecurify, a typescript based npm package to secure your nodejs 
// application code according to OWASP guidelines and check for best 
// practices.
// It provide security against :
// => "Input Validation",
// => "Dangerous Functions",
// => "DOS Attack",
// => "ReGex DOS Attack",
// => "Brute Force Attack",
// => "OWASP",
// => "CallBack Hell",
// => "XSS Attack",
// => "Insecure Security Headers",
// => "Unsafe npm packages",
// => "Insecure Authentication",
// => "Code Injection",
// => "Logistic Regression"

import * as esprima from 'esprima';
import * as fs from "fs";
import * as path from 'path';
import * as colors from 'colors';
import { detectBruteForce } from './Vulnerability/DetectBruteForceAttack'
import { detectCallBackHell } from './Vulnerability/DetectCallBackHell';
import { isRegexVulnerable } from './Vulnerability/DetectVulnerableRegex';
import { detectInputValidation } from './Vulnerability/DetectInputValidation';
import { detectDangerousFunctions } from './Vulnerability/DetectDangerousFunctions';
import {analyzeSecurityHeaders} from './Vulnerability/AnalyzeSecurityHeaders';
import { insecureAuthentication } from './Vulnerability/InsecureAuthentication';
import {checkVulnerablePackages} from './Vulnerability/DetectUnsafeNpmPackage';

const colours = colors;
export class Log {

    static NodeJsSecurifyResults() {
        function extractParentPath(inputPath: string) {
            // Find the last occurrence of "node_modules" in the input path
            const lastIndex = inputPath.lastIndexOf("node_modules");
            if (lastIndex !== -1) {
                // Extract the part of the path up to the last occurrence of "node_modules"
                let outputPath = inputPath.slice(0, lastIndex);
                // Remove any trailing backslashes if present
                if (outputPath.endsWith("\\")) {
                    outputPath = outputPath.slice(0, -1);
                }
                return outputPath;
            }
            // If "node_modules" is not found, return the input path as it is
            return inputPath;
        }
        try {
            // testing command: node ./dist/NodeJsSecurify.js
            // comment this before publishing npm package (uncomment only for testing)
            __dirname = "C:/Users/hp/Desktop/NodeSecurify/TestFolder"

            console.log("\n******************************************************************************************".green);
            console.log("****************************** Node-Js-Securify STARTED **********************************".green);
            console.log("******************************************************************************************".green);

            __dirname = extractParentPath(__dirname);

            console.log('\nSearching for .js files in (root directory) : '.yellow + __dirname.rainbow);

            // concat all the results from gitignore files
            let gitIgnoreFiles: string = Log.findGitIgnoreFiles(__dirname);

            let gitIgnoreFilesArray: string[] = gitIgnoreFiles.split('\n');
            console.log("\nFile names in .gitignore files not getting parsed: \n".yellow);

            // including node_modules in gitIgnoreFilesArray
            gitIgnoreFilesArray.push('node_modules');
            const arrayString = gitIgnoreFilesArray.join(", ");
            console.log(arrayString.cyan);

            // parsing all the .js & .jsx files, except files in gitIgnoreFilesArray
            console.log("\nFile path name of .js & .jsx files getting parsed: \n".yellow);
            Log.parseJSFiles(__dirname, gitIgnoreFilesArray);

            // parsing for vulnerable npm pacakage
            console.log("Parsing for vulnerable npm pacakage:".yellow);
            checkVulnerablePackages();
        }
        catch (error: any) {
            console.log("Error parsing file".underline.red);
            console.log("Please resolve error in file (check last file path) before running NodeJsSecurify".underline.red);
            console.error(error);
        }
    }

    // traversing all the gitignore files and including all the file names 
    // not be parsed in gitIgnoreFiles string
    static findGitIgnoreFiles(directory: string) {
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
        gitIgnoreFiles += ("\nVulnerability\ndist\nNodeJsSecurify.js");
        return gitIgnoreFiles;
    }

    // Recursively traverse all the files in given directory path.
    // Ensure it does the same when installed by anyone in any directory of their system.
    // So make such changes to ensure the former. 
    static async parseJSFiles(directory: string, gitIgnoreFilesArray: string[]) {

        try {
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
                    Log.parseJSFiles(filePath, gitIgnoreFilesArray);
                }
                else if (fileLastName === '.js' || fileLastName === '.jsx') {
                    try {
                        console.log(filePath.blue);
                        const fileContent: string = fs?.readFileSync(filePath, 'utf8');

                        // Parse the file content using the esprima parser
                        const jsonAst: esprima.Program = esprima?.parseScript(fileContent, { loc: true, comment: true, tokens: true, tolerant: true, jsx: true });
                        const strAst: string = JSON.stringify(jsonAst, null, 1);

                        // Write data in 'name_of_file_being_parsed.json'.
                        fs?.writeFile(`./EsprimaOutput/${file}.json`, strAst, (err: any): any => {
                            // if (err) throw err;
                        });

                        detectCallBackHell(jsonAst, 0, file);
                        console.log("\n");
                        detectBruteForce(fileContent);
                        console.log("\n");
                        isRegexVulnerable(jsonAst);
                        console.log("\n");
                        detectInputValidation(fileContent);
                        console.log("\n");
                        detectDangerousFunctions(jsonAst, fileContent);
                        console.log("\n");
                        insecureAuthentication(fileContent);
                        console.log("\n");
                        analyzeSecurityHeaders(fileContent);
                        console.log("\n");
                    } catch (error) {
                        console.log(error)
                        continue;
                    }
                }
            }
        } catch (error) {
            return null;
        }

    }
}

Log.NodeJsSecurifyResults();