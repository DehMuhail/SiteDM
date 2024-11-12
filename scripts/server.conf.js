const serverConf = {
   baseURL: "https://dehmuhail.github.io/jsonback/",
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
