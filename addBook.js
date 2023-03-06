let addBook = document.getElementById("addBookBtn");
let bookName = document.getElementById("bookTitle");
let bookAuthor = document.getElementById("bookAuthor");
let bookPages = document.getElementById("bookPages");

addBook.addEventListener("click", () =>{
    let newBook = {
        name: bookName.value,
        pages: bookPages.value,
        author: bookAuthor.value
      }
    console.log(newBook);
    addNewBook(newBook);
})

function addNewBook(newBook){
    fetch("http://localhost:3000/books/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // <-- updated value
        },
        body: JSON.stringify(newBook)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}