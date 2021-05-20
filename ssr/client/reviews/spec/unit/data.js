const review = {
  content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque porro delectus deleniti quisquam sit quidem eligendi. Molestias provident exercitationem praesentium adipisci dolorem enim nobis, facilis quis, tempora assumenda iure amet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque porro delectus deleniti quisquam sit quidem eligendi. Molestias provident exercitationem praesentium adipisci dolorem enim nobis, facilis quis, tempora assumenda iure amet.',
  rating: 3,
  author: 'author here',
  date: new Date().toISOString()
};

exports.review = review;
exports.nineReviews = new Array(9).fill(review);
exports.twelveReviews = new Array(12).fill(review);
exports.threeReviews = new Array(3).fill(review);
exports.stats = { avg: 3.3, reviewCount: 7 }