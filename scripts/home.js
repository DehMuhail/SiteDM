import { bookServer, serverConf } from "./server.conf.js";

const appData = {
   featuredBooks: [],
   featuredBooksEl: document.querySelector(".asycJFeaturedBooks")
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

const displayFeaturedBooks = (featuredBooksEl, books) => {
   books.forEach((book) => {
      displayBook(featuredBooksEl, book);
   });
};

////// Mount
const onMount = () => {
   (async () => {
      const {
         data: { books, featured }
      } = await bookServer.get("/");
      appData.featuredBooks = books.filter((book) =>
         featured.includes(book.id)
      );
      displayFeaturedBooks(appData.featuredBooksEl, appData.featuredBooks)
   })();
};

onMount();
