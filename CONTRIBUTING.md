# CONTRIBUTING

## Guidelines

We welcome contributions to this project! Please follow the guidelines below to
ensure that your contributions are easy to integrate:

1. **Fork the repository** to your GitHub account.

1. **Create a new branch** for your feature or bug fixes:

   ```bash
   git checkout -b feature-name
   ```

1. **Commit your changes**:

   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

1. **Push your branch** to your forked repository:

   ```bash
   git push origin feature-name
   ```

1. **Create a pull request** from your branch to the `main` branch of the
   original repository.

1. Ensure your pull request follows these guidelines:

   - descriptive title and detailed description
   - reference the issue number (if applicable)
   - provide screenshots or test results, if relevant
   - make sure all tests pass

## Run test cases

1. In `./src/NodeJsSecurify.ts` (on lines 36-40),

   1. Change mode to 'DEV' (switch to 'DEV' mode while testing and 'PROD' mode
      while pushing the code).

   1. Update `__dirname` path depending on the path of `TestFolder/`
      according to your system.

1. Now open two terminals in VSCode, or any other code editor or IDE.

1. In the first terminal run:

   ```bash
   npm run start
   ```

   This command watches your main TypeScript file `NodeJsSecurify.ts`, and
   automatically recompiles them into a JavaScript file
   `./dist/NodeJsSecurify.js`─on detecting changes.

   The above terminal continuously keeps on running for _real-time_ compilation.

1. In the second terminal─to run tests in `TestFolder/`, run :

   ```bash
   node ./dist/src/NodeJsSecurify.js
   ```

   Run this after every change you make in the source code.

1. The following outputs are generated:

   1. output is written to `stdout` (Standard Output) in the **second terminal**

   1. a PDF `NodeJsSecurifyReport.pdf` or _log file_ `NodeJsSecurifyReport.log`
      in your **root directory**

## Unit and integration tests

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
manager and the testing framework will print test results in your terminal.

For more information, see the [writing tests](https://vitest.dev/guide/#writing-tests)
section.

## Coding standards

- Follow the existing code style.
- Include comments where necessary to explain complex logic.
- Write unit tests for new features or fixes.
- Format your code (if using tools like `ESLint`, etc.).

---

## Issue tracking

We use GitHub Issues to track bugs, enhancements, and general questions.
If you encounter a bug or have an idea for an enhancement, please:

1. Look for existing issues that are related to yours.
1. If not, create a new issue and provide sufficient details.

---

## Pull requests

- Pull requests must be small and focused.
- Reference any related issues in the pull request description.
- Each pull request must pass all checks (tests, linting, etc.) before review.

---

## License

This project is licensed under the **License:** [LICENSE.md](https://github.com/prayas7102/NodejsSecurify/blob/main/LICENSE)
file for details.
