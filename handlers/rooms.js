const { readDB, writeDB, deleteDB } = require("../db_helpers");
const { parseParams } = require("../utils");

const readRooms = async (request, response) => {
  const roomId = parseParams(request.url, "id");
  const rooms = await readDB("db/rooms.json");

  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(rooms.filter((room) => room.id == roomId)));
};

const createRoom = async (request, response) => {
  response.writeHead(201, {
    "Content-Type": "application/json",
  });

  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", async () => {
    body = JSON.parse(body);
    const result = await writeDB("db/rooms.json", body);

    response.end(JSON.stringify(result));
  });
};

const deleteRoom = async (request, response) => {
  const roomId = parseParams(request.url, "id");
  const deletedId = await deleteDB("db/rooms.json", roomId);
  response.end(JSON.stringify({ id: deletedId }));
};

module.exports = {
  readRooms,
  createRoom,
  deleteRoom,
};
