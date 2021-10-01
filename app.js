const express = require("express");
const db = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const { urlencoded } = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/list", (req, res) => {
    db.query("SELECT * FROM notes", (err, result) => {
        res.send(result);
    });
});

app.post("/post", (req, res) => {
    const title = req.body.title;
    const note = req.body.note;

    db.query("INSERT INTO notes (title, text) VALUES(?,?)", [title, note], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            console.log("note added")
        }
    });
});

app.delete("/delete/:index", (req, res) => {
    const index = req.params.index;

    db.query("DELETE FROM notes WHERE id = ?", index, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            console.log("note deleted")
        }
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));