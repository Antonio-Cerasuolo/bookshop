const cds = require('@sap/cds');

module.exports = cds.service.impl(async function (){

this.before("pickUpBook",async (request)=>{

if (request.data.Title){
    //OK
}
else{
    request.reject(499,"Missing book title");
}

if (request.data.Author){
    //OK
}
else{
    request.reject(499,"Missing book Author");
}

})


this.on("pickUpBook",async (request) => {
    await pickUpBook(request);
})

})

