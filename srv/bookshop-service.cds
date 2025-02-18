using sap.bookshop as db from '../db/schema.cds';

@path: 'BookShop'
service BookShopService @(requires: [
  'bookshop_api_scope'
]){

    action pickUpBook(ID : String, Author : String, Title : String);
    action returnBook(ID : String, Author : String, Title : String);
    

}
