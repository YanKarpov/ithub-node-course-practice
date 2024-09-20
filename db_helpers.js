const { readFile, writeFile } = require("fs/promises");

async function readDB(path) {
  try {
    const data = await readFile(path, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
}

async function writeDB(path, newData) {
  try {
    const data = JSON.parse(await readFile(path, { encoding: "utf8" }));
    const newEntry = { id: data.length + 1, ...newData };

    await writeFile(path, JSON.stringify([...data, newEntry]));
    return newEntry;
  } catch (error) {
    console.error(error.message);
  }
}

async function updateDB(path, newData) {
  try {
    await writeFile(path, JSON.stringify(newData));
    return newData;
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteDB(path, deleteId) {
  const data = JSON.parse(await readFile(path, { encoding: "utf8" }));
  data[deleteId - 1] = { id: deleteId };
  await writeFile(path, JSON.stringify(data));

  return deleteId;
}

module.exports = { readDB, writeDB, deleteDB, updateDB };
