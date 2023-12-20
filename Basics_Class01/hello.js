console.log("hello World")

const maths = require('./maths')  // here we are just importing the methods created over the other js file
const {add , sub} = require('./maths') // destructuring the multiple methods of imported file

console.log(maths.add(2,8)); // used this for without destructuring the methods style import
console.log(add(2,8));  // used this with destructuring the methods style import


console.log(maths.sub(2,8));
console.log(sub(2,8));

console.log(prod(2,8));