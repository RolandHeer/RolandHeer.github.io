import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Abschlussarbeit {

    interface Highscore {
        [type: string]: string | string[];
    }

    let highscores: Mongo.Collection;
    let databaseUrl: string = "mongodb://localhost:2717";

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined) {
        port = 5002;
    }
    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        console.log("Portnummer: " + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        highscores = mongoClient.db("Vogelhaus").collection("highscores");
        console.log("Database connection ", highscores != undefined);
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {

        console.log("omgomg");
        _response.setHeader("content-type", "text/html; charset = utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
            let score: string;
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key]);
                score = key + ":" + url.query[key];

            }
            let json: string = JSON.stringify(url.query);
            _response.write(json);
            storeScore(url.query);

        }
        _response.end();
    }

    function storeScore(_score: Highscore): void {
        highscores.insert(_score);
    }
}