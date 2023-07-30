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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const esprima = __importStar(require("esprima"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const colors = __importStar(require("colors"));
const child_process_1 = require("child_process");
const DetectCallBackHell_1 = require("./Vulnerability/DetectCallBackHell");
const DetectVulnerableRegex_1 = require("./Vulnerability/DetectVulnerableRegex");
const colours = colors;
class Log {
    static NodeJsSecurifyResults() {
        function extractParentPath(inputPath) {
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
            // testing command:
            // comment this before publishing
            // __dirname = "C:/Users/hp/Desktop/NodeSecurify/TestFolder"
            // process.exit(1);
            console.log("\n******************************************************************************************".green);
            console.log("****************************** Node-Js-Securify STARTED **********************************".green);
            console.log("******************************************************************************************".green);
            __dirname = extractParentPath(__dirname);
            console.log('\nSearching for .js files in (root directory) : '.yellow + __dirname.rainbow);
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
    static callPythonFunction(pythonScript, pythonFunction, args) {
        const pythonProcess = (0, child_process_1.spawn)('python', [pythonScript, pythonFunction, args]);
        pythonProcess.stdout.on('data', (data) => {
            const result = data.toString().trim();
            console.log(`Result: ${result}`);
        });
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error: ${data.toString()}`);
        });
        pythonProcess.on('close', (code) => {
            console.log(`Python process exited with code ${code}`);
        });
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
        return gitIgnoreFiles;
    }
    // Recursively traverse all the files in given directory path.
    // Ensure it does the same when installed by anyone in any directory of their system.
    // So make such changes to ensure the former. 
    static parseJSFiles(directory, gitIgnoreFilesArray) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    // Write data in 'name_of_file_being_parsed.json'.
                    fs === null || fs === void 0 ? void 0 : fs.writeFile(`./EsprimaOutput/${file}.json`, strAst, (err) => {
                        if (err)
                            throw err;
                    });
                    (0, DetectCallBackHell_1.detectCallBackHell)(jsonAst, 0, file);
                    yield Log.callPythonFunction("./dist/Vulnerability/DetectBruteForceAttack.py", fileContent, "detectCallBackHell");
                    ((0, DetectVulnerableRegex_1.isRegexVulnerable)(jsonAst));
                    console.log("\n");
                }
            }
        });
    }
}
exports.Log = Log;
Log.NodeJsSecurifyResults();
