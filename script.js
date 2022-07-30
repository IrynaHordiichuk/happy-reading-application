const books = [
  {
    id: "1",
    title: `Apple. Эволюция компьютера`,
    author: `Владимир Невзоров`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
  },
  {
    id: "2",
    title: `Как объяснить ребенку информатику`,
    author: `Кэрол Вордерман`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
  },
  {
    id: "3",
    title: `Путь скрам-мастера. #ScrumMasterWay`,
    author: `Зузана Шохова`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
  },
];

const KEY = 'books';
localStorage.setItem(KEY, JSON.stringify(books));

const divRef = document.querySelector("#root");

const newDivA = document.createElement("div");
const newDivB = document.createElement("div");

newDivA.classList.add("leftDiv");
newDivB.classList.add("rightDiv");

divRef.append(newDivA, newDivB);

const heading = document.createElement("h1");
const newList = document.createElement("ul");
const buttonAdd = document.createElement("button");

heading.textContent = "Library";
buttonAdd.textContent = "ADD";

heading.classList.add("title");
newList.classList.add("list");
buttonAdd.classList.add("btn-add");

newDivA.append(heading, newList, buttonAdd);

function renderList() {
  const books = JSON.parse(localStorage.getItem(KEY));
  const markup = books
    .map(({ id, title }) => {
      return `
    <li id=${id} class = "list__item"> 
    <p class="booktitle">${title}</p>
    <button class="btn btnedit" type="button">Edit</button>
    <button class="btn btndel" type="button">Delete</button>
     </li>
    `;
    })
    .join("");

  newList.insertAdjacentHTML("beforeend", markup);

  const pRef = document.querySelectorAll(".booktitle"); 
  //! утворили масив посилань на заголовки книжок (псевдомасив)

  pRef.forEach((item) => {
    item.addEventListener("click", onClickTitle); 
    //! перебираємо цей псевдомасив і чіпляємо слухача до кожного посилання
  });

  const btnDelEl = document.querySelectorAll(".btndel");
  const btnEditEl = document.querySelectorAll(".btnedit");

  btnDelEl.forEach((item) => {
    item.addEventListener("click", deleteBook);
  });
  btnEditEl.forEach((item) => {
    item.addEventListener("click", editBook);
  });
}

renderList();

// ! кол бек функція 
function onClickTitle(event) {
  //  console.log(event.target.textContent);
  const books = JSON.parse(localStorage.getItem(KEY));
  const book = books.find((book) => book.title === event.target.textContent);
  const markup = createPreviewMarkup(book); //! викликаємо ф-ю і передаємо обєкт який знайшли в попер. рядку
  console.log(markup);
  newDivB.innerHTML = "";
  newDivB.insertAdjacentHTML("afterbegin", markup);//ставимо сформовану розмітку в правий дів
}

// рендерить розмітку preview для книжки 
function createPreviewMarkup({ title, author, img, plot }) {
  return `<h2 class="heading">${title}</h2> <p class="text">${author}</p><img class="img" src="${img}" 
  alt="picture"> <p class="text">${plot}</p>`;
}

function deleteBook(event) {
const books = JSON.parse(localStorage.getItem(KEY));
const id = event.target.parentNode.id;
const filteredBooks = books.filter(book => book.id !== id);
console.log(filteredBooks);
// відсортовуємо ті, які будемо видаляти
// у нас три кнопки, через id дізнаємось на яку клацнули щоб на ній застосувати ф-ю.
//id стоіть на лі в якому знаходиться кнопка
localStorage.setItem(KEY, JSON.stringify(filteredBooks));

newList.innerHTML = '';

const titleToRemove = newDivB.firstChild.textContent; // firstChild це заголовок(див ф-ю createReviewMarkup)
const titleToCheck = books.find(book => book.id === id).title;

if(titleToCheck === titleToRemove) {
  newDivB.innerHTML = '';
}
renderList();
}

function editBook(event) {
 newDivB.innerHTML = '';
 const id = event.target.parentNode.id;
 const books = JSON.parse(localStorage.getItem(KEY));
 const book = books.find(b => b.id === id);
 newDivB.insertAdjacentHTML('afterbegin', createFormMarkup(book));

}

buttonAdd.addEventListener('click', onBtnAdd);

function onBtnAdd(event){
newDivB.innerHTML = '';

const newBook = {
  id: Date.now().toString(),
  author: '',
  title: '',
  img: '',
  plot: '',
};
newDivB.insertAdjacentHTML('afterbegin', createFormMarkup(newBook));
formBookObj(newBook);

const btnSave = document.querySelector('.btn-save');
btnSave.addEventListener('click', onBtnSave);

function onBtnSave(){
const values = Object.values(newBook); // returns an array of values of the object
const isEmptyField = values.some(val  => val === "");
if(isEmptyField){
  alert("All fields must be filled")
} else {
  const oldBookData = JSON.parse(localStorage.getItem(KEY)); 
  oldBookData.push(newBook);
  const booksToSave = JSON.stringify(oldBookData);
  localStorage.setItem(KEY, booksToSave);
  newList.innerHTML = '';
  renderList();
  
  newDivB.innerHTML = '';
  newDivB.insertAdjacentHTML('afterbegin', createPreviewMarkup(newBook));
}
}
}

function formBookObj(book){ 
//дана ф-я бере дані із інпутів і за подією change формує обєкт
//(юзер вводить дані в інпути і іх велю стає значенням полів обєкта);

const inputsEl = document.querySelectorAll('input');
inputsEl.forEach(item => item.addEventListener("change", onInputChange));

function onInputChange(event){
  book[event.target.name] = event.target.value;
}
};

function createFormMarkup (book){
  return `
  <form class="book-form" action="">
  <label>Author <input type="text" name="author" value="${book.author}"/></label>
  <label>Title<input type="text" name="title" value="${book.title}"/></label>
  <label>img url <input type="text" name="img" value="${book.img}"/></label>
  <label>Plot <input type="text" name="plot" value="${book.plot}"/></label>
  <button class="btn btn-save" type="button">Save</button>
</form>`
};