const myLibrary = [];

function Book(title, author, pages) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
    const book = new Book(title, author, pages);
    myLibrary.push(book);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295);

function displayLibrary() {
    const libraryElement = document.querySelector(".library");
    for (const book of myLibrary) {
        const bookCardElement = document.createElement("div");
        const titleElement = document.createElement("h1");
        titleElement.textContent = book.title;
        const authorElement = document.createElement("h2");
        authorElement.textContent = book.author;
        const pagesElement = document.createElement("p");
        pagesElement.textContent = book.pages;
        bookCardElement.appendChild(titleElement);
        bookCardElement.appendChild(authorElement);
        bookCardElement.appendChild(pagesElement);
        libraryElement.appendChild(bookCardElement);
    }
}

displayLibrary()