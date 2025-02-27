const cds = require('@sap/cds');
const { uuid } = cds.utils;

async function fPickUpBook(request) {
    const { Books, Register, Authors, Library } = cds.entities;  // Ottieni le entità dal contesto CAP
    const { ID, Title, Author, Person } = request.data;

    const oQueryResult = await SELECT.from(Books).where({ ID, title: Title, author: Author });

    if (oQueryResult.length === 0) {
        return request.reject(404, "Book not found");
    }

    for (let Book of oQueryResult) {
        if (Book.stock === 0) {
            return request.reject(499, "Stock for selected book is zero");
        }

        await UPDATE(Books).set({ stock: Book.stock - 1 }).where({ ID: Book.ID });

        await INSERT.into(Register).entries({
            ID: uuid(),
            Day: new Date(),
            book: Book.ID,
            borrowedBy: Person
        });
    }

    return "Book borrowed successfully!";
}

async function fReturnBook(request) {
    const { Books } = cds.entities;
    const { ID, Title, Author } = request.data;

    const oQueryResult = await SELECT.from(Books).where({ ID, title: Title, author: Author });

    if (oQueryResult.length === 0) {
        return request.reject(404, "Book not found");
    }

    for (let Book of oQueryResult) {
        await UPDATE(Books).set({ stock: Book.stock + 1 }).where({ ID: Book.ID });
    }

    return "Book returned successfully!";
}

async function fRecommendBook(request) {
    const { Books } = cds.entities;
    const { ID } = request.data;

    const [book] = await SELECT.from(Books).where({ ID });
    if (!book) return request.reject(404, "Book not found");

    const recommendations = await SELECT.from(Books)
        .where({ author: book.author })
        .or({ genre: book.genre });

    return recommendations.length > 0 ? recommendations : "No recommendations available.";
}

async function checkInput(request) {
    for (const key in request.data) {
        if (!request.data[key]) {
            return request.reject(499, `${key} cannot be undefined`);
        }
    }
}

async function fNewBook(request) {
    const { Books } = cds.entities;
    const {
        Title,
        Description,
        AuthorName,
        AuthorSurname,
        Genre,
        Stock,
        Price,
        Currency
    } = request.data;

    await INSERT.into(Books).entries({
        ID: uuid(),
        title: Title,
        descr: Description,
        author_name: AuthorName,
        author_surname: AuthorSurname,
        genre_type: Genre,
        stock: Stock,
        price: Price,
        currency_code: Currency
    });

    return "New book added successfully!";
}

module.exports = {
    fPickUpBook,
    fReturnBook,
    fNewBook,
    checkInput,
    fRecommendBook
};