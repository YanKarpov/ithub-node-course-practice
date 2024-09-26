const { readDB, writeDB, deleteDB, updateDB } = require("../db_helpers");
const { parseParams } = require("../utils");

const readEvents = async (request, response) => {
  const eventId = parseParams(request.url, "id");
  const events = await readDB("db/events.json");

  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(events.filter((event) => event.id == eventId)));
};

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

module.exports = {
  readEvents,
  createEvent,
  deleteEvent,
  updateEvent,
};
