const path = require('path');
const fs = require('fs');
const { copyFile } = require('fs');
const { mkdir } = require('fs/promises');
const { stdout } = process;
let data = '';
let html = '';
let templatePath = path.join(__dirname, 'template.html');
let componentsPath = path.join(__dirname, 'components');
const readableStream = fs.createReadStream(templatePath, 'utf-8');
let stylesPath = path.dirname(__filename)+'/styles/';

mkdir(path.dirname(__filename)+'/project-dist', { recursive: true });

readableStream.on('data', chunk => html+=chunk);
readableStream.on('end', () => {
    fs.promises.readdir(componentsPath)
    .then(function(files){
        files.forEach(file => {
            fs.stat(path.join(componentsPath, file), (err, stats) => {
                if (err) {
                    console.log(err)
                      return
                    }
                if (stats.isFile() && path.parse(path.join(componentsPath, file)).ext === '.html') {
                    fs.promises.readFile(path.join(componentsPath, file), 'utf-8')
                    .then(function(data) {
                        const output = fs.createWriteStream(path.dirname(__filename)+'/project-dist/'+'index.html');
                        html = html.replace(`{{${path.parse(path.join(componentsPath, file)).name}}}`, data);
                        output.write(html);
                    })
                    .catch(function(error) {
                        console.log(error);
                     })
                }
            });
        });
    })
    .catch(function(error) {
        console.log(error);
     });
});

fs.readdir(stylesPath, (err, files) => {
    if (err)
    console.log(err);
    else {
        files.forEach(file => {  
            fs.stat(stylesPath+file, (err, stats) => {
              if (err) {
                console.log(err)
                return
              }
              if (stats.isFile() && path.parse(stylesPath+file).ext === '.css') {
                const output = fs.createWriteStream(path.dirname(__filename)+'/project-dist/'+'style.css');
                const readableStream = fs.createReadStream(stylesPath+file, 'utf-8');
                readableStream.on('data', chunk => data+=chunk);
                readableStream.on('end', () => {
                    output.write(data);
                });
              };
            });
        });
    }
});

mkdir(path.dirname(__filename)+'/project-dist'+'/assets', { recursive: true });
fs.readdir(path.dirname(__filename)+'/assets', (err, folders) => {
    if (err)
    console.log(err);
    else {
        folders.forEach(folder => {
            mkdir(path.dirname(__filename)+'/project-dist/assets/'+folder, { recursive: true });
            fs.promises.readdir(path.dirname(__filename)+'/assets/'+folder)
            .then(function(files) {
                files.forEach(file => {
                    copyFile(`${path.dirname(__filename)}/assets/${folder}/${file}`, `${path.dirname(__filename)}/project-dist/assets/${folder}/${file}`, function(err) {
                        if (err) {
                            console.log(err);
                          }
                    })
                })
            })
            .catch(function(error) {
                console.log(error);
             }) 
        })
    }
});