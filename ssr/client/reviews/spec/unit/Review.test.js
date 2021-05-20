require('babel-jest');
require('@babel/polyfill');
require('@babel/preset-env');
require('@babel/preset-react');
const React = require('react');
const enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
const Review = require('../../src/components/Review.jsx').default;

enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = enzyme;
const { review } = require('./data');

describe('Review component', () => {
  let wrapper;

  describe('renders with state provided as props', () => {
    beforeEach(() => {
      wrapper = mount(<Review review={review} />);
    })
    afterEach(() => {
      wrapper = null;
    })
    it('renders review with props', () => {
      expect(wrapper.props().review).toEqual(review);
      expect(wrapper.find('.reviews-section-card').length).toEqual(1);
      expect(wrapper.find('.reviews-section-author').length).toEqual(1);
      expect(wrapper.find('.reviews-section-content').length).toEqual(1);
    });
  
    it('renders data from props to respective sections', () => {
      expect(wrapper.find('.reviews-section-author').text()).toEqual(review.author);
      expect(wrapper.find('.reviews-section-content > p').text().split('...')[0]).toEqual(`${review.content.slice(0,40)} `);
    });

    it('renders number of stars equal to props.rating', () => {
      expect(wrapper.find('.star-small').length).toEqual(review.rating);
    });

    it('shows all text when Read More is clicked', () => {
      wrapper.find('.read-more').simulate('click');
      expect(wrapper.find('.reviews-section-content > p').text()).toEqual(review.content);
    });

  });

});