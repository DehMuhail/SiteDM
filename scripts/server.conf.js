const serverConf = {
   baseURL: "https://bobr2004.github.io/pagesJsonServer",
   coverFolder: () => `${serverConf.baseURL}/covers/`,
   getCover(coverName) {
      return this.coverFolder() + coverName;
   },
   pdfFolder: () => `${serverConf.baseURL}/pdfs/`,
   getPdf(pdfName) {
      return this.pdfFolder() + pdfName;
   }
};

const bookServer = axios.create({
   baseURL: serverConf.baseURL
});

export { bookServer, serverConf };
