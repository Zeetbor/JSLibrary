let myLibrary = [
  {
    title: "The Hobbit",
    author: "JRR Tolkien",
    pages: 295,
    read: "Yes",
  },
  {
    title: "The Witcher",
    author: "Andrzej Sapkowski",
    pages: 434,
    read: "No",
  },
];

const bookcase = document.querySelector(".bookcase");
var numberOfBooks = myLibrary.length;

//Book object constructor
function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return `${this.title} by ${this.author}, ${this.pages}, read: ${this.read}`;
  }
};


addBookToLibrary = (title, author, pages, read) => {
  const addBook = new Book(title, author, pages, read); //create new book
  addBook.prototype = Object.create(Book.prototype); //set prototype
  myLibrary.push(addBook); //add to library
}

//Populate page with book cards
render = () => {
  for (i = 0; i < numberOfBooks; i++) {
    createCard(i);
  };
};

createCard = (index = numberOfBooks - 1) => {
  const card = document.createElement('div');
  card.setAttribute("class", "card")

  const title = document.createElement("h2");
  title.textContent = myLibrary[index].title;
  title.setAttribute("class", "info");
  card.appendChild(title);

  const author = document.createElement("h3");
  author.textContent = `by ${myLibrary[index].author}`;
  author.setAttribute("class", "info");
  card.appendChild(author);

  const pages = document.createElement("h3");
  pages.textContent = `Pages: ${myLibrary[index].pages}`;
  pages.setAttribute("class", "info");
  card.appendChild(pages);

  const read = document.createElement("h3");
  read.textContent = `Already Read?: ${myLibrary[index].read}`;
  read.setAttribute("class", "info");
  card.appendChild(read);

  bookcase.appendChild(card);
};

//Add event listeners to buttons
const new_button = document.querySelector(".new");
new_button.addEventListener('click', render());

const submit_button = document.querySelector("#submit");
submit_button.addEventListener('click', addBookToLibrary());
