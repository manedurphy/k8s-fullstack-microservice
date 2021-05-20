const fs = require('fs');
const path = require('path');

const query = 'COPY public.users (id, first_name, last_name, email, password) FROM stdin;';

fs.writeFile(path.join(__dirname, '..', 'dumps', 'copyUsers.sql'), query, (err) => {
    if (err) throw err;

    console.log('DONE!');
});
