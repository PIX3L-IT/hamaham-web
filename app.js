const express = require("express");
const path = require("path");

const dotenv = require("dotenv").config()

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'usuarios', 'views'));

app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get("/test", (req, res) => {
    res.send("testing testing levi fanpage");
});

app.use("/usuario", require("./usuarios/control/routes/user.routes"));

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));