CREATE TABLE "Persons" (
    "Id"           SERIAL PRIMARY KEY,
    "Name"         VARCHAR(200)   NOT NULL,
    "Age"          INTEGER        NOT NULL,
    "DeletionDate" TIMESTAMP
);

CREATE TABLE "Categories" (
    "Id"          SERIAL PRIMARY KEY,
    "Description" VARCHAR(400)      NOT NULL,
    "Purpose"     VARCHAR(50)  NOT NULL
);

CREATE TABLE "Transactions" (
    "Id"           SERIAL PRIMARY KEY,
    "Description"  VARCHAR(400)     NOT NULL,
    "Amount"       NUMERIC(18,2)    NOT NULL,
    "Type"         VARCHAR(50)      NOT NULL,
    "CategoryId"   INTEGER          NOT NULL,
    "PersonId"     INTEGER          NOT NULL,
    "DeletionDate" TIMESTAMP,
    CONSTRAINT "FK_Transactions_Categories" FOREIGN KEY ("CategoryId")
        REFERENCES "Categories" ("Id") ON DELETE NO ACTION,
    CONSTRAINT "FK_Transactions_Persons" FOREIGN KEY ("PersonId")
        REFERENCES "Persons" ("Id") ON DELETE NO ACTION
);