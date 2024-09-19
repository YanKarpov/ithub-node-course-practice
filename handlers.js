const { readDB, writeDB, deleteDB } = require("./db_helpers");

// Функция для извлечения параметров из URL
const parseParams = (url, param) => {
  const path = new URL(`http://localhost:3000${url}`);
  const params = path.searchParams;
  return params.get(param);
};

// Обработчик для чтения событий
const readEvents = async (request, response) => {
  const eventId = parseParams(request.url, "id");
  const events = await readDB("events.json");

  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(events.filter((event) => event.id == eventId)));
};

// Обработчик для создания события
const createEvent = async (request, response) => {
  response.writeHead(201, {
    "Content-Type": "application/json",
  });

  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", async () => {
    body = JSON.parse(body);
    const result = await writeDB("events.json", body);

    response.end(JSON.stringify(result));
  });
};

// Обработчик для удаления события
const deleteEvent = async (request, response) => {
  const eventId = parseParams(request.url, "id");
  const deletedId = await deleteDB("events.json", eventId);
  response.end(JSON.stringify({ id: deletedId }));
};

// Обработчик для чтения комнат
const readRooms = async (request, response) => {
  const roomId = parseParams(request.url, "id");
  const rooms = await readDB("rooms.json");

  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(rooms.filter((room) => room.id == roomId)));
};

// Обработчик для создания комнаты
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
    const result = await writeDB("rooms.json", body);

    response.end(JSON.stringify(result));
  });
};

// Обработчик для удаления комнаты
const deleteRoom = async (request, response) => {
  const roomId = parseParams(request.url, "id");
  const deletedId = await deleteDB("rooms.json", roomId);
  response.end(JSON.stringify({ id: deletedId }));
};

module.exports = { createEvent, deleteEvent, readEvents, createRoom, deleteRoom, readRooms };
