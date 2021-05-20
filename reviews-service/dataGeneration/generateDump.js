const fs = require('fs');
const path = require('path');
const faker = require('faker');
const command = require('./command');
const uuid = require('uuid').v4;

const iterations = 0;
const x = 250000;
const idFactor = 250000;

for (let k = 0; k <= iterations; k++) {
    let usersQuery = '';
    let reviewsQuery = '';

    for (let i = 1 + k * x; i <= x + k * x; i++) {
        let first = faker.name.firstName();
        let last = faker.name.lastName();
        const email = faker.internet.email();
        const hash = faker.internet.password();
        const userId = uuid();

        while (first.indexOf("'") === 1) {
            first = faker.name.firstName();
        }

        while (last.indexOf("'") === 1) {
            last = faker.name.lastName();
        }

        if (i === x + iterations * x) {
            usersQuery += `
${userId}	${first}	${last}	${email}	${hash}
\\.`;
        } else {
            usersQuery += `
${userId}	${first}	${last}	${email}	${hash}`;
        }

        const numberOfReviews = Math.floor(Math.random() * 12);
        for (let j = 1; j <= numberOfReviews; j++) {
            const reviewId = uuid();
            const rating = Math.floor(Math.random() * 5) + 1; // number between 1 and 5

            if (j === numberOfReviews && i === x + iterations * x) {
                reviewsQuery += `
${reviewId}	${faker.date.between(new Date('2021-01-01'), new Date()).toISOString()}	${rating}	${faker.lorem.sentence()}	${
                    Math.floor(Math.random() * idFactor) + 1
                }	${userId}
\\.
`;
            } else {
                reviewsQuery += `
${reviewId}	${faker.date.between(new Date('2021-04-01'), new Date()).toISOString()}	${rating}	${faker.lorem.sentence()}	${
                    Math.floor(Math.random() * idFactor) + 1
                }	${userId}`;
            }
        }
    }

    fs.writeFile(path.join(__dirname, '..', 'dumps', `usersBody${k}.sql`), usersQuery, (err) => {
        if (err) throw err;
    });

    fs.writeFile(path.join(__dirname, '..', 'dumps', `reviewsBody${k}.sql`), reviewsQuery, (err) => {
        if (err) throw err;
    });
}

command(iterations);
