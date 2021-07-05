const express = require("express");
const cors = require('cors');
const app = express();
const fs = require("fs");
app.use(express.json());
app.use(cors());
var i = 0;

app.post("/x", (req, res) => {
    console.log(req.body);

    fs.writeFile("results"+i+".json", JSON.stringify(req.body), (err) => {
      i = i+1;
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");}});

    res.end();

} );


app.get("/y", (req, res) => {
    res.send("HELLO WORLD");

} );

app.listen(3000, () => console.log("LISTENING ON PORT 3000"));
