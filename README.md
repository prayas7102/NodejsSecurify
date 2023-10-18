# NodejsSecurify

NodejsSecurify is an advanced (White Box Testing Automation) npm package designed to enhance the security of Node.js applications. It provides a comprehensive set of security features and analysis capabilities to identify potential vulnerabilities and enforce best practices in accordance with OWASP guidelines.

npm repo link: https://www.npmjs.com/package/node-js-securify
Detailed blog (highly recommended): https://pure-javascript-blogs.hashnode.dev/nodejssecurify-level-up-your-nodejs-app-security-with-this-npm-based-automation-package

With NodejsSecurify, developers can seamlessly integrate security checks into their Node.js projects. The package leverages a sophisticated code parsing mechanism, employing a powerful parser library like Acorn, Babel Parser, Esprima, or Recast, to analyze JavaScript code and identify security weaknesses.

# Key Features of NodejsSecurify:

## Code Parsing:
 NodejsSecurify employs a robust code parsing functionality, allowing developers to provide their Node.js code for analysis. The package parses the code and generates an Abstract Syntax Tree (AST) representation to examine the structure, statements, and expressions.

## OWASP Standards Compliance: 
NodejsSecurify aligns with OWASP security standards, including the OWASP Cheat Sheet, which covers a wide range of security concerns, such as input validation, output encoding, authentication, session management, and more. It enforces these best practices by checking the provided code against the recommended guidelines.

## A Blend of Techniques for Comprehensive Analysis
The diverse set of security checks is achieved through a combination of techniques. Some vulnerabilities are identified through logistic regression, while others are revealed by performing operations on the parsed code using Esprima or vanilla TypeScript. Additionally, simple if-else conditions play a crucial role in detecting certain vulnerabilities. This multi-faceted approach ensures a thorough and efficient analysis.

## Security Checks and Analysis: 
The package performs a series of security checks on the parsed code to identify potential vulnerabilities or insecure coding patterns. It focuses on detecting common security risks, such as: Input Validation, Dangerous Functions, DOS Attack, ReGex DOS Attack, Brute Force Attack, CallBack Hell, XSS Attack, Insecure Security Headers, Unsafe npm packages, Insecure Authentication, Code Injection.

## Detailed Reporting: 
NodejsSecurify generates detailed reports that highlight the identified security issues within the analyzed code. The reports provide developers with essential information, including the location of vulnerabilities, affected lines of code, and severity levels. This empowers developers to quickly identify and address security concerns.

## Continuous Updates and Maintenance: 
The package aims to stay up to date with the evolving security landscape. NodejsSecurify is actively maintained and periodically updated to address new security threats, enhance performance, and incorporate changes in the OWASP guidelines.


# Installation 

1. Install the package

```bash
npm i node-js-securify
```

then ..

2. Require Log class from node-js-securify in any .js file of your project

```bash
const { Log } = require("node-js-securify");
```

3. Call function NodeJsSecurifyResults() in the Log class from the same .js file

```bash
Log.NodeJsSecurifyResults();
```

4. Run that .js file directly or indirectly depending on your code infrastructure

5. Keep an eye on your console to check for vulnerability analysis
