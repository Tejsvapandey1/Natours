const dotenv = require('dotenv');
const app = require('./app');

const Tour = require('./models/tourModels.js');
const { default: mongoose } = require('mongoose');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((conn) => {
  console.log('Database Connected');
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
