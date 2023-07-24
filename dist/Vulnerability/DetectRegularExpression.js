"use strict";
// import * as esprima from 'esprima';
// import * as jsonfile from 'jsonfile';
// // Function to detect ReDoS in a parsed JavaScript file
// function detectReDoS(parsedFile: esprima.Program) {
//     const regexNodes: esprima.Node[] = [];
//     // Traverse the parsed file to find regular expression nodes
//     function traverseNode(node: esprima.Node) {
//         if (node.type === 'Literal' && typeof node.value === 'string') {
//             try {
//                 new RegExp(node.value);
//             } catch (error) {
//                 regexNodes.push(node);
//             }
//         }
//         // Recursively traverse child nodes
//         for (const key in node) {
//             if (typeof node[key] === 'object' && node[key] !== null) {
//                 traverseNode(node[key]);
//             }
//         }
//     }
//     // Start traversing the parsed file
//     traverseNode(parsedFile);
//     // Print information about ReDoS instances
//     regexNodes.forEach((node, index) => {
//         const { line, column } = node.loc?.start || { line: undefined, column: undefined };
//         console.log(`ReDoS detected at line ${line}, column ${column}`);
//     });
// }
// // Read and parse the .json file containing the parsed JavaScript
// const filePath = 'parsedFile.json';
// jsonfile.readFile(filePath, (err, parsedFile) => {
//     if (err) {
//         console.error('Error reading parsed file:', err);
//         return;
//     }
//     detectReDoS(parsedFile);
// });
