import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import Navigation from '../../../client/components/Navigation/Navigation.jsx';
import { Link } from 'react-router';

describe('<Navigation />', () => {
  const handleClick = sinon.spy();

  const linkNodes = [
    <Link to="/">Load Tester</Link>
  ];

  it('It should render five <Link> components', () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper.contains(linkNodes)).to.equal(true);
  });
});
