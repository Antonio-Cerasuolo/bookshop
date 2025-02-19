using sap.bookshop as db from '../db/schema.cds';

@path: 'BookShop'
service BookShopService @(requires: [
  'bookshop_api_scope'
]){

    action pickUpBook(ID : String, Author : String, Title : String, Customer : db.Person);
    action returnBook(ID : String, Author : String, Title : String);
    action newBook(Title : String, Description : String, Author : String, Genre : String, Stock : Integer, Price : Decimal(9,2), Currency : String(3));

}
