const dotenv = require("dotenv");
dotenv.config();

const { HOST, PORT } = process.env;

const http = require("http");
const {
  createEvent,
  deleteEvent,
  readEvents,
  updateEvent,
  createRoom,
  deleteRoom,
  readRooms,
  createReservation,
  deleteReservation,
  readReservations,
  updateReservation,
} = require("./handlers/index.js");

const { Router } = require("./router");

const router = new Router(`http://${HOST}:${PORT}`, {
  "GET /event": readEvents,
  "GET /room": readRooms,
  "GET /reservation": readReservations,
});

router.post("/event", createEvent);
router.delete("/event", deleteEvent);
router.patch("/event", updateEvent);

router.post("/room", createRoom);
router.delete("/room", deleteRoom);

router.post("/reservation", createReservation);
router.delete("/reservation", deleteReservation);
router.patch("/reservation", updateReservation);

const server = http.createServer(router.handler);

server.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});