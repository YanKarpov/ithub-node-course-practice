const dotenv = require('dotenv')
dotenv.config()

const { HOST, PORT, SSL} = process.env 


const http = require("http");
const { createEvent, deleteEvent, readEvents } = require("./handlers");
const { Router } = require("./router");
const { read } = require("fs");

const router = new Router(`http://${HOST}:${PORT}`, {
  "GET /event": readEvents,
});

router.post('/event', createEvent)
router.delete('/event', deleteEvent)

const server = http.createServer(router.handler);

server.listen(PORT, () => {
  console.log(`Server on localhost, port ${PORT}`);
});
