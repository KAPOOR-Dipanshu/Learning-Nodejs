const { randomInt } = require("crypto");
const fs = require("fs");

/* this function under fs- file system module is used where we just pass the file path
and the content of the file , And it overrites the pre written content
*/
fs.writeFileSync("./test.txt", "npm run dev");

/* this function under fs- file system module is used where we just pass the file path
and the content of the file and a call back func that is called when file process success or fails
*/
fs.writeFile("./test.txt", "npm run start", (error) => {
  console.log(error);
});

const result = fs.readFileSync("./test2.txt", "utf-8");
console.log(result);

fs.readFile("./test2.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
}); // this function requires a call back function and does not return the value of the content of the file

/*
    appendFile gives you functionality to append the following data to a desired file and 
    a call back function to handle error
*/
fs.appendFile(
  "./test2.txt",
  `${Date.now()} : 192.168.0.${randomInt(0,9)} : your route`,
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);

/*
    appendFileSync gives you functionality to append the following data to a desired file 
    no call back function to handle error. We have to use try catch block to handle the errors
*/
try {
  fs.appendFileSync(
    "./test3.txt",
    `${Date.now()} : 192.168.0.${randomInt(0,9)} : your route`
  );
} catch (error) {
    console.log(error)
}

/*
    cpSync gives you functionality to copy a source file to a desired file if the desired file is not present it 
    will create the destination file
*/
fs.cpSync('./test3.txt','./copy.txt')

/*
    unlinkSync gives you functionality to 
*/
fs.unlinkSync('./test.txt')