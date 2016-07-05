//  parser.js
//
import peg from 'pegjs';

const parserArguments = `
start
  = nl* first:line rest:(nl+ data:line { return data; })* nl* {
    rest.unshift(first); return rest;
  }

line = space first:command tail:(" " argument)* {
  var params = [];
  for (var i = 0; i < tail.length; i++) {
    params.push(tail[i][1]);
  }
  return {type:'CallExpression', operator:first, params: params}
}
//
argument "argument"
  = func / JSON / number / string
command "command"
= head:[^\\t\\n\\r )]* {
  return {type:"word", name:head.join("")};
}
func = "(" space space first:command tail:(" " argument)* space ")" {
  var params = [];
  for (var i = 0; i < tail.length; i++) {
    params.push(tail[i][1]);
  }
  return {type:'DelayExpression', operator:first, params: params}

 }
string "string" = s:[^\\t\\n\\r() ]+ {
  return {type:"value", value:s.join("")};
}
number "number" = num:[0-9]+ {
return {type: "value", value:parseInt(num.join(""), 10)};
}
comment "comment"
 = "#"+ [^\\n\\r]* { return ''; }
JSON = head:("{" $[^}]* "}") {
  return {type:"value", value:head.join("")};
}
space "space"
  = [ ]*
_ "whitespace"
  = [ \\t\\n\\r]*
nl "newline"
 = [\\n\\r]
`;

console.log(peg);

const parser = peg.buildParser(parserArguments.trim());

export const parseTest = (str) => {
  try {
    parser.parse(str.trim());
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err.message,
      line: err.location.start.line,
      column: err.location.start.column,
    };
  }
};
