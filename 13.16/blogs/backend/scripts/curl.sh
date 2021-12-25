$ curl -X "POST" http://localhost:3001/api/users -H "Content-Type: application/json" -d "{\"username\":\"fullstack\", \"name\":\"fullstack\", \"password\":\"fullstack\"}"

$ curl -X "PUT" http://localhost:3001/api/users/stackfull -H "Content-Type: application/json" -d "{\"username\":\"dummy\", \"name\":\"stackfull\", \"password\":\"stackfull\"}"

$ curl -X "POST" http://localhost:3001/api/login -H "Content-Type: application/json" -d "{\"username\":\"fullstack\", \"password\":\"fullstack\"}"

$ curl -X "GET" http://localhost:3001/api/blogs

$ curl -X "GET" http://localhost:3001/api/authors

$ curl -X "GET" http://localhost:3001/api/blogs/2

$ curl -X "POST" http://localhost:3001/api/blogs -H "Content-Type: application/json" -d "{\"title\":\"React patterns\", \"author\":\"Michael Chan\", \"url\":\"https://reactpatterns.com/\", \"likes\":\"5\"}"

$ curl -X "POST" http://localhost:3001/api/blogs -H "Content-Type: application/json" -H "Authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI2MGU5NjA0NzA3MTg2MDU0NTYzYmQ5ZmMiLCJpYXQiOjE2MjU5NjU4NDl9.UdJx2pAefZfdR_5JMjvtcNk-KtbgCJtjGmbloiPqq6c" -d "{\"title\":\"Canonical string reduction\", \"author\":\"Edsger W. Dijkstra\", \"url\":\"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html\", \"likes\":\"5\"}"

$ curl -X "PUT" http://localhost:3001/api/blogs/2 -H "Content-Type: application/json" -d "{\"title\":\"React patterns\", \"author\":\"Michael Chan\", \"url\":\"https://reactpatterns.com/\", \"likes\":\"5\"}" -v

$ curl -X "DELETE" http://localhost:3003/api/blogs/2

