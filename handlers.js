const { readDB, writeDB, deleteDB } = require("./db_helpers");



const parseParams = (url, param) => {
    const path = new URL(`http://localhost:3000${url}`);
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

  module.exports = { createEvent, deleteEvent, readEvents  }