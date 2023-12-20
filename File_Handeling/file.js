const fs = require("fs");

/* this function under fs- file system module is used where we just pass the file path
and the content of the file , And it overrites the pre written content
*/
fs.writeFileSync('./test.txt',"npm run dev")  

/* this function under fs- file system module is used where we just pass the file path
and the content of the file and a call back func that is called when file process success or fails
*/
fs.writeFile('./test3.txt',"npm run start",(error) => {console.log(error)})

const result = fs.readFileSync("./test2.txt",'utf-8')
console.log(result)