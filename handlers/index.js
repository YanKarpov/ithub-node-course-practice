const { readEvents, createEvent, deleteEvent, updateEvent } = require("./events");
const { readRooms, createRoom, deleteRoom } = require("./rooms");
const { readReservations, createReservation, updateReservation, deleteReservation } = require("./reservation");

module.exports = {
  readEvents,
  createEvent,
  deleteEvent,
  updateEvent,
  readRooms,
  createRoom,
  deleteRoom,
  readReservations,
  createReservation,
  updateReservation,
  deleteReservation,
};
