const fs = require('fs');
const readline = require('readline');
const { stdout } = process;
//const output = fs.createWriteStream('./02-write-file/text.txt');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
 });

stdout.write('Введите текст (для выхода нажмите ctrl+c или введите exit)\n');
const output = fs.createWriteStream('./02-write-file/text.txt');
rl.on('line', (line) => {
  if (line === 'exit') {
    rl.close();
  } else {
    output.write(line+'\n');
  }
});
rl.on('close', () => {
    stdout.write('До свидания!');
});