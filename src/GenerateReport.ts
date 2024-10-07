import * as fs from 'fs';
import PDFDocument = require('pdfkit');

function generatePDFReport(): void {
    const doc = new PDFDocument();
    const output = fs.createWriteStream('NodeJsSecurifyReport.pdf');

    doc.pipe(output);

    doc.fontSize(15).text('NodeJsSecurify Report', { align: 'center' });
    doc.moveDown();

    let logContent: string = fs.readFileSync('consoleOutput.log', 'utf8');
    const lines: string[] = logContent.split('\n');
    lines[2] = '****************************** Node-Js-Securify STARTED ***************************'
    logContent = lines.join('\n');
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

    parseAnsiToPdf(doc, logContent);


    doc.end();
}

generatePDFReport();