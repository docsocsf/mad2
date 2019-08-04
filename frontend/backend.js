const express = require('express')
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser')

const port = 8080;

app.use(cors());
app.use(bodyParser.json())


app.post('/', (req, res) => {
  console.log(req.body)
})

app.listen(port, 'localhost', () => console.log(`Example app listening on port ${port}!`))
