import { bookServer, serverConf } from "./server.conf.js";

const appData = {
   themes: [],
   selectedTheme: "",
   books: [],
   changeTheme(theme) {
      this.selectedTheme = theme;
   },
   // Selected elements
   themeListEl: document.querySelector(".asyncJThemeList"),
   catalogListEl: document.querySelector(".ayncJCatalogList")
};

// Side-effect functions
const displayThemes = (listEl, themes) => {
   listEl.innerHTML = "";
   themes.forEach((theme, i) => {
      listEl.insertAdjacentHTML(
         "beforeend",
         `<li>
                     <label> <input type="radio" name="theme" value="${theme}" /> <span>${theme}</span></label>
                  </li>`
      );
   });
};

const displayBook = (catalogEl, book) => {
   catalogEl.insertAdjacentHTML(
      "beforeend",
      `<div class="catalog-card">
                  <img
                     src="${serverConf.getCover(book.cover)}"
                     alt="dm"
                  />
                  <h4>${book.title}</h4>
                  <a class="btn-main" href="book.html?book=${
                     book.id
                  }">Читати</a>
      </div>`
   );
};

const displayBooks = (catalogEl, books, filter) => {
   catalogEl.innerHTML = "";

   if (!filter) {
      books.forEach((book) => {
         displayBook(catalogEl, book);
      });
   } else {
      books
         .filter((book) => book.themesNames.includes(filter))
         .forEach((book) => {
            displayBook(catalogEl, book);
         });
   }
};

// Static handlers
appData.themeListEl.addEventListener("click", ({ target }) => {
   if (target.tagName === "SPAN") {
      const theme = target.closest("label").querySelector("input").value;
      appData.changeTheme(theme);
      displayBooks(appData.catalogListEl, appData.books, appData.selectedTheme);
   } else return;
});





////// Mount
const onMount = () => {
   (async () => {
      const { data } = await bookServer.get("/");
      appData.themes = data.themes;
      appData.books = data.books.map((book) => {
         return {
            ...book,
            themesNames: book.themes.map((theme) => theme.name)
         };
      });
      displayThemes(appData.themeListEl, data.themes);
      displayBooks(appData.catalogListEl, data.books);
   })();
};

onMount();
