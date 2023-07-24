"use strict";
// NodeJsSecurify, a typescript based npm package to secure your nodejs 
// application code according to OWASP guidelines and check for best 
// practices.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const esprima = __importStar(require("esprima"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const colors = __importStar(require("colors"));
const DetectCallBackHell_1 = require("./Vulnerability/DetectCallBackHell");
const colours = colors;
class Log {
    static NodeJsSecurifyResults() {
        try {
            // testing command:
            // __dirname = 'C:/Users/hp/Desktop/NodeSecurify/API_Based_Email_Sender';
            console.log('\nRoot Directory Name : '.yellow + __dirname.rainbow);
            // concat all the results from gitignore files
            let gitIgnoreFiles = Log.findGitIgnoreFiles(__dirname);
            let gitIgnoreFilesArray = gitIgnoreFiles.split('\n');
            console.log("\nFile names in .gitignore files not getting parsed: \n".yellow);
            // including node_modules in gitIgnoreFilesArray
            gitIgnoreFilesArray.push('node_modules');
            const arrayString = gitIgnoreFilesArray.join(", ");
            console.log(arrayString.cyan);
            // parsing all the .js & .jsx files, except files in gitIgnoreFilesArray
            console.log("\nFile path name of .js & .jsx files getting parsed: \n".yellow);
            Log.parseJSFiles(__dirname, gitIgnoreFilesArray);
            console.log("\n");
        }
        catch (error) {
            console.log("Error parsing file".underline.red);
            console.log("Please resolve error in file (check last file path) before running NodeJsSecurify".underline.red);
            console.error(error);
        }
    }
    // traversing all the gitignore files and including all the file names 
    // not be parsed in gitIgnoreFiles string
    static findGitIgnoreFiles(directory) {
        let gitIgnoreFiles = "";
        function traverseDirectory(dir) {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    // Recursively traverse subdirectories
                    traverseDirectory(filePath);
                }
                else if (file === '.gitignore') {
                    const fileContent = fs === null || fs === void 0 ? void 0 : fs.readFileSync(filePath, 'utf8');
                    gitIgnoreFiles += (fileContent);
                }
            });
        }
        traverseDirectory(directory);
        gitIgnoreFiles += ("\nVulnerability\ndist\nNodeJsSecurify.js");
        // testing command:
        // gitIgnoreFiles += ("\nBackend\nfrontend");
        return gitIgnoreFiles;
    }
    // Recursively traverse all the files in given directory path.
    // Ensure it does the same when installed by anyone in any directory of their system.
    // So make such changes to ensure the former. 
    static parseJSFiles(directory, gitIgnoreFilesArray) {
        let files = fs.readdirSync(directory);
        files = files.filter(function (e) {
            return gitIgnoreFilesArray.indexOf(e) === -1;
        });
        for (const file of files) {
            const filePath = path.join(directory, file);
            const stat = fs === null || fs === void 0 ? void 0 : fs.statSync(filePath);
            const fileLastName = path.extname(filePath);
            if (stat.isDirectory()) {
                // Recursively parse files in subdirectories
                Log.parseJSFiles(filePath, gitIgnoreFilesArray);
            }
            else if (fileLastName === '.js' || fileLastName === '.jsx') {
                console.log(filePath.blue);
                const fileContent = fs === null || fs === void 0 ? void 0 : fs.readFileSync(filePath, 'utf8');
                // Parse the file content using the esprima parser
                const jsonAst = esprima === null || esprima === void 0 ? void 0 : esprima.parseScript(fileContent, { loc: true, comment: true, tokens: true, tolerant: true, jsx: true });
                const strAst = JSON.stringify(jsonAst, null, 1);
                // // Write data in 'name_of_file_being_parsed.json'.
                fs === null || fs === void 0 ? void 0 : fs.writeFile(`./EsprimaOutput/${file}.json`, strAst, (err) => {
                    if (err)
                        throw err;
                });
                ((0, DetectCallBackHell_1.detectCallBackHell)(jsonAst, 0, file));
                console.log("\n");
            }
        }
    }
}
exports.Log = Log;
Log.NodeJsSecurifyResults();
