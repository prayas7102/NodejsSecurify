import * as fs from "fs";
import path from 'path';
import csv from 'csv-parser'; 

interface DatasetSample {
    code: string;
    label: number;
}

// Asynchronously Parsing dataset from CSV 
function parsingCSVData(csvPath: string): Promise<DatasetSample[]> {
    return new Promise((resolve, reject) => {
        const dataset: DatasetSample[] = [];
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (row) => {
                dataset.push({
                    code: row['code'].replace(/""/g, '"').replace(/\\n/g, '\n'), 
                    label: Number(row['label']),
                });
            })
            .on('end', () => {
                resolve(dataset);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

export {parsingCSVData};

// Load dataset from CSV
async function testCSVParser() {
    const csvPath = path.join(__dirname, "./datasets", "bruteForceDataset.csv");

    try {
        const dataset = await parsingCSVData(csvPath); // Wait for the Promise to resolve
        console.log("Parsed Dataset:", dataset); // Output the parsed dataset
    } catch (error) {
        console.error("Error loading CSV dataset:", error); // Log any errors that occur
    }
}

testCSVParser();