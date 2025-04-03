const express = require("express");
const path = require("path");

const dotenv = require("dotenv").config()

const app = express();

app.set('view engine', 'ejs');

// Serve static files (optional, if you have CSS/JS)
app.use(express.static("public"));

// ✅ Add JSON parsing middleware
app.use(express.json());

// ✅ Add URL-encoded form data parsing (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve an HTML page
app.get("/test", (req, res) => {
    res.send("testing testing levi fanpage");
});

// Rutas
app.use("", require("./firebase_test.routes"));

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));