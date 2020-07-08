const { crush, defaults, version } = require("html-crush")
const fs = require('fs')

let inputArgs = process.argv.slice(2)
let inputNumber = process.argv.slice(3)
let inputLength = parseInt(inputNumber[0], 10)

function getExtension(filename) {
  return filename.split('.').pop();
}

if (inputArgs[0] !== undefined) {
  if (inputArgs[0] === '-h' | inputArgs[0] === '--help' | inputArgs[0] === '') {
    console.log('Usage: html-crush [input HTML file] [line length limit]')
  } else if (getExtension(inputArgs[0]) === 'html') {
    if (typeof inputLength != 'number') {
      inputLength = 500
    }
    fs.readFile(inputArgs[0], 'utf8', function (err,data) {
      if (err) {
        return console.log(err)
      }
      const res = crush(data, { removeLineBreaks: true, lineLengthLimit: inputLength } ).result
      fs.writeFile(inputArgs[0], res, function (err) {
        if (err) return console.log(err);
        console.log('Done. ');
      });
    })
  } else {
    console.log('Invalid input file. ')
  }
} else {
  console.log('Invalid argument. ')
}