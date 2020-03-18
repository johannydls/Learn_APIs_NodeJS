import express from "express";
import consign from "consign"; //sucessor do express-load

const app = express();

//Fazendo autocarregamento dos scripts
consign({verbose: false})
    .include("libs/config.js")
    .then("db.js")
    .then("auth.js")
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app);

module.exports = app;