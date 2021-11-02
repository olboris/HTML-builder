const fs = require('fs');
const readline = require('readline');
const { stdout } = process;

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
 });

function writeFile(text) {
  fs.appendFile('./02-write-file/text.txt', text+'\n', function(err) {
    if(err) {
        return (err);
    }
  });
}

stdout.write('Введите текст (для выхода нажмите ctrl+c или введите exit)\n');
rl.on('line', (line) => {
  if (line === 'exit') {
    rl.close();
  } else {
    writeFile(line);
  }
});
rl.on('close', () => {
    stdout.write('До свидания!');
});