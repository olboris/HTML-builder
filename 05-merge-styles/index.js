const fs = require('fs');
const path = require('path');
const { stdout } = process;
let data = '';
let folderPath = path.dirname(__filename)+'/styles/';

fs.readdir(folderPath, (err, files) => {
    if (err)
    console.log(err);
    else {
        files.forEach(file => {  
            fs.stat(folderPath+file, (err, stats) => {
              if (err) {
              console.log(err)
                return
              }
              if (stats.isFile() && path.parse(folderPath+file).ext === '.css') {
                const output = fs.createWriteStream(path.dirname(__filename)+'/project-dist/'+'bundle.css');
                const readableStream = fs.createReadStream(folderPath+file, 'utf-8');
                readableStream.on('data', chunk => data+=chunk);
                readableStream.on('end', () => {
                    output.write(data);
                });
              };
            });
        });
    }
    stdout.write('Стили записаны в файл bundle.css в папке project-dist');
});