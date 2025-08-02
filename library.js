const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages) {
    const book = new Book(title, author, pages);
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
        for (const prop in book) {
            if (prop !== "id") {
                const bookPropertyElement = document.createElement("p");
                bookPropertyElement.className = prop;
                bookPropertyElement.textContent = book[prop];
                bookCardElement.appendChild(bookPropertyElement);
            }
        }
        libraryElement.appendChild(bookCardElement);
    }
}

displayLibrary()