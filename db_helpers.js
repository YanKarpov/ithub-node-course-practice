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
    const data = await readDB(path);
    const newId = data.length > 0 ? Math.max(...data.map(entry => entry.id)) + 1 : 1;
    const newEntry = { id: newId, ...newData };

    await writeFile(path, JSON.stringify([...data, newEntry], null, 2));
    return newEntry;
  } catch (error) {
    console.error(error.message);
  }
}

async function updateDB(path, updatedData) {
  try {
    await writeFile(path, JSON.stringify(updatedData, null, 2));
    return updatedData;
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteDB(path, deleteId) {
  try {
    let data = await readDB(path);
    
    const updatedData = data.filter(entry => entry.id !== deleteId);

    await writeFile(path, JSON.stringify(updatedData, null, 2));
    
    return deleteId;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { readDB, writeDB, deleteDB, updateDB };g