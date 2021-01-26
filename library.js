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
let numberOfBooks = myLibrary.length;
let cardCount = 1;

//Book object constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  // this.info = function(){
  //   return `${this.title} by ${this.author}, ${this.pages}, read: ${this.read}`;
  // }
};

function addBookToLibrary(title, author, pages, read) {
  addBook = new Book(title, author, pages, read); //add to library
  myLibrary.push(addBook); //create new book
  addBook.prototype = Object.create(Book.prototype); //set prototype
  createCard(numberOfBooks);
  saveLocal();
};

//Populate page with book cards
createCard = (index = numberOfBooks - 1) => {
  let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const card = document.createElement('div');

  card.setAttribute("class", "card");
  card.setAttribute('data-index', index);
  card.setAttribute('data-cardCount', cardCount);
  card.style.backgroundColor = randomColor;

  const remove = document.createElement("button");
  remove.textContent = "X";
  remove.setAttribute("class", "remove");
  remove.setAttribute("id", "close");
  remove.addEventListener("click", (e) => {
    myLibrary.splice(remove.parentElement.getAttribute("data-index"), 1);
    e.srcElement.parentElement.remove();
    saveLocal();
  });
  card.appendChild(remove);

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

  const readBtn = document.createElement("button");
  readBtn.textContent = "Change read status"
  readBtn.setAttribute("class", "readBtn");
  card.appendChild(readBtn);
  readBtn.addEventListener("click", () => {
    let status = myLibrary[index].read;
    if(status == "Yes") {
      readBtn.previousSibling.textContent = "Already Read?: No";
      myLibrary[index].read = "No";
    } else {
      readBtn.previousSibling.textContent = "Already Read?: Yes";
      myLibrary[index].read = "Yes";
    }
  });
  bookcase.appendChild(card);
  cardCount++;
};


//Add event listeners to buttons
const showForm = document.querySelector(".form-container");

const new_button = document.querySelector(".new");
new_button.addEventListener('click', (e) => {
  showForm.style.display = "inline-block";
});

const closeForm = document.querySelector(".closeBtn");
closeForm.addEventListener('click', (e) => {
  showForm.style.display = "none";
});

const submit_button = document.querySelector("#submit");
submit_button.addEventListener('click', (e) => {
  const form = document.querySelector(".form");
    addBookToLibrary(form.title.value, form.author.value, form.pages.value, form.read.value);
    resetForm(form);
    showForm.style.display = "none";
});

function resetForm(form){
    form.title.value = "";
    form.author.value = "";
    form.pages.value = "";
}

render = () => {
    for (i = 0; i < numberOfBooks; i++) {
      createCard(i);
    };
  };
render();

// Local Storage

function saveLocal() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// function restoreLocal() {
//   myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
//   if (myLibrary === null) myLibrary = [];
//   render();
// }
// restoreLocal()

/*
const card = document.querySelector(".card");
const remove_button = document.querySelectorAll(".remove");
for (let i = 0; i < remove_button.length; i++) {
  remove_button[i].addEventListener("click", () => {
    let bookIndex = card.getAttribute('data-index');
    let bookNode = document.querySelector(`.card[data-index='${bookIndex}']`);
    document.querySelector('.card').parentNode.removeChild(bookNode);
    myLibrary.splice(myLibrary.indexOf(card), 1);
  })};
*/
