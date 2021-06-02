const express = require('express');
const app = express();
const cors = require('cors');
//const port = 3000


const routes = require('./routes')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors());
app.use(express.json())
 //indicando que vai receber no formato js em json

app.use(routes)

export default app;