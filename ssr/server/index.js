import express from 'express';
import morgan from 'morgan';
import renderRoute from './routes/render';

const app = express();
const port = process.env.PORT || 6002;

app.use(morgan('common'));
app.use(...renderRoute);

app.listen(port, () => console.log(`listening on port ${port}`));
