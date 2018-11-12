import express from "express";
import consign from "consign"; //sucessor do express-load

const app = express();

//Fazendo autocarregamento dos scripts
consign()
    .include("libs/config.js")
    .then("db.js")
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app);