// variables
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


// routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// host
app.listen(port, () => console.log(`Example app listening on port ${port}!`))