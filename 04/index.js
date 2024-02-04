const express = require('express');
const app = express();
const routerFile = require('./routes/index');

const PORT = 3000
app.listen(PORT, () => {
  console.log(`App running in PORT ${PORT}`)
})

app.use('/api/v1', routerFile);