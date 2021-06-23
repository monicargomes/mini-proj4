const port = process.env.PORT || 3000;
const express = require('express');
const app = express();

require('./src/app/init/db.js')(app, () => {
  require('./src/app/init/middleware')(app);
  app.listen(port, (error) => {
    if (error) throw error;
    console.log('Your app is listening on ' + port);
  });
});