let data = require("../controller/persistence_controller")[0];
const saveData = require("../controller/persistence_controller")[1];
const { getUserByUsernameAndPassword } = require("./user_controller");
const path = require("path");
const { default: fetch } = require("node-fetch");
const express = require("express");

let authController = {
    login: (req, res) => {
        res.render("auth/signin");
    },

    register: (req, res) => {
        let token = false;
        data.forEach(user => {
            if (user.username == req.query.username) {
                token = true;
            }
        });
        if (token) {
            res.render("auth/signin");
        } else {
            res.render("auth/register", {
                username: req.query.username
            });
        }
    },

    registerSubmit: (req, res) => {
        let userToAdd = {
            id: data.length + 1,
            username: req.body.username,
            password: req.body.password,
            shops: []
        };

        let flag = 0;
        data.forEach(user => {
            if (userToAdd.username == user.username) {
                flag = 1;
                console.log("User already has this email");
                res.render("auth/register", {
                    message: "User already has this username."
                });
            }
        });
        if (flag == 0) {
            data.push(userToAdd);
            saveData();
            res.render("auth/signin" , {
                message: "Thank you for registering!"
            });
        }
    }
};

module.exports = authController;