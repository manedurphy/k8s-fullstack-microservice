const User = require('./models/User');
const Review = require('./models/Review');

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });
