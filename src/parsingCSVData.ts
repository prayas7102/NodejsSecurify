import * as fs from "fs";
import path from 'path';
import csv from 'csv-parser'; 

interface DatasetSample {
    code: string;
    label: number;
}

let dataset: DatasetSample[] = [];

// Parsing dataset from CSV using callbacks
export function parsingCSVData(csvPath: string, callback: (error: Error | null, data?: DatasetSample[]) => void): void {
    const tempDataset: DatasetSample[] = [];

    fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
            tempDataset.push({
                code: row['code'].replace(/""/g, '"').replace(/\\n/g, '\n'), 
                label: Number(row['label']),
            });
        })
        .on('end', () => {
            dataset = tempDataset;
            callback(null, dataset); 
        })
        .on('error', (error) => {
            callback(error);
        });
}
