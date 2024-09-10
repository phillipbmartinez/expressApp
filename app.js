const express = require("express");
const app = express();
const PORT = 8080;

// Register middleware to parse requests
app.use(express.json);

// Get user index out of the mockUsers array
const resolveUserByIndexId = (req, res, next) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) return res.sendStatus(400);
    const userIndex = mockUsers.findIndex(user => user.userId === userId);
    if (userIndex === -1) return res.sendStatus(404);
    req.findUserIndex = userIndex;
    next();
};

// Mock users array with userIds and books
const mockUsers = [
    {
        userId: 1,
        name: "Phillip",
        displayName: "pbmtx",
        books: [
            {
                bookId: 1,
                title: "Only The Dead",
                author: "Jack Carr",
                read: "yes",
            },
            {
                bookId: 2,
                title: "The Terminal List",
                author: "Jack Carr",
                read: "yes",
            },
        ],
    },
    {
        userId: 2,
        name: "Robert",
        displayName: "robo",
        books: [
            {
                bookId: 1,
                title: "The 48 Laws Of Power",
                author: "Robert Greene",
                read: "yes",
            },
            {
                bookId: 2,
                title: "The Laws Of Human Nature",
                author: "Robert Greene",
                read: "yes",
            },
            {
                bookId: 3,
                title: "Mastery",
                author: "Robert Greene",
                read: "no",
                },
        ],
    },
];

app.get("/", (req, res) => {
    return res.send("I will be a great software developer!")
});

//Return all of the mockUsers array for a GET request
app.get("/api/users", (req, res) => {
    return res.status(200).send(mockUsers);
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