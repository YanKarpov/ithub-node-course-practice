const { readDB, writeDB, deleteDB, updateDB } = require("../db_helpers");
const { parseParams } = require("../utils");

const readReservations = async (request, response) => {
  const reservationId = parseParams(request.url, "id");
  const reservations = await readDB("db/reservations.json");

  response.setHeader("Content-Type", "application/json");

  if (reservationId) {
    const reservation = reservations.filter(res => res.id == reservationId);
    response.end(JSON.stringify(reservation));
  } else {
    response.end(JSON.stringify(reservations));
  }
};

const createReservation = async (request, response) => {
  response.writeHead(201, {
    "Content-Type": "application/json",
  });

  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", async () => {
    body = JSON.parse(body);
    const result = await writeDB("db/reservations.json", body);

    response.end(JSON.stringify(result));
  });
};

const updateReservation = async (request, response) => {
  const reservationId = parseParams(request.url, "id");
  const reservations = await readDB("db/reservations.json");

  let body = "";
  request.on("data", (chunk) => {
    body += chunk;
  });

  request.on("end", async () => {
    body = JSON.parse(body);

    const reservationToUpdateIndex = reservations.findIndex(res => res.id == reservationId);

    if (reservationToUpdateIndex === -1) {
      response.writeHead(404);
      response.end();
      return;
    }

    for (const [key, value] of Object.entries(body)) {
      reservations[reservationToUpdateIndex][key] = value;
    }

    const result = await updateDB("db/reservations.json", reservations);

    response.writeHead(200, {
      "Content-Type": "application/json",
    });

    response.end(JSON.stringify(result[reservationToUpdateIndex]));
  });
};

const deleteReservation = async (request, response) => {
  const reservationId = parseParams(request.url, "id");
  const reservations = await readDB("db/reservations.json");

  const reservationToDeleteIndex = reservations.findIndex(res => res.id == reservationId);

  if (reservationToDeleteIndex === -1) {
    response.writeHead(404, { "Content-Type": "application/json" });
    return response.end(JSON.stringify({ message: "Reservation not found" }));
  }

  await deleteDB("db/reservations.json", reservationId);

  response.writeHead(204); 
  response.end();
};


module.exports = {
  readReservations,
  createReservation,
  updateReservation,
  deleteReservation,
};
