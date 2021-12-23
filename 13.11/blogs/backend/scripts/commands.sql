ALTER USER postgres WITH password 'postgres';

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE blogs ADD COLUMN userId INTEGER DEFAULT 2;

INSERT INTO blogs (author, url, title, likes) values ('Michael Chan', 'https://reactpatterns.com/', 'React patterns', 0);

INSERT INTO blogs (author, url, title, likes) values ('Robert C. Martin', 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html', 'First class tests', 0);

SELECT * from blogs;

DROP TABLE blogs;

$ sudo -u postgres psql postgres

postgres=# ALTER USER postgres WITH password 'postgres';

postgres=# SELECT * FROM blogs;

postgres=# SELECT * FROM users;

postgres=# DELETE FROM blogs WHERE blogs.id = 1;
