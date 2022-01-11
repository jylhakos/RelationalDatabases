# Postgres

**psql**

The database can be accessed by running psql command.

**A table**

A column id is defined as a primary key, which means the value of the column must be unique for each row in the table and the value must not be empty. 

```
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    content text NOT NULL,
    important boolean,
    date time
);

```
