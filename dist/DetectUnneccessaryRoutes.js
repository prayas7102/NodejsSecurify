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
function detectUnnecessaryRoutes(parsedCode) {
    const errors = [];
    // Recursive function to traverse the AST and detect unnecessary routes
    function traverse(node, functionName) {
        if (node.type === 'CallExpression') {
            const { callee, arguments: args } = node;
            if (callee.type === 'MemberExpression' && callee.property.name === 'get') {
                if (args.length === 1) {
                    const { value: pathValue } = args[0];
                    if (typeof pathValue === 'string' && !pathValue.includes(':')) {
                        errors.push({
                            location: node.loc.start,
                            functionName,
                            columnName: callee.property.loc.start.column.toString(),
                        });
                    }
                }
            }
        }
        // Recursively traverse child nodes
        for (const key in node) {
            if (node.hasOwnProperty(key) && typeof node[key] === 'object' && node[key] !== null) {
                traverse(node[key], functionName);
            }
        }
    }
    // Traverse each function declaration and detect unnecessary routes
    parsedCode.body.forEach((node) => {
        if (node.type === 'FunctionDeclaration' && node.id) {
            const { id, body } = node;
            traverse(body, id.name);
        }
    });
    return errors;
}
// Read the parsed JSON file
const parsedCodeJson = fs.readFileSync('parsedCode.json', 'utf8');
// Parse the JSON
const parsedCode = JSON.parse(parsedCodeJson);
// Detect unnecessary routes
const errors = detectUnnecessaryRoutes(parsedCode);
// Print the errors with location information
errors.forEach((error) => {
    console.log(`Error at line ${error.location.line}, column ${error.location.column}:`);
    console.log(`Function: ${error.functionName}`);
    console.log(`Column: ${error.columnName}`);
    console.log('---');
});
