require('./db/relationships');
const db = require('./db/index');

db.sync();
const app = require('./server');
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Review service running on ${PORT}`));
