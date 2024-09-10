const express = require("express");
const app = express();
const PORT = 8080;

// Register middleware to parse requests
app.use(express.json());

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

app.get("/api/users/:userId/books/:bookId", resolveUserByIndexId, (req, res) => {
    const findUserIndex = req.findUserIndex;
    const user = mockUsers[findUserIndex];
    console.log(req.params);
    if (!user) return res.status(404).send("User not found.");

    const bookId = parseInt(req.params.bookId);
    const book = user.books.find(book => book.bookId === bookId);
    if (!book) return res.status(404).send("Book not found.");
    return res.status(200).send(`The title for your book with the bookId of "${bookId}" is "${book.title}"`);
});

app.get("/api/users/:userId/books", resolveUserByIndexId, (req, res) => {
    const findUserIndex = req.findUserIndex;
    const user = mockUsers[findUserIndex];
    console.log(req.params);
    console.log(`Book list for userId: ${req.params.userId}, requested`);
    if (!user) return res.status(404).send("User not found.");

    const books = user.books;
    if (!books) return res.status(404).send("No books found for this user.");
    return res.status(200).send(books);
});

app.post("/", (req, res) => {
    return res.send("POST request");
});

app.put("/user", (req, res) => {
    return res.send("PUT request");
});

app.delete("/user", (req, res) => {
    return res.send("DELETE request");
});

app.delete("/api/users/:userId/books/:bookId", resolveUserByIndexId, (req, res) => {
    const findUserIndex = req.findUserIndex;
    const user = mockUsers[findUserIndex];
    console.log(`User ID: ${req.params.userId}`);
    console.log(`Requested Book ID: ${req.params.bookId}`);
    console.log(req.params);

    if (!user) {
        console.log('User not found');
        return res.status(404).send("User not found.");
    }

    const bookId = parseInt(req.params.bookId);
    console.log(`Parsed Book ID: ${bookId}`);

    const book = user.books.findIndex(book => book.bookId === bookId);
    console.log(`Book Index: ${book}`);

    if (book === -1) {
        console.log("Book not found")
        return res.status(404).send("Book not found.");
    }

    const removedBook = user.books.splice(book, 1)[0];
    console.log(removedBook);
    console.log(`The book, "${removedBook.title}", has been deleted from userId: ${req.params.userId}'s library.`);
    return res.status(200).send(`The book, "${removedBook.title}", has been deleted from your library.`);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})