const { } = cds.entities('sap.bookshop');
const { uuid } = cds.utils;

async function fPickUpBook(request) {

    oQueryResult = SELECT.from(Books).where({ ID: request.ID, Title: request.data.Title, Author: request.data.Author })

    for (let Book of oQueryResult) {

        if (Book.stock == 0) {
            request.reject(499, "Stock for selected book is zero");
        }
        else {
            await UPDATE(Books).set({ stock: (Book.stock) - 1 }).where({ ID: Book.ID });
        }

    }

}

async function fReturnBook(request) {

    oQueryResult = SELECT.from(Books).where({ ID: request.ID, Title: request.data.Title, Author: request.data.Author })

    for (let Book of oQueryResult) {

        if (Book.stock == 0) {
            request.reject(499, "Stock for selected book is zero");
        }
        else {
            await UPDATE(Books).set({ stock: (Book.stock) + 1 }).where({ ID: Book.ID });
        }

    }


    async function fNewBook(request) {
    const {
        Title,
        Description,
        Author,
        Genre,
        Stock,
        Price,
        Currency
    } = request.data

    await INSERT.into(Books).entries({
        ID: uuid(), 
        title: Title,
        descr: Description,
        author: Author,
        genre: Genre,
        stock: Stock,
        price: Price,
        currency: Currency
    });

    }

}

module.exports = {
    fPickUpBook,
    fReturnBook,
    fNewBook
}