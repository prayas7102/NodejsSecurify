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
// Recursively traverse all the files in given directory path.
// Ensure it does the same when installed by anyone in any directory of their system.
// So make such changes to ensure the former. 
function findGitIgnoreFiles(directory) {
    let gitIgnoreFiles = "";
    function traverseDirectory(dir) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                traverseDirectory(filePath); // Recursively traverse subdirectories
            }
            else if (file === '.gitignore') {
                const fileContent = fs === null || fs === void 0 ? void 0 : fs.readFileSync(filePath, 'utf8');
                // console.log(typeof(fileContent));
                gitIgnoreFiles += (fileContent);
            }
        });
    }
    traverseDirectory(directory);
    return gitIgnoreFiles;
}
function parseJSFiles(directory, gitIgnoreFilesArray) {
    let files = fs.readdirSync(directory);
    files = files.filter(function (e) { return gitIgnoreFilesArray.indexOf(e) !== -1; });
    for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs === null || fs === void 0 ? void 0 : fs.statSync(filePath);
        if (stat.isDirectory()) {
            parseJSFiles(filePath, gitIgnoreFilesArray); // Recursively parse files in subdirectories
        }
        else if (path.extname(filePath) === '.js') {
            // console.log(filePath);
            const fileContent = fs === null || fs === void 0 ? void 0 : fs.readFileSync(filePath, 'utf8');
            // Parse the file content using the esprima parser
            const jsonAst = esprima === null || esprima === void 0 ? void 0 : esprima.parseScript(fileContent, { loc: true, comment: true, tokens: true, tolerant: true });
            const strAst = JSON.stringify(jsonAst, null, 1);
            // Write data in 'name_of_file_being_parsed.json'.
            fs === null || fs === void 0 ? void 0 : fs.writeFile(`./EsprimaOutput/${file}.json`, strAst, (err) => {
                if (err)
                    throw err;
            });
        }
    }
}
try {
    __dirname = 'C:/Users/hp/Desktop/NodeSecurify/API_Based_Email_Sender';
    let gitIgnoreFiles = findGitIgnoreFiles(__dirname);
    let gitIgnoreFilesArray = gitIgnoreFiles.split('\n');
    parseJSFiles(__dirname, gitIgnoreFilesArray);
}
catch (error) {
    console.error("Error parsing file:", error);
}
class Log {
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
exports.Log = Log;
