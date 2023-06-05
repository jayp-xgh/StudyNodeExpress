const express = require('express');
const errorHendler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'));
app.unsubscribe(errorHendler);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
