const fs = require('fs');
const path = require('path');

const fileName = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(fileName, 'utf-8');
let data = '';

readableStream.on('data', chunk => data+=chunk);
readableStream.on('end', () => {
    let arr = data.split('');
    let index;
    for (let i = arr.length - 1; i>=0; i--) {
        if ((arr[i] === '\n') & (!arr[i+1] || arr[i+1] === '\n')) {
            index = i;
        }
    }
    arr.splice(index, arr.length - index);
    console.log(arr.join(''));
});  
readableStream.on('error', error => console.log('Error', error.message));