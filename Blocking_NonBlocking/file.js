const fs = require('fs');
const os = require('os');

console.log('1')
// Blocking synchronus task
const result = fs.readFileSync('copy.txt','utf-8')
console.log(result)
console.log('2')
console.log('3')
console.log('4')

// Non Blocking asynchronus task
console.log('1')
console.log('2')
console.log('3')
fs.readFile('copy.txt','utf-8',(err,res) => {
    try {
        console.log(res);
    } catch (error) {
        console.log(err);
    }
})
console.log('4')

// getting threads of your machine

console.log(os.cpus().length)