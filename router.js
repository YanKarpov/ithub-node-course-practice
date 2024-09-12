// const routingTable = {
//     "GET /event": readEvents,
//     "POST /event": createEvent,
//     "DELETE /event": deleteEvent,
//   };

class Router {
  #baseUrl;
  #routingTable;

  constructor(baseUrl, routingTable = {}) {
    this.#baseUrl = baseUrl;
    this.#routingTable = routingTable;
  }

  handleNotFound = (request, response) => {
    response.writeHead(404, { "Content-Type": "application/json" });
    const error = {
      code: 404,
      message: "Endpoint or method is not found",
    };
    response.end(JSON.stringify(error));
  };

  handler = async (request, response) => {
    if (request.url.startsWith("/event")) {
      try {
        await this.#routingTable[`${request.method} /event`](request, response);
      } catch (error) {
        this.handleNotFound(request, response);
      }
    }
  };

  get(endpoint, handler) {
    this.#routingTable[`GET ${endpoint}`] = handler;
  }
  post(endpoint, handler) {
    this.#routingTable[`POST ${endpoint}`] = handler;
  }
  delete(endpoint, handler) {
    this.#routingTable[`DELETE ${endpoint}`] = handler;
  }
}

module.exports = { Router };
