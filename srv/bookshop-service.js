const cds = require('@sap/cds');
const { fRecommendBook } = require('./utils');

module.exports = cds.service.impl(async function () {

    this.before("pickUpBook", async (request) => {
        if (request.data.ID) {
            //OK
        }
        else {
            request.reject(499, "Missing book id");
        }

        if (request.data.Title) {
            //OK
        }
        else {
            request.reject(499, "Missing book title");
        }

        if (request.data.Author) {
            //OK
        }
        else {
            request.reject(499, "Missing book Author");
        }

    })


    this.on("pickUpBook", async (request) => {
        await fPickUpBook(request);
    })

    this.after("pickUpBook", async(request) => {
        await fRecommendBook(request);
    });


    this.before("returnBook", async (request) => {
        if (request.data.ID) {
            //OK
        }
        else {
            request.reject(499, "Missing book id");
        }

        if (request.data.Title) {
            //OK
        }
        else {
            request.reject(499, "Missing book title");
        }

        if (request.data.Author) {
            //OK
        }
        else {
            request.reject(499, "Missing book Author");
        }

    })


    this.on("returnBook", async (request) => {
        await fReturnBook(request);
    })


    this.before("newBook", async(request) => {
        await checkInput(request);
    })

    this.on("newBook", async(request) => {
        await fNewBook(request);
    })

})

