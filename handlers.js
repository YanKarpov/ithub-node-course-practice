const { readDB, writeDB, deleteDB, updateDB } = require("./db_helpers");

// Функция для извлечения параметров из URL
const parseParams = (url, param) => {
  const path = new URL(`http://localhost:3000${url}`);
  const params = path.searchParams;
  return params.get(param);
};

// Обработчик для чтения событий
const readEvents = async (request, response) => {
  const eventId = parseParams(request.url, "id");
  const events = await readDB("db/events.json");

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
    const result = await writeDB("db/events.json", body);

    response.end(JSON.stringify(result));
  });
};

// Обработчик для удаления события
const deleteEvent = async (request, response) => {
  const eventId = parseParams(request.url, "id");
  const deletedId = await deleteDB("db/events.json", eventId);
  response.end(JSON.stringify({ id: deletedId }));
};

const updateEvent = async (request, response) => {
  const eventId = parseParams(request.url, "id");
  const events = await readDB("db/events.json");

  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", async () => {
    body = JSON.parse(body);

    const eventToUpdateIndex = events.findIndex((event) => event.id == eventId);

    if (!eventToUpdateIndex === -1) {
      response.writeHead(404);
      response.end();
      return;
    }

    const isEqual =
      JSON.stringify(events[eventToUpdateIndex]) === JSON.stringify(body);
    if (isEqual) {
      response.writeHead(204);
      response.end();
      return;
    }

    for (const [key, value] of Object.entries(body)) {
      events[eventToUpdateIndex][key] = value;
    }

    const result = await updateDB("db/events.json", events);

    response.writeHead(200, {
      "Content-Type": "application/json",
    });

    response.end(JSON.stringify(result[eventToUpdateIndex]));
  });
};

// Обработчик для чтения комнат
const readRooms = async (request, response) => {
  const roomId = parseParams(request.url, "id");
  const rooms = await readDB("db/rooms.json");

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
    const result = await writeDB("db/rooms.json", body);

    response.end(JSON.stringify(result));
  });
};

// Обработчик для удаления комнаты
const deleteRoom = async (request, response) => {
  const roomId = parseParams(request.url, "id");
  const deletedId = await deleteDB("db/rooms.json", roomId);
  response.end(JSON.stringify({ id: deletedId }));
};

module.exports = {
  createEvent,
  deleteEvent,
  readEvents,
  updateEvent,
  createRoom,
  deleteRoom,
  readRooms,
};
