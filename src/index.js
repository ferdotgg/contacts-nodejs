const express = require('express');
const app = express();
const cors = require('cors');
// Settings

app.set('port', process.env.PORT || 1000);

app.use(cors())
// Middlewares
app.use(express.json());

// Routes
app.use(require('./routes/contacts'));


// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
