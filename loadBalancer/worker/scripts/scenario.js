const parser = require('./parselang.js');
const request = require('request');
/*


How to use this module.

run: parse and execute the script on the passed server.

Arguments:
<Host>, <Language String>
Returns:

The language is very simple right now. See below for descriptions of what you can send.
scripting language:

login('/path', {"username":"username", "password":"password"})
Arguments:
<Path>, <JSON arguments to send the server>
Description:
Login log's into a website that uses cookies as authentication.  It stores the cookies
for each subsequent request.

get('/path')
Arguments:
<Path>
Description:
performs a get request on the target server.

post('/path')
Arguments:
<Path>
Description:
performs a post request on the target server.

These commands are chained with a period to create a user scenario.

login('/path', {"username":"username", "password":"password"})
.get('/')
.post('/newEntry')

parse:  Send in a string to parse in the scripting language.  It returns an object containing all
the commands to run.
Arguments: <Language String>

*/

const parse = (str) => {
  try {
    return parser.parse(str.trim());
  } catch (err) {
    console.log('error parsing', err.message, 'at line', err.location.start.line,
      ', column', err.location.start.column);
    return undefined;
  }
};

const env = {};
const execute = ({ action, args }, modifiers) =>
  new Promise((resolve, reject) => {
    // console.log('evaluation ', action);
    try {
      // console.log('calling ', action, ' with args:', args);
      env[action].apply(null, [modifiers].concat(args)).then(resolve).catch(reject);
    } catch (err) {
      reject(err);
    }
  });

const run = (site, command) => {
  const actions = parse(command);
  if (actions === undefined) {
    console.log('script parsing failed.  ending');
    return Promise.reject('script parsing failed.  ending');
  }

  let i = 0;
  const startTime = new Date().getTime();
  const transactionTimes = [];
  return Promise.resolve({ site, transactionTimes }).then(function loop(modifiers) {
    //  console.log(i);
    if (i < actions.length) {              // The post iteration increment
      return execute(actions[i++], modifiers).then(loop).catch((err) => {
        console.log('fail', err);
        Promise.reject(err);
      });
    } else {
      const endTime = new Date().getTime();
      const results = {
        scenarioTime: endTime - startTime,
        transactionTimes: modifiers.transactionTimes,
      };
      return Promise.resolve(results);
    }
  });
};

const timedRequest = (requestInfo, cookies) => {
  requestInfo.time = true;
  if (cookies !== undefined) {
    requestInfo.jar = cookies;
  }
  return new Promise((resolve, reject) => {
    const req = request(requestInfo).on('response', (res) => {
      let length = 0;
      let data = '';
      res.on('data', (chunk) => {
        length += chunk.length;
        data += chunk;
      });
      res.on('end', () => {
        //  console.log('rinfo:', requestInfo);
        //  console.log('data,', data);
        res.scenario_length = length;
        resolve(res);
      });
    });
    req.on('error', reject);
  });
};
// const runPromisesSynchronouslyTimesN = (n, promiseToRun) => {
//   var count = 0;
//   Promise.resolve(0).then(function loop(i) {
//     if (count < n) {
//       count++;
//       return promiseToRun.then(loop);
//     }
//   }).then(function() {
//       console.log("done");
//   }).catch(function(e) {
//       console.log("error", e);
//   });
// };

env.get = (modifiers, path) => {
  let { site, times, random, select, values } = modifiers;
  // console.log('called get with', path, ' for times: ', times);
  times = times || 1;

  return new Promise((resolve, reject) => {
    timedRequest({
      method: 'GET',
      url: site + path,
    }, modifiers.cookies)
    .then((res) => {
      // console.log(res);
      modifiers.transactionTimes.push([path, res.statusCode, res.elapsedTime, res.scenario_length]);
      resolve(modifiers);
    })
    .catch((err) => {
      console.log('error received during http request.');
      reject(err);
    });
  });

};
env.post = (modifiers, path) => {
  const {site, times, random, select, values} = modifiers;
  //  console.log('called post with', args);
  return new Promise((resolve, reject) => {
    timedRequest({
      method: 'POST',
      url: site + path,
    }, modifiers.cookies)
    .then((res) => {
      modifiers.transactionTimes.push([path, res.statusCode, res.elapsedTime, res.scenario_length]);
      resolve(modifiers);
    })
    .catch((err) => {
      console.log('error received during http request.');
      reject(err);
    });
  });
};

env.times = (modifiers, number) =>
  new Promise((resolve, reject) => {
    if (!modifiers) {
      reject('modifiers does not exist');
    }
    modifiers.times = number;
    resolve(modifiers);
  });


env.login = (modifiers, path, data) => {
  // console.log('path:', path);
  // const {site, times, random, select, values} = modifiers;

  return new Promise((resolve, reject) => {
    let j = request.jar();
    timedRequest({
      method: 'POST',
      url: modifiers.site + path,
      json: JSON.parse(data),
      time: true,
      jar: j,
    })
    .then((res) => {
      modifiers.cookies = j;
      modifiers.transactionTimes.push([path, res.statusCode, res.elapsedTime, res.scenario_length]);
      resolve(modifiers);
    })
    .catch((err) => {
      console.log('error received during http request.', err);
      reject(err);
    });
  });
};

/*
 * Questions:
  1.  Times.
  3.  Download currentPage and manipulate it? cheerio?
  5.  Proxy and record?

  Issues:
  JSON tries to escape characters.

  TODO:
  1. GWT
  2. fix .times(N) to work
  3. follow redirects
*/
// login('/login', 'jwt || cookie', [userPassFile], username, password)
// const scenario = `
// site('localhost:4568')
// .login({username: 'bill', password: 'password'})
// .get('/')
// .post()
// .times(3).get('/fileListing')
// .times(3).values({ "hello": "one"}).post('/newEntry')
// .times(3).random().select('footerLinks').click()
// .get('/logout');
// `;

module.exports = { timedRequest, run, parse };

