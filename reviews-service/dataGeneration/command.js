const fs = require('fs');
const path = require('path');

module.exports = function (j) {
    let command = 'cat dumps/head.sql dumps/copyReviews.sql ';

    for (let i = 0; i <= j; i++) {
        command += `dumps/reviewsBody${i}.sql `;
    }

    command += 'dumps/copyUsers.sql ';

    for (let i = 0; i <= j; i++) {
        command += `dumps/usersBody${i}.sql `;
    }

    command += 'dumps/foot.sql > dumps/dump.sql';

    console.log(command);

    fs.writeFile(path.join(__dirname, '..', 'dumps', 'catScript.sh'), command, (err) => {
        if (err) throw err;
    });
};
