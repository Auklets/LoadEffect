// parselang
const PEG = require('pegjs');

/*

A scenario looks like this:
site('localhost:4568')
.login({username: 'bill', password: '1234'})
.get('/')
.get('/fileListing')
.times(3).values({ "hello": "one"}).post('/newEntry')
.times(3).random().select('footerLinks').click()
.get('/logout');

site('www.hackreactor.com')
.loginJWT('/login', '', {username:'bill', password:'password'})
.get('/');


The parsing language will parse it to a list of actions and arguments

[
{action:'site', args:['localhost']},
{action:'login', args:[{username: 'bill', password: '1234'}]}
]

*/


const parserArguments = `
start = Chain
Chain = head:Cmd tail:(_ "." Cmd)* _ ";" {
  var result = [head], i;
  for (i = 0; i < tail.length; i++) {
    result.push(tail[i][2]);
  }
  return result;  
}
Cmd
 = head:[a-zA-Z]* "(" _  expr:args _ ")" {
  return {action:head.join(""), args: expr}
}
args = head:str tail:(tailArgs)* {
  if (!head) { return [] }
  return [head].concat(tail.map(function(a) { return a }));
}
tailArgs = ("," _ head:str) { return head;}

str = integer / "'" value:c "'" { return value; } / JSON / c
JSON = head:("{" $[^}]* "}") { return head.join("");}
integer = digits:[0-9]+ { return parseInt(digits.join(""), 10); }
c "char"
 = $[a-zA-Z0-9 :/{}.]*
_ "whitespace" 
  = [ \\t\\n\\r]*
`;

const parser = PEG.buildParser(parserArguments.trim());

module.exports = parser;
