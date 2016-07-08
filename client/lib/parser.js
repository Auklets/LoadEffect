//  parser.js
//
import peg from 'pegjs';

const parserArguments = `
start = line

line = nl* first:linetype rest:(nl+ data:linetype { return data; })* {
  rest.unshift(first); return rest;
}

linetype = ifwhile / function / command / comment 

comment "comment"
 = "#" text

ifwhile "if/while" = type:("if" / "while") "(" head:command ")" _ "{" _ data:line _ "}" {
  return {type:type, operator:head, params: data}
}

command = space first:CallExpression tail:(" " argument)* {
  var params = [];
  for (var i = 0; i < tail.length; i++) {
    params.push(tail[i][1]);
  }
  return {type:'CallExpression', operator:first, params: params}
}
argument "argument" = string / subexpression / variable / primitive
subexpression = "(" space command:command space ")" {
  return command;
}

function "function"
 = "func " head:text "(" args:functionargs ")" _ "{" _ data:line _ "}"  {
  return {type:'function', operator:head, args: args, params: data}
}
functionargs = first:$[^),]* tail:("," space each:$[^),]* { return each;} )* {
  if (first === "") { return [];}
  tail.unshift(first); return tail;
}

variable = "$" variable:$ns+ {
  return {type:'variable', name:variable}
} 
//$ns+
CallExpression = $ns+

string = "'" str:$notquote* "'" {
  return {type:'primitive', value:str}
}

primitive = primitive:$ns+ {
  return {type:'primitive', value:primitive}
}
text = $ns*
_ "whitespace" = [ \\t\\n\\r]*
ns "non-special" = [^\\t\\n\\r(){} #]
notquote "not a single quote" = [^\\t\\n\\r(){}#']
nl "newline" = [\\n\\r\\t]
space "space" = [ ]*
`;

// console.log(peg);

// Function holder until we get this in an npm.  For static analysis
const globalEnv = {
  mult: (arg1, arg2, env) => true,
  add: (arg1, arg2, env) => true,
  eq: (arg1, arg2, env) => true,
  lt: (arg1, arg2, env) => true,
  gt: (arg1, arg2, env) => true,
  lte: (arg1, arg2, env) => true,
  gte: (arg1, arg2, env) => true,
  log: (arg1, env) => true,
  set: (variableName, primitiveValue, env) => true,
  get: (path, env) => true,
  fill: (selector, value, env) => true,
  pressButton: (selector, env) => true,
  randomstring: (length, env) => true,
};


const parser = peg.buildParser(parserArguments.trim());

const validityCheck = (actionList, gEnv) => {
  const isValid = (tree, errors, env) => {
    for (let i = 0; i < tree.length; i++) {
      const action = tree[i];
      if (action.type === 'CallExpression') {
        if (env[action.operator] === undefined || typeof env[action.operator] !== 'function') {
          errors.push(`${action.operator} is not a function`);
        }
      } else if (action.type === 'function') {
        // dummy action to assist in analysis.
        env[action.operator] = () => true;
      }
      if (action.params) {
        isValid(action.params, errors, env);
      }
    }
    return errors;
  };
  //  create a sub env because we will mutate the env to add functions defined in the tree.
  const subEnv = Object.create(gEnv);
  return isValid(actionList, [], subEnv);
};

//
// Test the parse of the string.  Returns an object with
// {success: true || false }
// If there is a failure, inlcude error, line and column in return object
export const parseTest = (str) => {
  let actions = [];
  try {
    actions = parser.parse(str.trim());
  } catch (err) {
    return { success: false, message: `${err.message} at 
      line ${err.location.start.line} 
      and column ${err.location.start.column}` };
  }
  const errors = validityCheck(actions, globalEnv);
  if (errors.length > 0) {
    return { success: false, message: `${errors.toString()}` };
  }

  return { success: true };
};
