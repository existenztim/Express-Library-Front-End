let bookList = document.getElementById("bookList");
let bookInfo = document.getElementById("bookInfo");
let toggleRent = false;
function fetchBooks() {
fetch("http://localhost:3000/books")
.then(response => response.json())
.then(data => {
    printBooks(data);
    });
}
fetchBooks();

function printBooks(books) {
    console.log(books);
    bookList.innerHTML = "";
    books.map(book => {

        book.loaned = (book.loaned) ? "utlånad" : "tillgänglig";

        let li = document.createElement("li")
        li.id = book.id;
        li.innerText = `${book.name} utlånad :${book.loaned}`;
        let bookBtn = document.createElement("button");
        
        bookBtn.setAttribute('id',`${book.id}`);
        bookBtn.classList.add('readMoreBtn');
        bookBtn.innerHTML = "Läs mer";

        let rentBtn = document.createElement("button");
        rentBtn.setAttribute('id',`${book.id}`);
        rentBtn.classList.add('rentBtn');
        rentBtn.innerHTML = "Låna/lämna in";
        
        bookList.appendChild(li);
        bookList.appendChild(bookBtn);
        bookList.appendChild(rentBtn);
        
    })
    document.querySelectorAll('.readMoreBtn').forEach(btn => {
        btn.addEventListener('click', event => {
        toggleRent = true;
        fetchSelectedBook(event.target.id);
        });
    });

    document.querySelectorAll('.rentBtn').forEach(btn => {
        btn.addEventListener('click', event => {
        toggleRent = false;
        fetchSelectedBook(event.target.id);
        });
    });
}

function fetchSelectedBook(id) {
    fetch(`http://localhost:3000/books/${id}`)
    .then(response => response.json())
    .then(data => {
        if(toggleRent) {
            printBookdetails(data);
        } else {
            fetchRentBook(id,data);
        }
    })
    .catch(error => console.log(error));
}

function fetchRentBook(id, data) {
    fetch(`http://localhost:3000/books/${id}/rent`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        fetchBooks();
    });
}

function printBookdetails (book) {
    bookInfo.innerHTML = /*html*/`
        <li>Titel : ${book.name}</li>
        <li>Författare: ${book.author}</li>
        <li>utlånad? : ${book.loaned}</li>
        <li>Sidor : ${book.pages}</li>
        `
}

