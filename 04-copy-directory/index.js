const { copyFile } = require('fs');
const path = require('path');
const { mkdir } = require('fs/promises');
const fs = require('fs');

function copyDir() {
    mkdir(path.dirname(__filename)+'/files-copy', { recursive: true });
    fs.readdir(path.dirname(__filename)+'/files', (err, files) => {
        if (err)
          console.log(err);
        else {
          files.forEach(file => {  
              copyFile(`${path.dirname(__filename)}/files/${file}`, `${path.dirname(__filename)}/files-copy/${file}`, function(err) {
                if (err) {
                  console.log("Error Found:", err);
                }
              });
        });
}
    });
    console.log('Файлы директории "files" скопированы в директорию "files-copy"');
  }

copyDir();