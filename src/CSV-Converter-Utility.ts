import fs from 'fs';

interface DatasetSample{
    code: string;
    label: number;
}

function convertDatasetToCSV(dataset: DatasetSample[], outputPath: string): void{
    const csvContent = dataset.map(sample => {
        // Escape double quotes and newlines in the code
        const escapedCode = sample.code.replace(/"/g, '""').replace(/\n/g, '\\n');
        return `"${escapedCode}",${sample.label}`;
    }).join('\n');

    const header = 'code,label\n';
    const fullContent = header + csvContent;

    fs.writeFileSync(outputPath, fullContent, 'utf-8');
    console.log(`CSV file saved to ${outputPath}`);
}

export {convertDatasetToCSV};
