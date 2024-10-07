import * as fs from 'fs';
import PDFDocument = require('pdfkit');
import * as path from 'path';

export function generatePDFReport(): void {
    const doc = new PDFDocument();
    const output = fs.createWriteStream('NodeJsSecurifyReport.pdf');

    doc.pipe(output);

    doc.fontSize(15).text('NodeJsSecurify Report', { align: 'center' });
    doc.moveDown();

    // Define the path to the log file
    const logFilePath = path.resolve(__dirname, 'consoleOutput.log');

    // Check if the log file exists; if not, create it
    if (!fs.existsSync(logFilePath)) {
        fs.writeFileSync(logFilePath, '', 'utf8'); // Create an empty log file
        console.log('consoleOutput.log file was not found, so a new one was created.');
    }

    // Read the log file content
    let logContent: string = fs.readFileSync(logFilePath, 'utf8');
    
    // Modify the content of the log
    const lines: string[] = logContent.split('\n');
    if (lines.length >= 3) {
        lines[2] = '****************************** Node-Js-Securify STARTED ***************************';
    }
    logContent = lines.join('\n');

    // Function to parse ANSI codes and write them to the PDF
    function parseAnsiToPdf(doc: PDFKit.PDFDocument, content: string) {
        const lines = content.split('\n');
        lines.forEach(line => {
            const regex = /\x1b\[(\d+)m/g;
            let match;
            let lastIndex = 0;
            while ((match = regex.exec(line)) !== null) {
                const colorCode = parseInt(match[1], 10);
                const text = line.substring(lastIndex, match.index);
                if (text) {
                    doc.fontSize(10).text(text, { continued: true });
                }
                switch (colorCode) {
                    case 30: doc.fillColor('black'); break;
                    case 31: doc.fillColor('red'); break;
                    case 32: doc.fillColor('green'); break;
                    case 33: doc.fillColor('maroon'); break;
                    case 34: doc.fillColor('blue'); break;
                    case 35: doc.fillColor('magenta'); break;
                    case 36: doc.fillColor('cyan'); break;
                    case 37: doc.fillColor('white'); break;
                    case 39: doc.fillColor('black'); break; // Reset to default color
                    default: break;
                }
                lastIndex = regex.lastIndex;
            }
            const remainingText = line.substring(lastIndex);
            if (remainingText) {
                doc.text(remainingText);
            }
            doc.text('\n');
        });
    }

    // Parse the ANSI codes from the log content and write them to the PDF
    parseAnsiToPdf(doc, logContent);

    // Finalize the PDF
    doc.end();
}

generatePDFReport();
