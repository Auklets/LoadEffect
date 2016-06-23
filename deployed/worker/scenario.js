const parser = require('./parselang.js');
const request = require('request');
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

const parse = (str) => {
  try {
    return parser.parse(str.trim());
  } catch (err) {
    console.log('error parsing scenario', err.message, 'at line', err.location.start.line,
      ', column', err.location.start.column);
    return undefined;
  }
};

const run = (site, command) => {
  const actions = parse(command);
  if (actions === undefined) {
    console.log('script parsing failed.  ending');
    return Promise.reject('script parsing failed.  ending');
  }

  let i = 0;
  return Promise.resolve({ site }).then(function loop(modifiers) {
    //  console.log(i);
    if (i < actions.length) {              // The post iteration increment
      return execute(actions[i++], modifiers).then(loop).catch((err) => {
        console.log('fail', err);
        Promise.reject(err);
      });
    }
  });
};


const env = {};
const execute = ({ action, args }, modifiers) => {
  return new Promise((resolve, reject) => {
    // console.log('evaluation ', action);
    try {
      // console.log('calling ', action, ' with args:', args);
      env[action].apply(null, [modifiers].concat(args)).then(resolve).catch(reject);
    } catch (err) {
      reject(err);
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
        console.log(res.statusCode, res.elapsedTime, length);
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
      resolve();
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
      resolve(res);
    })
    .catch((err) => {
      console.log('error received during http request.');
      reject(err);
    });
  });
};

env.times = (modifiers, number) => {
  return new Promise((resolve, reject) => {
    modifiers.times = number;
    resolve(modifiers);
  });
};


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
      resolve(modifiers);
    })
    .catch((err) => {
      console.log('error received during http request.', err);
      reject(err);
    });
  });
};


module.exports = { timedRequest, run, parse };

