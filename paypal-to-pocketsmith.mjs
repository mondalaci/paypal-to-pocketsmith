#!/usr/bin/env node
import fs from 'node:fs';
import csv from 'async-csv';

const filename = process.argv[2];
const csvString = fs.readFileSync(filename);
const rows = (await csv.parse(csvString, {columns:true}))
rows.shift();
const validRows = rows.filter(row => row.Fee !== '');
const csvArray = validRows.map(row => {
    const name = row.Name || row['Item Title'];
    const nameType = name ? `${name} | ${row.Type}` : row.Type;
    const net = row.Net.replace(/ /g, '').replace(',00', '');
    return [row.Date, nameType, net];
});
console.log(await csv.stringify(csvArray))
