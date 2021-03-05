const express = require('express')
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());
app.use(express.static('.'))

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
require(__dirname + "/api/router.js")(app);

app.listen(3000)