
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

Open 2 terminal in your vscode:

1. In first terminal concurrently run the main typescript file (NodeJsSecurify.ts) and it's javascript counterpart
```bash
    npm run start
```
(the above terminal would keep on running continously)

2. In 2nd terminal run (to run tests in TestFolder):
```bash
    node ./dist/NodeJsSecurify.js
```
Run this to see every change you make in source code to be reflected in the terminal.

### Coding Standards

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
