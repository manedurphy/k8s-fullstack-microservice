const { ReviewData } = require('../models/Review');

const lorem = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui totam quasi tenetur eaque libero, magnam iure sint repellendus similique vero error id aspernatur, omnis ad asperiores placeat natus. Praesentium, velit.'
    .replace(/[.,]/g, '')
    .split(' ');

//generate a string of n words from words array
const wordGenerator = (n = 1, upperCase = false) => {
    let length = Math.floor(Math.random() * n + 2);
    let newPhrase = [];
    for (let i = 0; i < length; i++) {
        let index = Math.floor(Math.random() * lorem.length);
        newPhrase.push(lorem[index]);
    }
    if (upperCase) {
        const titleCase = newPhrase.map((word) => {
            word = word.split('');
            word[0] = word[0].toUpperCase();
            return word.join('');
        });
        return titleCase.join(' ');
    }
    return newPhrase.join(' ');
};

const getRating = (n) => Math.floor(Math.random() * n) + 1;

const reviewGenerator = (limit = 15) => {
    let reviews = [];
    for (let i = 0; i < limit; i++) {
        reviews.push({
            author: wordGenerator(3, true).slice(0, 40),
            date: Date.now(),
            rating: getRating(5),
            content: wordGenerator(25).slice(0, 150),
        });
    }
    return reviews;
};

const reviewDataGenerator = (idNum, limit) => {
    let numberOfReviews = Math.floor(Math.random() * limit);
    let reviews = reviewGenerator(numberOfReviews);
    let workspaceSlug = `workspace-${idNum}`;
    let workspaceId = idNum;
    return { workspaceSlug, workspaceId, reviews };
};

const makeReviewDataArray = () => {
    const reviewData = [];
    for (let i = 1; i <= 100; i++) {
        reviewData.push(reviewDataGenerator(i, 15));
    }
    return reviewData;
};

const assignParentIds = async (reviewDatas) => {
    for (const reviewData of reviewDatas) {
        for (let i = 0; i < reviewData.reviews.length; i++) {
            reviewData.reviews[i].parentId = reviewData._id;
        }
        await reviewData.save();
    }
};

exports.seedReviews = () => {
    return new Promise(async (resolve, reject) => {
        const db = require('../index');
        console.log('seeder connected to db');
        try {
            await ReviewData.deleteMany({});
            console.log('Reviews deleted');
            const reviewData = makeReviewDataArray();
            const res = await ReviewData.create(reviewData);
            await assignParentIds(res);
            console.log(`${res.length} reviews created`);
            resolve();
        } catch (error) {
            console.log(error.message);
            db.close();
            reject();
        }
    });
};

exports.deleteReviews = () => {
    return new Promise(async (resolve, reject) => {
        const db = require('../index');
        try {
            await ReviewData.deleteMany({});
            console.log('Reviews have been deleted');
            resolve();
        } catch (error) {
            console.log(error.message);
            db.close();
            reject(error);
        }
    }).catch((err) => {
        throw err;
    });
};

if (process.argv[2] === '-s') {
    exports.seedReviews(process.env.MONGO_URI_DEV).then(() => process.exit());
} else {
    console.log(`run with -s flag to seed dev records`);
}
