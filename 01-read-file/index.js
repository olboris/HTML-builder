const fs = require('fs');
const path = require('path');
const { stdout } = process;

const fileName = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(fileName, 'utf-8');
let data = '';

readableStream.on('data', chunk => data+=chunk);
readableStream.on('end', () => {
    stdout.write(data);
});  
readableStream.on('error', error => console.log('Error', error.message));