require('babel-jest');
require('@babel/polyfill');
require('@babel/preset-env');
require('@babel/preset-react');
const React = require('react');
const enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
const Stats = require('../../src/components/Stats.jsx').default;

enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = enzyme;
const { stats } = require('./data');

describe('Stats component', () => {

  it('handless errors by return empty', () => {
    const wrapper = mount(<Stats reviewInfo={false} />);
    expect(wrapper.children().length).toEqual(0);
  });

  it('renders review stats', () => {
    const wrapper = mount(<Stats reviewInfo={stats} />);
    let text = wrapper.find('.reviews-section-stats').text();
    text = text.split(' ').filter(el => el !== '|' && el !== 'Google Reviews');

    expect(parseFloat(text[0])).toEqual(stats.avg);
    expect(parseInt(text[1])).toEqual(stats.reviewCount);
  });

});