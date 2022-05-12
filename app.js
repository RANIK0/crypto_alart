
const express = require("express");
const routes = require("./router");
const path = require("path");

const app = express();    // Initialize an express instance

const PORT = process.env.PORT || 4000;  // Define the port
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const static_path = path.join(__dirname, "public");
app.use(express.static(static_path));
app.get("/", (req, res) => {        // Health check endpoint (optional)
  //return res.json({ status: "Up and running" });
  res.sendFile('index.html');
});

app.use(routes);

app.listen(PORT,                  // Start listenting for requests
    () => console.log(`Server started listening at ${PORT}`));
