namespace sap.bookshop;

using {
  Currency,
  managed,
  sap
} from '@sap/cds/common';

type AddressType {
  city         : String;
  street       : String;
  streetNumber : Integer;
}

type Person{
  name : String;
  surname : String;
  docNo : String(10);
  address : AddressType;
}

entity Library {
  key name           : String(30);
  key libraryAddress : AddressType
}

entity Books {
  key ID       : UUID;
      title    : localized String(30);
      descr    : localized String(200);
      author   : Association to Authors;
      genre    : Association to Genres;
      stock    : Integer;
      price    : Decimal(9, 2);
      currency : Currency;
}

entity Authors {
  key ID    : UUID;
      name  : String(30);
      books : Association to many Books
                on books.author = $self;
}

entity Register : managed {
  key ID              : UUID;
  Day                 : DateTime;         // Data e ora del ritiro
  book                : Association to Books;  // Libro ritirato
  borrowedBy          : Person;       // Persona che ha ritirato il libro
  returnDate          : Date;             // Data prevista per la restituzione
  actualReturnDate    : Date;             // Data effettiva di restituzione
}
entity Genres : sap.common.CodeList {
  key ID : UUID;

}
