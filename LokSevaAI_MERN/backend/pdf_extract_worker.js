const fs = require('fs');
// Must use lib/pdf-parse.js directly — index.js has a debug mode that reads a missing test file when module.parent is null (i.e. when run as child_process)
const pdfParse = require('pdf-parse/lib/pdf-parse.js');

const filePath = process.argv[2];
if (!filePath) {
    console.error('No file path provided');
    process.exit(1);
}

const buffer = fs.readFileSync(filePath);
pdfParse(buffer)
    .then(data => {
        process.stdout.write(data.text || '');
        process.exit(0);
    })
    .catch(err => {
        console.error('PDF_EXTRACT_ERROR:', err.message);
        process.exit(2);
    });
