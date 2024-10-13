import { assert } from "node:console";

export function parseCSV(csv_data: string) {
    const [header_line, ...lines] = csv_data.trim().split('\n');
    const headers = header_line.split(',');
    assert(headers.length == 2 && headers[0] == 'code' && headers[1] == 'label');

    const parsed_records = new Array(lines.length); // desired result
    const values = ["", 0]; // mutable *const slice
    for (let i = 0; i < lines.length; i += 1) {
        assert(values.length == 2);
        const line = lines[i];
        const last_comma_index = line.lastIndexOf(',');

        const raw_code = line.slice(0, last_comma_index);
        const parsed_code = raw_code.slice(1, -1); // strip surrounding quotes
        assert(parsed_code[0] !== `"` && parsed_code[parsed_code.length - 1] !== `"`);

        const raw_label = line.slice(last_comma_index + 1);
        const parsed_label = parseInt(raw_label, 10);
        assert(!isNaN(parsed_label) && (parsed_label >= 0 || parsed_label <= 1));

        values[0] = parsed_code;
        values[1] = parsed_label;

        const record: Record<string, string | number> = {}; // `DatasetSample`
        for (let j = 0; j < headers.length; j += 1) {
            record[headers[j]] = values[j];
        }
        parsed_records[i] = record;
    }
    assert(parsed_records[parsed_records.length - 1] !== undefined);

    return parsed_records;
}
