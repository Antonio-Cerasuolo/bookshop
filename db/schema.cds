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

entity Library {
  key name           : String(30);
  key libraryAddress : AddressType
}

entity Books : managed {
  key ID       : UUID;
      title    : localized String(30);
      descr    : localized String(200);
      author   : Association to Authors;
      genre    : Association to Genres;
      stock    : Integer;
      price    : Decimal(9, 2);
      currency : Currency;
}

entity Authors : managed {
  key ID    : UUID;
      name  : String(30);
      books : Association to many Books
                on books.author = $self;
}

entity Genres : sap.common.CodeList {
  key ID : UUID;

}
