const app = require('./app');
const mongoose = require('mongoose');

// DATABASE CONNECT
const url = process.env.DATABASE_URL.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(url)
  .then((res) => {
    if (res) {
      console.log('Successfully connected to DB');
    }
  })
  .catch((err) => console.log(err));

// SERVER LISTENING
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
