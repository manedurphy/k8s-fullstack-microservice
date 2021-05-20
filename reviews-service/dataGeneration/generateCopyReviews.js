const fs = require('fs');
const path = require('path');

const query = 'COPY public.reviews (id, date, rating, content, space, user_id) FROM stdin;';

fs.writeFile(path.join(__dirname, '..', 'dumps', 'copyReviews.sql'), query, (err) => {
    if (err) throw err;

    console.log('DONE!');
});
