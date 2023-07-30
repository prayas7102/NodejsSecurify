export declare class Log {
    static NodeJsSecurifyResults(): void;
    static callPythonFunction(pythonScript: string, pythonFunction: string, args: string): void;
    static findGitIgnoreFiles(directory: string): string;
    static parseJSFiles(directory: string, gitIgnoreFilesArray: string[]): Promise<void>;
}
