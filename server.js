const dotenv = require('dotenv');
dotenv.config();

const { HOST, PORT, SSL } = process.env;

const http = require("http");
const { createEvent, deleteEvent, readEvents, createRoom, deleteRoom, readRooms } = require("./handlers");
const { Router } = require("./router");

const router = new Router(`http://${HOST}:${PORT}`, {
  "GET /event": readEvents,
  "GET /room": readRooms,
});

router.post('/event', createEvent);
router.delete('/event', deleteEvent);

router.post('/room', createRoom);
router.delete('/room', deleteRoom);

const server = http.createServer(router.handler);

server.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
