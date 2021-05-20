require('babel-jest');
require('@babel/polyfill');
require('@babel/preset-env');
require('@babel/preset-react');
const React = require('react');
const enzyme = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
const ReviewsList = require('../../src/components/ReviewsList.jsx').default;

enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = enzyme;
const { review, nineReviews, twelveReviews, threeReviews } = require('./data');

describe('ReviewsList component', () => {
  describe('handles all cases', () => {
    it('renders empty when error', () => {
      const wrapper = mount(<ReviewsList reviewsList={false} />);
      expect(wrapper.children().length).toEqual(0);
    });

    it('renders empty when state is empty array', () => {
      const wrapper = mount(<ReviewsList reviewsList={[]} />);
      expect(wrapper.children().length).toEqual(0);
    });

    it('renders reviews', () => {
      const wrapper = mount(<ReviewsList reviewsList={[review]} />);
      expect(wrapper.find('.reviews-section-card').length).toEqual(1);
    });
  });

  describe('handles Load More reviews functionality works', () => {

    const loadBtn = '#reviews-load-more-btn';
    const cards = '.reviews-section-card';
    const seeAll = '#reviews-see-all-btn';

    it('renders 3 reviews without showing load more', () => {
      const wrapper = mount(<ReviewsList reviewsList={threeReviews} />);
      expect(wrapper.find(cards).length).toEqual(3);
      expect(wrapper.find(loadBtn).length).toEqual(0);
    });

    it('loads up to 9 reviews and removes load more button', () => {
      const wrapper = mount(<ReviewsList reviewsList={nineReviews} />);
      wrapper.find(loadBtn).simulate('click');
      expect(wrapper.find(cards).length).toEqual(6);
      wrapper.find(loadBtn).simulate('click');
      expect(wrapper.find(cards).length).toEqual(9);
      expect(wrapper.find(seeAll).length).toEqual(0);
    });

    it('shows See all button when more reviews exist', () => {
      const wrapper = mount(<ReviewsList reviewsList={twelveReviews} />);
      wrapper.find(loadBtn).simulate('click');
      wrapper.find(loadBtn).simulate('click');
      expect(wrapper.find(seeAll).length).toEqual(1);
    });

  });
});