const submitButton = document.querySelector("#submitButton") 
submitButton.addEventListener("click", addBookToLibrary);

const popUp = document.querySelector('#popUp')
const addButton = document.querySelector("#add-button")

addButton.addEventListener("click", function() {
    popUp.style.display = 'block'
});

const LOCAL_STORAGE_KEY = 'library.cards'


// This is the object constructor for the books that takes in 4 parameters
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
// myLibrary is the array that will store the objects (books), newBook is the variable that will store the books generated from the constructor, which will then be pushed into the myLibrary array
// myLibrary will display an empty array, OR whatever is the local storage. The local storage is derived from the saveStorage function
let myLibrary = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
let newBook;


function addBookToLibrary() {
    event.preventDefault(); // I don't know why this works to prevent the default action of the form submission, as "event" is not referenced anywhere else, but it works. It did not work when the eventlistener to the submit button did not have the addBookToLibrary function as its' parameter)
    popUp.style.display = 'none';
    const title = document.getElementById('title').value; // The value of these inputs is derived from the user's input on the form
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
    saveAndRender();
    form.reset();
    
}

function saveStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(myLibrary))
}

function saveAndRender() {
    saveStorage();
    render()
}

// This is the function that will display the form submissions on the website
function render() {
    const libraryContainer = document.getElementById('library-container');
    const books = document.querySelectorAll('.book');
    books.forEach(book => libraryContainer.removeChild(book)); // Without this, the form submit button would create multiple cards instead of just 1 per submission.
   
    for (let i=0; i<myLibrary.length; i++){
        createBook(myLibrary[i]);
    }
}
// This is the function that is used in the rendering function above. It loops through the length of the library and creates the cards users submit.
function createBook(item) {
    const libraryContainer = document.querySelector('#library-container')
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pagesDiv = document.createElement('div');
    const readDiv = document.createElement('button'); // This one has to be a button so a user can change the input after the book element is created.
    const removeButton = document.createElement('button')

    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');
    bookDiv.appendChild(titleDiv);

    authorDiv.textContent = item.author;
    authorDiv.classList.add('author');
    bookDiv.appendChild(authorDiv);

    pagesDiv.textContent = item.pages;
    pagesDiv.classList.add('pages');
    bookDiv.appendChild(pagesDiv);

    if (item.read === true) {
    readDiv.textContent = 'Already read!';
    readDiv.style.backgroundColor = 'green';
} else if (item.read === false) {
    readDiv.textContent = 'Not read yet!';
    readDiv.style.backgroundColor = 'red';
}

    readDiv.addEventListener("click", function() {
        item.read = !item.read
        render(); // To change the button, the render function is needed to be called again so that this createBook function can be called
})

    readDiv.classList.add('read');
    bookDiv.appendChild(readDiv);

    removeButton.innerText = 'REMOVE'
    removeButton.classList.add('removeButton');
    bookDiv.appendChild(removeButton);

    removeButton.addEventListener('click', function() {
        myLibrary.splice(myLibrary.indexOf(item),1);
        saveAndRender();
    })

    libraryContainer.appendChild(bookDiv);
}

    render();
