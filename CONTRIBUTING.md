
---

## Contribution Guidelines

We welcome contributions to this project! Please follow the guidelines below to ensure that your contributions are easy to integrate:

1. **Fork the repository** to your GitHub account.

2. **Create a new branch** for your feature or bugfix:

    ```bash
    git checkout -b feature-name
    ```

3. **Commit your changes**:

    ```bash
    git add .
    git commit -m "Description of your changes"
    ```

4. **Push your branch** to your forked repository:

    ```bash
    git push origin feature-name
    ```

5. **Create a pull request** from your branch to the `main` branch of the original repository.

6. Ensure your pull request follows these guidelines:
    - Descriptive title and detailed description
    - Reference the issue number (if applicable)
    - Provide screenshots or test results if relevant
    - Make sure all tests pass

## Run Testcases

1. In ./src/NodeJsSecurify.ts (Check line 36-40) change mode to 'DEV' (switch to 'DEV' mode while testing and 'PROD' mode while pushing the code). And update __dirname path depending on the path of TestFolder according to your system.

Open 2 terminal in your vscode:

2. In first terminal run:
```bash
    npm run start
```
This command is watching your main TypeScript file (NodeJsSecurify.ts) and automatically recompiling them into JavaScript file (./dist/NodeJsSecurify.js) when changes are detected.
The above terminal would keep on running continously for realtime compilation.

3. In 2nd terminal run (to run tests in TestFolder):
```bash
    node ./dist/src/NodeJsSecurify.js
```
Run this after every change you make in source code.

4. Output:
The output would be generated in 2nd terminal as well as in a pdf (NodeJsSecurifyReport.pdf) or log file (NodeJsSecurifyReport.log) generated in your root dir.

### Unit And Integration Tests

To execute tests in the `tests/` directory, the following section in
`package.json` is included:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

Run `npm run test`, `yarn test`, or `pnpm test`─depending on your package
manager, and the testing framework will print test results in your terminal.

For more information, see the [writing tests] section.

## Coding Standards

- Follow the existing code style.
- Include comments where necessary to explain complex logic.
- Write unit tests for new features or fixes.
- Format your code (if using tools like Eslint etc.).

---

## Issue Tracking

We use GitHub Issues to track bugs, enhancements, and general questions. If you encounter a bug or have an idea for an enhancement, please:

1. Search existing issues to see if it's already reported.
2. If not, create a new issue and provide sufficient detail.

---

## Pull Requests

- PRs should be small and focused.
- Reference related issues in the pull request description.
- Each pull request should pass all checks (tests, linter, etc.) before review.

---

## License

This project is licensed under the **License: ** - [LICENSE.md](https://github.com/prayas7102/NodejsSecurify/blob/main/LICENSE) file for details.

[writing tests]: (https://vitest.dev/guide/#writing-tests)
