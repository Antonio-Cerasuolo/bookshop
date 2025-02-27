const cds = require('@sap/cds');
const { fRecommendBook, fNewBook, fReturnBook, fPickUpBook, checkInput } = require('./utils');

module.exports = cds.service.impl(async function () {
    //const { Books, Register } = this.entities;  

    this.before("pickUpBook", async (request) => {
        await checkInput(request);
    });

    this.on("pickUpBook", async (request) => {
        await fPickUpBook(request);
    });

    this.after("pickUpBook", async (request) => {
        await fRecommendBook(request);
    });

    this.before("returnBook", async (request) => {
        await checkInput(request);
    });

    this.on("returnBook", async (request) => {
        await fReturnBook(request);
    });

    this.before("newBook", async (request) => {
        await checkInput(request);
    });

    this.on("newBook", async (request) => {
        await fNewBook(request);
    });
});