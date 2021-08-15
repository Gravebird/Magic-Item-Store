const fs = require("fs");

if (!fs.existsSync("data/data.json")) {
    createJSON();
}

const fileContents = fs.readFileSync("data/data.json", "utf8");

let Data = JSON.parse(fileContents);

function saveJSON() {
    const dataToSave = JSON.stringify(Data);
    fs.writeFileSync("data/data.json", dataToSave, "utf8");
}

function createJSON() {
    theData = 
    [
        {
            "shops": 
            [

            ]
        }
    ]
    fs.writeFileSync("data/data.json", JSON.stringify(theData));
}

module.exports = [Database, saveDatabase, createJSON];