using sap.bookshop as db from '../db/schema.cds';

@path: 'BookShop'
service BookShopService {

  entity Library  as projection on db.Library;
  entity Books    as projection on db.Books;
  entity Authors  as projection on db.Authors;
  entity Register as projection on db.Register;
  entity Genres   as projection on db.Genres;
  
  action pickUpBook(ID : String, Author : String, Title : String, Customer : db.Person);
  action returnBook(ID : String, Author : String, Title : String);
  action newBook(Title : String, Description : String, AuthorName : String,AuthorSurname: String, Genre : String, Stock : Integer, Price : Decimal(9, 2), Currency : String(3));

}
