let port = 3001;
let express = require('express');
let app = express();

app.get('/',(req,res) => {
    res.send('hello there!!!');
});

app.listen(port,() => {
    console.log("Running on port: " + port);
});