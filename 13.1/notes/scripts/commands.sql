CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    content text NOT NULL,
    important boolean,
    date time
);

INSERT INTO notes (content, important) values ('Relational databases rule the world', true);

INSERT INTO notes (content, important) values ('MongoDB is webscale', false);
    
SELECT * from notes;

DROP TABLE notes;
