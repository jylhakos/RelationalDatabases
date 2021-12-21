$ curl -X "POST" http://localhost:3001/api/users -H "Content-Type: application/json" -d "{\"username\":\"fullstack\", \"name\":\"fullstack\", \"password\":\"fullstack\"}"

$ curl -X "POST" http://localhost:3001/api/login -H "Content-Type: application/json" -d "{\"username\":\"fullstack\", \"password\":\"fullstack\"}"
