CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) values ('Michael Chan', 'https://reactpatterns.com/', 'React patterns', 0);

INSERT INTO blogs (author, url, title, likes) values ('Robert C. Martin', 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html', 'First class tests', 0);

SELECT * from blogs;

DROP TABLE blogs;
