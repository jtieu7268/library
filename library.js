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

Book.prototype.toggleRead = function () {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 367, false);
addBookToLibrary("The Way of Kings", "Brandon Sanderson", 1001, true);
addBookToLibrary("Don Quixote", "Miguel de Cervantes", 940, false);

const libraryElement = document.querySelector(".library");
const newBookElement = document.querySelector(".new");
const newDialogElement = document.querySelector(".new-dialog");
newBookElement.addEventListener('click', () => {
    newDialogElement.showModal();
})
const submitBtn = newDialogElement.querySelector("#submit-new-book");
const formElement = document.querySelector("form");
submitBtn.addEventListener('click', (event) => {
    if (!formElement.checkValidity()) {
        formElement.reportValidity();
    } else {
        event.preventDefault();
        const inputElements = Array.from(formElement.querySelectorAll("input"));
        let bookArgs = [];
        const bookProps = Object.getOwnPropertyNames(new Book());
        for (const input of inputElements) {
            if (bookProps.includes(input.id)) {
                bookArgs.push(input.value);
                input.value = '';
            }
        }
        newDialogElement.close(...bookArgs);
        addBookToLibrary(...bookArgs);
        addBookCard(myLibrary.at(-1));
    }
})

function addBookCard(book) {
    const bookCardElement = document.createElement("div");
    bookCardElement.setAttribute("id", book.id);
    bookCardElement.className = "book";
    for (const prop in book) {
        if (prop !== "id" && typeof book[prop] !== "function") {
            const bookPropertyElement = document.createElement("p");
            bookPropertyElement.className = prop;
            bookPropertyElement.textContent = prop === "read" ? book.readMessage() 
                                            : prop === "pages" ? `${book[prop]} pages` : book[prop];
            bookCardElement.appendChild(bookPropertyElement);
        }
    }

    const bookButtonsElement = document.createElement("div");
    bookButtonsElement.className = "book-buttons";

    const changeReadButton = document.createElement("button");
    bookCardElement.appendChild(bookButtonsElement);
    changeReadButton.className = "change-read";
    changeReadButton.textContent = "Change Read Status";
    changeReadButton.addEventListener('click', () => {
        book.toggleRead();
        bookCardElement.querySelector(".read").textContent = book.readMessage();
    })
    bookButtonsElement.appendChild(changeReadButton);

    const delButton = document.createElement("button");
    delButton.className = "delete";
    delButton.textContent = "Delete";
    delButton.addEventListener('click', () => {
        libraryElement.removeChild(bookCardElement);
    })
    bookButtonsElement.appendChild(delButton);

    libraryElement.appendChild(bookCardElement);
}

function displayLibrary() {
    for (const book of myLibrary) {
        addBookCard(book);
    }
}

displayLibrary()