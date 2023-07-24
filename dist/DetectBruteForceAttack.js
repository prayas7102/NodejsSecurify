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
const esprima = __importStar(require("esprima"));
function detectBruteForcing(code) {
    const ast = esprima.parseScript(code);
    const errorLocations = [];
    function traverse(node) {
        if (node.type === 'ForStatement' && node.test) {
            if (node.test.type === 'BinaryExpression' && node.test.operator === '<') {
                const rightValue = node.test.right;
                if (rightValue.type === 'Literal' && typeof rightValue.value === 'number') {
                    const errorLocation = {
                        line: node.loc.start.line,
                        column: node.loc.start.column,
                        functionName: getEnclosingFunction(node)
                    };
                    errorLocations.push(errorLocation);
                }
            }
        }
        for (const key in node) {
            if (node.hasOwnProperty(key) && typeof node[key] === 'object' && node[key] !== null) {
                traverse(node[key]);
            }
        }
    }
    function getEnclosingFunction(node) {
        let parent = node;
        while (parent && parent.type !== 'FunctionDeclaration' && parent.type !== 'FunctionExpression' && parent.type !== 'ArrowFunctionExpression') {
            parent = parent.parent;
        }
        return parent && parent.id && parent.id.name ? parent.id.name : 'Anonymous Function';
    }
    traverse(ast);
    return errorLocations;
}
// Example usage:
const jsonString = `{"type": "Program","body": [{"type": "ForStatement","init": {"type": "Literal","value": 0},"test": {"type": "BinaryExpression","operator": "<","left": {"type": "Identifier","name": "i"},"right": {"type": "Literal","value": 100}},"update": {"type": "UpdateExpression","operator": "++","argument": {"type": "Identifier","name": "i"}},"body": {"type": "BlockStatement","body": []}}]}`;
const parsedCode = JSON.parse(jsonString);
const code = parsedCode.body.map((item) => item.type === 'Literal' ? item.value : item).join('\n');
const errors = detectBruteForcing(code);
console.log(errors);
