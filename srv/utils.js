const {}= cds.entities('sap.bookshop');

async function pickUpBook(request) {

    oQueryResult = SELECT.from(Books).where({ID: request.ID,Title : request.data.Title, Author : request.data.Author})

    for (let Book of oQueryResult) {

        if(Book.stock == 0){
            request.reject(499, "Stock for selected book is zero");
        }
        else {
            await UPDATE(Books).set({ stock: (Book.stock) - 1 }).where({ ID: Book.ID });
        }

    }

}

async function returnBook(request) {

    oQueryResult = SELECT.from(Books).where({ID: request.ID,Title : request.data.Title, Author : request.data.Author})

    for (let Book of oQueryResult) {

        if(Book.stock == 0){
            request.reject(499, "Stock for selected book is zero");
        }
        else {
            await UPDATE(Books).set({ stock: (Book.stock) + 1}).where({ ID: Book.ID });
        }

    }

}

module.exports ={
    pickUpBook,
    returnBook
}