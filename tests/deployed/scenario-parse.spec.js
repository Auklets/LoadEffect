/* eslint-env mocha */
// const should = require('chai').should();
const parser = require('../../deployed/worker/parselang.js');

describe('Parse should understand the syntax and fail appropriately', () => {
  it('will fail on mismatched parens', () => {
    let script = 'site(\'www.hackreactor.com\';';
    (() => parser.parse(script.trim())).should.throw('SyntaxError');

    script = 'site\'www.hackreactor.com\');';
    (() => parser.parse(script.trim())).should.throw('SyntaxError');
  });

  it('requires a colon at the end', () => {
    let script = 'site(\'www.hackreactor.com\');';
    (() => parser.parse(script.trim())).should.not
      .throw('Expected "." or ";" but end of input found');

    script = 'site(\'www.hackreactor.com\')';
    (() => parser.parse(script.trim())).should.throw('Expected "." or ";" but end of input found');
  });

  it('parses multiple functions', () => {
    const script = 'site(\'www.hackreactor.com\').login(\'/login\');';
    (() => parser.parse(script.trim())).should.not.throw('SyntaxError');
  });

  it('handles newlines and spaces between functions', () => {
    const script = `site('www.hackreactor.com')
                  .login('/login');`;
    (() => parser.parse(script.trim())).should.not.throw('SyntaxError');
  });

  it('displays the correct line and column when failing', () => {
    const script = `site('www.hackreactor.com'.login('/login');`;
    try {
      parser.parse(script);
    } catch (err) {
      (err.location.start.line).should.equal(1);
      (err.location.start.column).should.equal(27);
      //  err.location.start.line, ', column', err.location.start.column
      //  .should.not.throw('SyntaxError');
    }
  });
});

describe('Parse should get the correct number of functions and arguments', () => {
  it('understands 1 - 3 functions', () => {
    const initial = 'get(\'/\')';
    let script = initial;
    for (let i = 1; i <= 3; i++) {
      parser.parse(script + ';').should.have.length(i);
      script += '.' + initial;
    }
  });

  it('understands 0 - 3 arguments', () => {
    for (let i = 0; i <= 3; i++) {
      // generate a array string of i size, with values 1,2,3....
      const script = 'site(' + Array.apply(0, Array(i)).map((x, y) => y + 1).join(',') + ');';
      // check the size of the returned arguments array for the first command
      parser.parse(script)[0].args.should.have.length(i);
    }
  });
});

describe('Parse should get the correct action and arguments', () => {
  it('gets the function name', () => {
    const script = 'site();';
    parser.parse(script)[0].action.should.equal('site');
  });
  it('gets both strings and numers as argument ', () => {
    const script = 'site(\'1\',2,3);';
    parser.parse(script)[0].args.should.eql(['1', 2, 3]);
  });

  describe('Parse should read json', () => {
    xit('gets the function name', () => {
      const script = `values({bill: 'one'});`;
      parser.parse(script)[0].args[0].should.eql({ bill: 'one' });
    });
  });
});
