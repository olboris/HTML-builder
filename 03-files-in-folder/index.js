const path = require('path');
const fs = require('fs');
const folderName = path.dirname(__filename)+'/secret-folder';

fs.readdir(folderName, (err, files) => {
    if (err)
      console.log(err);
    else {
      console.log("Current directory files information:");
      files.forEach(file => {  
          fs.stat(folderName+'/'+file, (err, stats) => {
            if (err) {
              console.error(err)
              return
            }
            if (stats.isFile()) {
              const fileInformation = path.parse(folderName+'/'+file);
              console.log(fileInformation.name + ' - ' + fileInformation.ext.slice(1) + ' - ' + stats.size / 1024 + 'kb');
            };
          });
      })
    }
  });