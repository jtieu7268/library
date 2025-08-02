const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.readMessage = function () {
    return `${this.read ? "read" : "has not been read yet" }`;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 367, false);
addBookToLibrary("The Way of Kings", "Brandon Sanderson", 1001, true);
addBookToLibrary("Don Quixote", "Miguel de Cervantes", 940, false);

function displayLibrary() {
    const libraryElement = document.querySelector(".library");
    for (const book of myLibrary) {
        const bookCardElement = document.createElement("div");
        bookCardElement.setAttribute("id", book.id);
        bookCardElement.className = "book";
        for (const prop in book) {
            if (prop !== "id" && prop !== "readMessage") {
                const bookPropertyElement = document.createElement("p");
                bookPropertyElement.className = prop;
                bookPropertyElement.textContent = prop === "read" ? book.readMessage() 
                                                : prop === "pages" ? `${book[prop]} pages` : book[prop];
                bookCardElement.appendChild(bookPropertyElement);
            }
        }
        libraryElement.appendChild(bookCardElement);
    }
}

displayLibrary()