"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Abschlussarbeit;
(function (Abschlussarbeit) {
    let highscores;
    let databaseUrl = "mongodb://localhost:2717";
    let port = process.env.PORT;
    if (port == undefined) {
        port = 5002;
    }
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Portnummer: " + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    function connectToDatabase(_url) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = { useNewUrlParser: true, useUnifiedTopology: true };
            let mongoClient = new Mongo.MongoClient(_url, options);
            yield mongoClient.connect();
            highscores = mongoClient.db("Vogelhaus").collection("highscores");
            console.log("Database connection ", highscores != undefined);
        });
    }
    function handleRequest(_request, _response) {
        console.log("omgomg");
        _response.setHeader("content-type", "text/html; charset = utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let score;
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key]);
                score = key + ":" + url.query[key];
            }
            let json = JSON.stringify(url.query);
            _response.write(json);
            storeScore(url.query);
        }
        _response.end();
    }
    function storeScore(_score) {
        highscores.insert(_score);
    }
})(Abschlussarbeit = exports.Abschlussarbeit || (exports.Abschlussarbeit = {}));
//# sourceMappingURL=Server.js.map