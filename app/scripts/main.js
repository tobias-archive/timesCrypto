/* jshint devel:true */
var test = UT.encrpyt('\'Allo \'Allo!', "this is my, key !!!! it is mine and no one else");

console.log(test)


var test0 = UT.decrypt( test, "this is my key it is mine and no one else");

console.log(test0)