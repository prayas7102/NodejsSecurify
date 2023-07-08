"use strict";
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
const fs = __importStar(require("fs"));
// Load the Esprima-parsed JSON file
const jsonFile = '/path/to/esprima_parsed_file.json';
const jsonData = fs.readFileSync(jsonFile, 'utf8');
const ast = JSON.parse(jsonData);
// Function names of dangerous functions to detect
const dangerousFunctions = ['eval', 'Function', 'setTimeout'];
// Traverse the AST recursively to find dangerous functions
function traverseAST(node, parent = null) {
    if (node.type === 'CallExpression') {
        const functionName = getFunctionName(node.callee);
        const location = node.loc;
        if (dangerousFunctions.includes(functionName)) {
            console.log('Dangerous function detected:');
            console.log('Function Name:', functionName);
            console.log('Line:', location.start.line);
            console.log('Column:', location.start.column);
            console.log('---');
        }
    }
    for (const key in node) {
        if (node[key] && typeof node[key] === 'object') {
            traverseAST(node[key], node);
        }
    }
}
// Get the name of the function from the CallExpression node
function getFunctionName(callee) {
    if (callee.type === 'Identifier') {
        return callee.name;
    }
    else if (callee.type === 'MemberExpression') {
        return getFunctionName(callee.property);
    }
    else {
        return '';
    }
}
// Start traversing the AST
traverseAST(ast);
