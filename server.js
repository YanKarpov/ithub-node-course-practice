const PORT = 3000;

const http = require("http");
const { readDB, writeDB, deleteDB } = require("./db_helpers");

const parseParams = (url, param) => {
  const path = new URL(`http://localhost:${PORT}${url}`);
  const params = path.searchParams;
  return params.get(param);
};

const readEvents = async (request, response) => {
  const eventId = parseParams(request.url, "id");
  const events = await readDB("events.json");

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
    const result = await writeDB("events.json", body);

    response.end(JSON.stringify(result));
  });
};

const deleteEvent = async (request, response) => {
  const eventId = parseParams(request.url, "id");
  const deletedId = await deleteDB("events.json", eventId);
  response.end(JSON.stringify({ id: deletedId }));
};

const handleNotFound = (request, response) => {
  response.writeHead(404, { "Content-Type": "application/json" });
  const error = {
    code: 404,
    message: "Endpoint or method is not found",
  };
  response.end(JSON.stringify(error));
};

const routingTable = {
  "GET /event": readEvents,
  "POST /event": createEvent,
  "DELETE /event": deleteEvent,
};

const handler = async (request, response) => {
  if (request.url.startsWith("/event")) {
    try {
      await routingTable[`${request.method} /event`](request, response);
    } catch (error) {
      handleNotFound(request, response);
    }
  }
};

const server = http.createServer(handler);

server.listen(PORT, () => {
  console.log(`Server on localhost, port ${PORT}`);
});
