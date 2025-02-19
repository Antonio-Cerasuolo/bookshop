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
            await INSERT.into(Register).set({
                ID:uuid(),
                Day: new Date(),
                book: Book.ID,
                borrowedBy: request.Person
            })
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

async function fRecommendBook(request) {
    const {ID} = request.data;
    
    var oQueryResult = SELECT.from(Books).where({ ID: ID });

    var aRecommendations = SELECT.from(Books).where({author_ID : oQueryResult.author_ID}).or({genre_ID: oQueryResult.genre_ID});

    if(aRecommendations.length > 0){
        return aRecommendations;
    }else{
        return 'No recommendations available.'
    }
    
}

async function checkInput(request) {
    for(const data in request.data){
        if(data){
            //OK
        }
        else {
            request.reject(499,`${data} cannot be undefined`)
        }
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
    fNewBook,
    checkInput,
    fRecommendBook
}