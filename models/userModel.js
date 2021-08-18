let data = require("../controller/persistence_controller")[0];

const userModel = {
    findOne: (username) => {
        const user = data.find((user) => user.username === username);
        if (user) {
            return user;
        }
        return null;
    },

    findById: (id) => {
        const user = data.find((user) => user.id === id);
        if (user) {
            return user;
        }
        return null;
    }
};

module.exports = { data, userModel };