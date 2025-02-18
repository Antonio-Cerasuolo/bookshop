const cds = require('@sap/cds');

module.exports = cds.service.impl(async function (){

this.on("pickUpBook",async (request) => {
    await pickUpBook(request);
})

})

