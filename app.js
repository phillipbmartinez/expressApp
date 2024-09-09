const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
    return res.send("GET request")
});

app.post("/", (req, res) => {
    return res.send("POST request");
});

app.put("/user", (req, res) => {
    return res.send("PUT request");
});

app.delete("/user", (req, res) => {
    return res.send("DELETE request");
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})