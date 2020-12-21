// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor

function UI() { }

// Add book to list (Prototype)
UI.prototype.addBookToList = function (book) {
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

        // Show ALert
        UI.prototype.showAlert = function(message, className)
        {
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

        
    // Delete Book
    UI.prototype.deleteBook= function(target){
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
        }
    }

    // Clear Fields
    UI.prototype.clearFields = function () {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    
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

    // Show Message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
});