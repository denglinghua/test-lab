const cheerio = require('cheerio');

const fs = require('fs');

const inputFile = process.argv[2];

if (!inputFile) {
    console.error('Please provide an input file.');
    process.exit(1);
}

const html = fs.readFileSync(inputFile, 'utf8');

const $ = cheerio.load(html);

// Extract data from <div class="print-row"> that have multiple <span> children
const rows = [];
$('.print-row').each((index, element) => {
    if ($(element).find('span').length > 5) {
        const row = [];
        $(element).find('.print-line').each((i, el) => {
            row.push($(el).text().trim());
        });
        rows.push(row);
    }
});

// Convert rows to table format
const table = rows.map(row => row.join('\t')).join('\n');

// Output the table
console.log(table);

// Output the table to a file
fs.writeFileSync('output.txt', table);