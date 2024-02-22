const dnd_data_controller = require("./dnd_data_controller");
const weaponModel = require("../models/weaponModel");
const armorModel = require("../models/armorModel");


function addFloats(x, y) {
    return (x * 100 + y * 100) / 100;
}


let shopGeneratorController = {
    generate: async function(req, res) {
        bodylist = JSON.parse(JSON.stringify(req.body));

        const shopName = bodylist["shopNameInput"];
        const sourceBooks = bodylist["booksInput"];
        const numItems = parseInt(bodylist["numItemsInShop"]);
        const minGold = parseInt(bodylist["minGoldValue"]);
        const maxGold = parseInt(bodylist["maxGoldValue"]);

        const weaponPercentage = parseInt(bodylist["weaponPercentage"]);
        const armorPercentage = parseInt(bodylist["armourPercentage"]);
        const potionPercentage = parseInt(bodylist["potionPercentage"]);
        const scrollPercentage = parseInt(bodylist["scrollPercentage"]);
        const wandPercentage = parseInt(bodylist["wandPercentage"]);
        const ringPercentage = parseInt(bodylist["ringPercentage"]);
        const rodPercentage = parseInt(bodylist["rodPercentage"]);
        const staffPercentage = parseInt(bodylist["staffPercentage"]);
        const wondrousItemPercentage = parseInt(bodylist["wondrousItemPercentage"]);
        const miscItemPercentage = parseInt(bodylist["miscItemPercentage"]);

        // Verify the name is not already in use by this user
    }
}