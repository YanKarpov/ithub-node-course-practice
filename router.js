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
    const method = request.method;
    const url = new URL(request.url, this.#baseUrl).pathname;

    const routeKey = `${method} ${url}`;
    if (this.#routingTable[routeKey]) {
      try {
        await this.#routingTable[routeKey](request, response);
      } catch (error) {
        this.handleNotFound(request, response);
      }
    } else {
      this.handleNotFound(request, response);
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

  patch(endpoint, handler) {
    this.#routingTable[`PATCH ${endpoint}`] = handler;
  }
}

module.exports = { Router };
