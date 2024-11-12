import { bookServer, serverConf } from "./server.conf.js";

const appData = {
   books: [],
   selectedBook: {},
   selectBook(bookId) {
      this.selectedBook = this.books.find((book) => book.id == bookId);
   },
   // Selected elements
   themeListEl: document.querySelector(".asyncJThemeList"),
   titleEl: document.querySelector(".asyncJTitle"),
   authorEl: document.querySelector(".asyncJAuthor"),
   dateEl: document.querySelector(".asyncJDate"),
   bookEl: document.querySelector(".asyncJBook")
};

// Side-effect functions
const dispayDetails = (book) => {
   appData.titleEl.textContent = book.title;
   appData.authorEl.textContent = book.author;
   appData.dateEl.textContent = book.date;
};

const dispayThemes = (listEl, themes) => {
   listEl.innerHTML = "";
   themes.forEach(({ name, page }, i) => {
      listEl.insertAdjacentHTML(
         "beforeend",
        `<li>
            <label>
               <input type="radio" name="theme" value="${page}" />
               <div>
                  <span>${name} </span> 
                  <i class="divider"></i>
                  <span class="page-container">
                     <i>Сторінка - ${page}</i>
                     <img src="images/Wheelchair.svg"> 
                  </span>
               </div> 
            </label>
         </li>`
      );
   });
};

const displayBook = (bookEl, src, page) => {
   const pageParam = page ? `#page=${page}` : "";
   bookEl.innerHTML = ` <iframe
            src="${serverConf.getPdf(src)}${pageParam}"
         ></iframe>`;
};

// Static handlers
appData.themeListEl.addEventListener("click", ({ target }) => {
   if (["SPAN", "IMG", "I"].includes(target.tagName)) {
      const page = target.closest("label").querySelector("input").value;
      displayBook(appData.bookEl, appData.selectedBook.pdf, page);
   } else return;
});

////// Mount
const onMount = () => {
   const bookId = new URLSearchParams(window.location.search).get("book");

   (async () => {
      const { data } = await bookServer.get("/");
      appData.books = data.books;
      appData.selectBook(bookId);
      dispayDetails(appData.selectedBook);
      displayBook(appData.bookEl, appData.selectedBook.pdf);
      dispayThemes(appData.themeListEl, appData.selectedBook.themes);
   })();
};

onMount();
