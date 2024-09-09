const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("GET request")
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})