#!/usr/bin/env node
import fs from 'node:fs';
import csv from 'async-csv';

const filename = process.argv[2];
const csvString = fs.readFileSync(filename);
const rows = (await csv.parse(csvString, {columns:true}))
rows.shift();
const validRows = rows.filter(row => row.Fee !== '');
const csvArray = validRows.map(row => {
    const nameType = row.Name ? `${row.Name} | ${row.Type}` : row.Type;
    return [row.Date, nameType, row.Net];
});
console.log(await csv.stringify(csvArray))
