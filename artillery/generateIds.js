const createWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createWriter({
    path: './artillery/ids.csv',
    header: [{ id: 'id', title: 'space' }],
});

const data = [];

// for (let i = 1; i <= 1000; i++) {
//     data.push({ id: i });
// }
for (let i = 9000000; i <= 10000000; i++) {
    data.push({ id: i });
}

csvWriter.writeRecords(data).then(() => console.log('done!'));
