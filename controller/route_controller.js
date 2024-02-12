const dnd_data_controller = require("./dnd_data_controller");



let routeController = {
    welcome: (req, res) => {
        let name = null;
        if (req.user != null) {
            name = req.user.username;
        }
        res.render("generic/welcome", {user: name});
    },

    shop_generator_form: async function (req, res) {
        book_list = await dnd_data_controller.getNonCoreBooks();
        res.render("shop_generator/shop_generator", {books: book_list});
    },

    test: async function (req, res) {
        book_list = await dnd_data_controller.getBooks();
        console.log(book_list);
        res.render("generic/test", {books: book_list});
    }
}

module.exports = routeController;