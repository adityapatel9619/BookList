// Class Book
class Book{
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Class UI
class UI{
    addBookToList(book) {

        const list = document.getElementById('book-list');
    // Create tr Element
    const row = document.createElement('tr');
    
    // Insert Cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class = "delete">X</a></td>
    `;
    
    // Appending to the list
    list.appendChild(row);
            
    }
    
    showAlert(message,className) {
         // Create div
            const div = document.createElement('div');
            // Add class
            div.className=`alert ${className}`;
            // Add text
            div.appendChild(document.createTextNode(message));

            // For displaying

            // After Container
            const container = document.querySelector('.container');
            // Before Book-form
            const form = document.querySelector('#book-form');

            // Insert Alert
            container.insertBefore(div, form); 

            // Timeout after 3 sec
            setTimeout(function () {
                document.querySelector('.alert').remove();
            }, 3000);
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
            }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Local Storage Class

class Store{
   static getBooks() {
       let books;
       if (localStorage.getItem('books') === null) {
            books = [];
       } else {
           books = JSON.parse(localStorage.getItem('books'));
       }

       return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function (book) {
            const ui = new UI();
            
            // Add book to UI
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static  removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach(function (book,index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}


        /* ---EVENT LISTENER--- */
        

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);


 // Event Listener For Add Book
 document.getElementById('book-form').addEventListener('submit', function (e) {

    // Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
    
    // Instantiate Book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();
    

    // Validate
    if (title === '' || author === '' || isbn === '')
    {
            // Show Error alert
        ui.showAlert('Please fill in all fields', 'error');
    }
    else {
            // Add book 
            ui.addBookToList(book);
            
            // Add book to Local Storage
            Store.addBook(book);

            // Show Succes
            ui.showAlert('Book Added Successfully !','success')

            // Clear fields after submitting
            ui.clearFields();
        
    }    
    e.preventDefault();
    });

    // Event Listener For Delete
    // Here we will get the parent of delete symbol in order to delete complete single row
    
document.getElementById('book-list').addEventListener('click', function (e) {
        
        // Instantiate UI
    const ui = new UI();
    
    // Delete Book
    ui.deleteBook(e.target);

    // Remove from Local Storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show Message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
});