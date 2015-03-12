var factory = require("./index.js");
var f1 = function() {};
factory.install("f2", f1);
var f2 = factory("f2");

console.log(f2); // f1 function
console.log(f2 == f1); // true