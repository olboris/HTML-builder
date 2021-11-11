const { copyFile } = require('fs');
const { stdout } = process;
const path = require('path');
const { mkdir } = require('fs/promises');
const fs = require('fs');

function copyDir() {
    mkdir(path.dirname(__filename)+'/files-copy', { recursive: true });
    fs.readdir(path.dirname(__filename)+'/files-copy', (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(path.dirname(__filename)+'/files-copy', file), err => {
          if (err) throw err;
        });
      }
    });
    fs.readdir(path.dirname(__filename)+'/files', (err, files) => {
        if (err)
        stdout.write(err);
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
      stdout.write('Файлы директории "files" скопированы в директорию "files-copy"');
  }

copyDir();