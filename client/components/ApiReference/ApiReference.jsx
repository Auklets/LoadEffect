import React from 'react';
import { Panel, ListGroup, ListGroupItem, Form, FormGroup, ControlLabel, Col, Button, Well, Grid, Table } from 'react-bootstrap';

const ApiReference = () => {
  return (
    <Panel className="scenario-documentation">


      <h1>API</h1>


      <Panel collapsible defaultExpanded header="get [path]">
        Navigates to the path on the specified server.
        <ListGroup fill>
          <ListGroupItem>usage:</ListGroupItem>
          <ListGroupItem>get /</ListGroupItem>
          <ListGroupItem>get /signup</ListGroupItem>
        </ListGroup>
      </Panel>

      <Panel collapsible defaultExpanded header="pressButton [buttonText]">
        Presses the button on the page.
        <ListGroup fill>
          <ListGroupItem>usage:</ListGroupItem>
          <ListGroupItem>pressButton 'Submit'</ListGroupItem>
          <ListGroupItem>pressButton 'Log In'</ListGroupItem>
        </ListGroup>
      </Panel>

      <Panel collapsible defaultExpanded header="fill [selector, value]">
        Inputs text into a field.
        <ListGroup fill>
          <ListGroupItem>usage:</ListGroupItem>
          <ListGroupItem>fill username 'bill'</ListGroupItem>
          <ListGroupItem>fill password '1234'</ListGroupItem>
        </ListGroup>
      </Panel>

      <Panel collapsible defaultExpanded header="set [variable name] [value]">
        set creates a variable and assigns it a value.
        <ListGroup fill>
          <ListGroupItem>usage:</ListGroupItem>
          <ListGroupItem>set x 1</ListGroupItem>
          <ListGroupItem>set x 'hi'</ListGroupItem>
          <ListGroupItem>set x (add $x 1)</ListGroupItem>
        </ListGroup>
        x can now be referred to with a $ to access the value.

        set can also take the value of a expression
      </Panel>

      <Panel collapsible defaultExpanded header="randomstring [length]">
        Returns a random string of the specified length.  Currently softly restricts to 24 or less size.
        Useful for filling out random user names and passwords.
        <ListGroup fill>
          <ListGroupItem>usage:</ListGroupItem>
          <ListGroupItem>set password (randomstring 10)</ListGroupItem>
        </ListGroup>
      </Panel>


      <h3>Math and Comparators</h3>

      <Panel collapsible defaultExpanded header="Math">
        <ListGroup fill>
          <ListGroupItem>
            <Table>
              <tr>
                <td>mult [value1 value2]</td>
                <td>return the value of the two variables multiplied together</td>
              </tr>
              <tr>
                <td>add [value1 value2]</td>
                <td>return the value of the two variables added together</td>
              </tr>
            </Table>
          </ListGroupItem>

        </ListGroup>
      </Panel>

      <Panel collapsible defaultExpanded header="Comparators">
        <ListGroup fill>
          <ListGroupItem>
            <Table>
              <tr>
                <td className="commandtext">eq [value1 value2]</td>
                <td>return true or false depending on equality</td>
              </tr>
              <tr>
                <td className="commandtext">lt [value1 value2]</td>
                <td>return true/false depending on whether the first value 
                  is less than the second value
                </td>
              </tr>
              <tr>
                <td className="commandtext">lte [value1 value2]</td>
                <td>return true/false depending on whether the first value is
                    less than or equal to the second value
                </td>
              </tr>
              <tr>
                <td className="commandtext">gt [value1 value2]</td>
                <td>return true/false depending on whether the first value is
                  greater than the second value
                </td>
              </tr>
              <tr>
                <td className="commandtext">gte [value1 value2]</td>
                <td>return true/false depending on whether the first value is
                  greater than or equal to the second value
                </td>
              </tr>
            </Table>
          </ListGroupItem>
        </ListGroup>
      </Panel>

      <h3>Control Statements</h3>

      <Panel collapsible defaultExpanded header="if([expression]) { code }">
        If the expression evaluates to true, execute the code
        <ListGroup fill>
          <ListGroupItem>usage:</ListGroupItem>
          <ListGroupItem>
          {'if([expression]) {'} <br />
          {'...code...'} <br />
          {'}'} <br />
          </ListGroupItem>
        </ListGroup>
      </Panel>
      <Panel collapsible defaultExpanded header="while([expression]) { code }">
        while the expression evaluates to true, execute the code
        <ListGroup fill>
          <ListGroupItem>usage:</ListGroupItem>
          <ListGroupItem>
          {'set x 1'} <br />
          {'while(lte $x 4) {'} <br />
          {'set x (add $x 1)'} <br />
          {'}'} <br />
          </ListGroupItem>
        </ListGroup>
        expression in this case takes on the form of
        (lte $x 5)
        using the comparators lte, gte, lt, or gt
        variables created in while and if statements will not be available elsewhere,
        however parent variables are accessible
      </Panel>

      <h3>Functions</h3>

      <Panel collapsible defaultExpanded header="func name([args, ...]) { code }">
        create your own functions and call them.
        <ListGroup fill>
          <ListGroupItem>usage:</ListGroupItem>
          <ListGroupItem>
          {'func functionName(text) {'} <br />
          {'log $text'} <br />
          {'}'} <br />
          </ListGroupItem>
          <ListGroupItem>
            functionName('hi')
          </ListGroupItem>
        </ListGroup>
        Values created in functions are only available in those functions.
        Parent variables remain accessible.
      </Panel>
      <h3>Example</h3>
        <p>Here is an example of a script to sign up, log in, and create
            a couple of things in a one page app
        </p>
      <pre>
        {`
  set u (randomstring 10)
  set p (randomstring 10)

  get /
  get /signup
  fill username $u
  fill password $p
  pressButton 'Sign up'
  get /logout
  fill username $u
  fill password $p
  pressButton Login
  set x 0
  while(lte $x 4) {
    get /create
    fill url 'https://google.com'
    pressButton Shorten
    set x (add $x 1)
  }
  get /logout
        `}
      </pre>
    </Panel>
  );
};

export default ApiReference;
