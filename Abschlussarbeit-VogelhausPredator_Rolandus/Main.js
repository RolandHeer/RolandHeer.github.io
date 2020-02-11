var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Abschlussarbeit;
(function (Abschlussarbeit) {
    window.addEventListener("load", setup);
    window.setInterval(update, 20);
    //let  url: string = "https://birdhunting.herokuapp.com/"
    let url = "http://localhost:5002/";
    let change = true;
    let gameOver = false;
    let treeArray = [];
    let birdArray = [];
    let snowArray = [];
    let snowballArray = [];
    let feedingArray = [];
    let canvas;
    let crc2;
    let backgroundImage;
    let feeding = true;
    let tolerance = 0.05;
    let maxSeeds = 3;
    let leftSeeds = 50;
    let leftSnowballs = 5;
    let score = 0;
    let preWidth;
    let preHeight;
    let userName = "";
    function setup() {
        defineValues();
        createThingos();
        renderScene();
        canvas.addEventListener("click", clickHandler);
        window.addEventListener("keydown", switchMode);
    }
    function update() {
        if (!gameOver) {
            if (window.innerWidth != preWidth || window.innerHeight != preHeight) {
                canvas.width = (window.innerWidth / 5) * 4;
                preWidth = (window.innerWidth / 5) * 4;
                canvas.height = (window.innerHeight / 5) * 4;
                preHeight = (window.innerHeight / 5) * 4;
                document.getElementById("side").style.width = window.innerWidth / 7 + "px";
                change = true;
            }
            document.getElementById("side").style.width = window.innerWidth / 7 + "px";
            updateMoving();
            updateHtml();
            renderScene();
        }
        else {
            renderScene();
        }
    }
    function defineValues() {
        canvas = document.querySelector("canvas");
        canvas.width = (window.innerWidth / 5) * 4;
        preWidth = (window.innerWidth / 5) * 4;
        canvas.height = (window.innerHeight / 5) * 4;
        preHeight = (window.innerHeight / 5) * 4;
        crc2 = canvas.getContext("2d");
        document.getElementById("side").style.width = window.innerWidth / 7 + "px";
        document.querySelector("footer").style.width = window.innerWidth + "px";
    }
    function createThingos() {
        createTrees();
        createBirds(10);
        createSnow(150);
    }
    function renderScene() {
        if (!gameOver) {
            if (change) {
                Abschlussarbeit.Render.background(crc2);
                Abschlussarbeit.Render.hills(crc2);
                Abschlussarbeit.Render.ground(crc2);
                Abschlussarbeit.Render.trees(crc2, treeArray);
                change = false;
            }
            else {
                crc2.putImageData(backgroundImage, 0, 0);
            }
            Abschlussarbeit.Render.seeds(crc2, feedingArray);
            Abschlussarbeit.Render.birdsHouse(crc2);
            Abschlussarbeit.Render.snowman(crc2);
            Abschlussarbeit.Render.birds(crc2, birdArray);
            Abschlussarbeit.Render.snow(crc2, snowArray);
            Abschlussarbeit.Render.snowball(crc2, snowballArray);
        }
        else {
            if (change) {
                Abschlussarbeit.Render.background(crc2);
                Abschlussarbeit.Render.hills(crc2);
                Abschlussarbeit.Render.ground(crc2);
                Abschlussarbeit.Render.trees(crc2, treeArray);
                Abschlussarbeit.Render.seeds(crc2, feedingArray);
                Abschlussarbeit.Render.birdsHouse(crc2);
                Abschlussarbeit.Render.snowman(crc2);
                Abschlussarbeit.Render.birds(crc2, birdArray);
                Abschlussarbeit.Render.snow(crc2, snowArray);
                crc2.fillStyle = "rgba(250,250,250,0.5)";
                crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
                backgroundImage = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
                change = false;
            }
            else {
                crc2.putImageData(backgroundImage, 0, 0);
                if (userName == null || userName == "") {
                    askName();
                }
            }
        }
    }
    function createTrees() {
        for (let i = 5; i > 0; i--) {
            let x = ((50 / 5) * (i - 0.5)) / 100;
            let y = (48 + (Math.random() * 4)) / 100;
            treeArray.push(new Abschlussarbeit.Tree(new Abschlussarbeit.Vector(x, y)));
        }
        for (let i = 4; i > 0; i--) {
            let x = ((50 / 5) * (i - 1)) / 100;
            let y = (60 + (Math.random() * 4)) / 100;
            treeArray.push(new Abschlussarbeit.Tree(new Abschlussarbeit.Vector(x, y)));
        }
        for (let i = 4; i > 0; i--) {
            let x = 1 - (((40 / 5) * (i - 1)) / 100);
            let y = (55 + (Math.random() * 4)) / 100;
            treeArray.push(new Abschlussarbeit.Tree(new Abschlussarbeit.Vector(x, y)));
        }
        for (let i = 2; i > 0; i--) {
            let x = 1 - (((35 / 5) * (i - 0.5)) / 100);
            let y = (70 + (Math.random() * 4)) / 100;
            treeArray.push(new Abschlussarbeit.Tree(new Abschlussarbeit.Vector(x, y)));
        }
        let x = 1 - ((20 / 5) / 100);
        let y = (85 + (Math.random() * 4)) / 100;
        treeArray.push(new Abschlussarbeit.Tree(new Abschlussarbeit.Vector(x, y)));
    }
    function createBirds(_count) {
        for (let i = _count; i > 0; i--) {
            birdArray.push(new Abschlussarbeit.Bird(new Abschlussarbeit.Vector(Math.random(), Math.random())));
        }
    }
    function createSnow(_count) {
        for (let i = _count; i > 0; i--) {
            snowArray.push(new Abschlussarbeit.Snow(new Abschlussarbeit.Vector(Math.random(), Math.random())));
        }
    }
    function updateMoving() {
        for (let snow of snowArray) {
            snow.move(1 / 50);
        }
        for (let i = feedingArray.length; i > 0; i--) {
            if (feedingArray[i - 1][0].isMovable()) {
                if (feedingArray[i - 1][0].getPosition().y < 0.7 + ((Math.random() * 6) / 10)) {
                    for (let seed of feedingArray[i - 1]) {
                        seed.move(1 / 50);
                    }
                }
                else {
                    for (let seed of feedingArray[i - 1]) {
                        seed.makeUnmovable();
                    }
                }
            }
            if (feedingArray[i - 1][0].isFeastedOn()) {
                for (let seed of feedingArray[i - 1]) {
                    if (!seed.isFeastedOn()) {
                        seed.setFeastedOn();
                    }
                }
            }
            for (let j = feedingArray[i - 1].length; j > 0; j--) {
                let tempCount = feedingArray[i - 1][j - 1].update();
                if (tempCount) {
                    if (feedingArray[i - 1][j - 1].isMain) {
                        feedingArray[i - 1].splice(j - 1, 1);
                    }
                    feedingArray[i - 1].splice(j - 1, 1);
                }
            }
        }
        for (let bird of birdArray) {
            bird.move(1 / 50);
        }
        for (let i = feedingArray.length; i > 0; i--) {
            if (feedingArray[i - 1][0].isSpliced()) {
                console.log("ich lösche es raus!");
                feedingArray.splice(i - 1, 1);
            }
        }
        for (let bird of birdArray) {
            bird.resetAvailable();
            for (let stops of feedingArray) {
                bird.setAvailable(stops[0]);
            }
        }
        for (let i = snowballArray.length; i > 0; i--) {
            if (!snowballArray[i - 1].isHitting()) {
                snowballArray[i - 1].move(1 / 50);
            }
            else {
                let tempBirdCount = 0;
                for (let j = birdArray.length; j > 0; j--) {
                    if (((birdArray[j - 1].getPosition().x < snowballArray[i - 1].getPosition().x + tolerance)
                        && (birdArray[j - 1].getPosition().x > snowballArray[i - 1].getPosition().x - tolerance))
                        && ((birdArray[j - 1].getPosition().y < snowballArray[i - 1].getPosition().y + tolerance)
                            && (birdArray[j - 1].getPosition().y > snowballArray[i - 1].getPosition().y - tolerance))) {
                        birdArray.splice(j - 1, 1);
                        tempBirdCount++;
                    }
                }
                score += tempBirdCount * tempBirdCount;
                snowballArray.splice(i - 1, 1);
            }
        }
        if (birdArray.length == 0 || leftSnowballs == 0) {
            gameOver = true;
            change = true;
        }
    }
    function updateHtml() {
        if (feeding) {
            document.getElementById("chosen").innerHTML = "Futter";
        }
        else {
            document.getElementById("chosen").innerHTML = "Schneeball";
        }
        document.getElementById("snowballs").innerHTML = "" + leftSnowballs;
        document.getElementById("seeds").innerHTML = "" + leftSeeds;
        document.getElementById("score").innerHTML = "" + score;
    }
    function clickHandler(_event) {
        let mouseXrelative = _event.clientX / (crc2.canvas.width - 1);
        let mouseYrelative = _event.clientY / (crc2.canvas.height - 1);
        if (feeding) {
            if (leftSeeds != 0) {
                if (feedingArray.length < maxSeeds) {
                    let tempArray = [];
                    for (let i = 10; i > 0; i--) {
                        if (i == 10) {
                            tempArray.push(new Abschlussarbeit.Seed(new Abschlussarbeit.Vector(mouseXrelative, mouseYrelative), true));
                        }
                        else {
                            tempArray.push(new Abschlussarbeit.Seed(new Abschlussarbeit.Vector((mouseXrelative - 0.025) + (Math.random() / 20), (mouseYrelative - 0.025) + (Math.random() / 20)), false));
                        }
                    }
                    leftSeeds -= 10;
                    feedingArray.push(tempArray);
                }
                else {
                    console.log("so genug gefüttert");
                }
            }
        }
        else {
            if (leftSnowballs > 0) {
                let tempSnowball = new Abschlussarbeit.Snowball(new Abschlussarbeit.Vector(mouseXrelative, mouseYrelative));
                snowballArray.push(tempSnowball);
                for (let j = birdArray.length; j > 0; j--) {
                    if (((birdArray[j - 1].getPosition().x < mouseXrelative + tolerance)
                        && (birdArray[j - 1].getPosition().x > mouseXrelative - tolerance))
                        && ((birdArray[j - 1].getPosition().y < mouseYrelative + tolerance)
                            && (birdArray[j - 1].getPosition().y > mouseYrelative - tolerance))) {
                        birdArray[j - 1].inform();
                    }
                }
                decLeftSnowballs();
            }
            else {
                console.log("du hast keine Munition mehr");
            }
        }
    }
    function switchMode(_event) {
        if (_event.code == "Space" && _event.target == document.body) {
            _event.preventDefault();
        }
        if (_event.code == "Space" || _event.code == "KeyS") {
            feeding = !feeding;
        }
    }
    function decLeftSnowballs() {
        if (leftSnowballs > 0) {
            leftSnowballs--;
        }
    }
    function askName() {
        let person = prompt("Hier bitte Name reinkloppen:", "Mustafa Mustermann");
        if (person == null || person == "" || person == " ") {
            askName();
        }
        else {
            userName = person;
        }
        sendHighscore();
    }
    function sendHighscore() {
        return __awaiter(this, void 0, void 0, function* () {
            if (userName != null) {
                let query = "Player=" + userName + "&Score=" + score;
                console.log(url + "?" + query);
                let response = yield fetch(url + "?" + query);
                let responseText = yield response.text();
                console.log(responseText);
            }
        });
    }
    function getHighscoreList() {
    }
})(Abschlussarbeit || (Abschlussarbeit = {}));
//# sourceMappingURL=main.js.map