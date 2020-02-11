namespace Abschlussarbeit {

    window.addEventListener("load", setup);
    window.setInterval(update, 20);

    //let  url: string = "https://birdhunting.herokuapp.com/"
    let url: string = "http://localhost:5002/";

    let change: boolean = true;
    let gameOver: boolean = false;
    let treeArray: Tree[] = [];
    let birdArray: Bird[] = [];
    let snowArray: Snow[] = [];
    let snowballArray: Snowball[] = [];
    let feedingArray: Seed[][] = [];
    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;
    let backgroundImage: ImageData;
    let feeding: boolean = true;

    let tolerance: number = 0.05;

    let maxSeeds: number = 3;
    let leftSeeds: number = 50;
    let leftSnowballs: number = 5;
    let score: number = 0;

    let preWidth: number;
    let preHeight: number;

    let userName: string = "";

    function setup(): void {
        defineValues();
        createThingos();
        renderScene();
        canvas.addEventListener("click", clickHandler);
        window.addEventListener("keydown", switchMode);
    }

    function update(): void {
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
        } else {
            renderScene();
        }
    }

    function defineValues(): void {
        canvas = document.querySelector("canvas");
        canvas.width = (window.innerWidth / 5) * 4;
        preWidth = (window.innerWidth / 5) * 4;
        canvas.height = (window.innerHeight / 5) * 4;
        preHeight = (window.innerHeight / 5) * 4;
        crc2 = canvas.getContext("2d");
        document.getElementById("side").style.width = window.innerWidth / 7 + "px";
        document.querySelector("footer").style.width = window.innerWidth + "px";
    }

    function createThingos(): void {
        createTrees();
        createBirds(10);
        createSnow(150);
    }

    function renderScene(): void {
        if (!gameOver) {
            if (change) {
                Render.background(crc2);
                Render.hills(crc2);
                Render.ground(crc2);
                Render.trees(crc2, treeArray);
                change = false;
            } else {
                crc2.putImageData(backgroundImage, 0, 0);
            }
            Render.seeds(crc2, feedingArray);
            Render.birdsHouse(crc2);
            Render.snowman(crc2);
            Render.birds(crc2, birdArray);
            Render.snow(crc2, snowArray);
            Render.snowball(crc2, snowballArray);
        } else {
            if (change) {
                Render.background(crc2);
                Render.hills(crc2);
                Render.ground(crc2);
                Render.trees(crc2, treeArray);
                Render.seeds(crc2, feedingArray);
                Render.birdsHouse(crc2);
                Render.snowman(crc2);
                Render.birds(crc2, birdArray);
                Render.snow(crc2, snowArray);
                crc2.fillStyle = "rgba(250,250,250,0.5)"
                crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
                backgroundImage = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);
                change = false;
            } else {
                crc2.putImageData(backgroundImage, 0, 0);
                if (userName == null || userName == "") {
                    askName();
                }
            }
        }
    }

    function createTrees(): void {
        for (let i: number = 5; i > 0; i--) {
            let x: number = ((50 / 5) * (i - 0.5)) / 100;
            let y: number = (48 + (Math.random() * 4)) / 100;
            treeArray.push(new Tree(new Vector(x, y)));
        }
        for (let i: number = 4; i > 0; i--) {
            let x: number = ((50 / 5) * (i - 1)) / 100;
            let y: number = (60 + (Math.random() * 4)) / 100;
            treeArray.push(new Tree(new Vector(x, y)));
        }
        for (let i: number = 4; i > 0; i--) {
            let x: number = 1 - (((40 / 5) * (i - 1)) / 100);
            let y: number = (55 + (Math.random() * 4)) / 100;
            treeArray.push(new Tree(new Vector(x, y)));
        }
        for (let i: number = 2; i > 0; i--) {
            let x: number = 1 - (((35 / 5) * (i - 0.5)) / 100);
            let y: number = (70 + (Math.random() * 4)) / 100;
            treeArray.push(new Tree(new Vector(x, y)));
        }
        let x: number = 1 - ((20 / 5) / 100);
        let y: number = (85 + (Math.random() * 4)) / 100;
        treeArray.push(new Tree(new Vector(x, y)));
    }

    function createBirds(_count: number): void {
        for (let i: number = _count; i > 0; i--) {
            birdArray.push(new Bird(new Vector(Math.random(), Math.random())));
        }
    }

    function createSnow(_count: number): void {
        for (let i: number = _count; i > 0; i--) {
            snowArray.push(new Snow(new Vector(Math.random(), Math.random())));
        }
    }

    function updateMoving(): void {
        for (let snow of snowArray) {
            snow.move(1 / 50);
        }

        for (let i: number = feedingArray.length; i > 0; i--) {
            if (feedingArray[i - 1][0].isMovable()) {
                if (feedingArray[i - 1][0].getPosition().y < 0.7 + ((Math.random() * 6) / 10)) {
                    for (let seed of feedingArray[i - 1]) {
                        seed.move(1 / 50);
                    }
                } else {
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
            for (let j: number = feedingArray[i - 1].length; j > 0; j--) {
                let tempCount: boolean = feedingArray[i - 1][j - 1].update();
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
        for (let i: number = feedingArray.length; i > 0; i--) {
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
        for (let i: number = snowballArray.length; i > 0; i--) {
            if (!snowballArray[i - 1].isHitting()) {
                snowballArray[i - 1].move(1 / 50);
            } else {
                let tempBirdCount: number = 0;
                for (let j: number = birdArray.length; j > 0; j--) {
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

    function updateHtml(): void {
        if (feeding) {
            document.getElementById("chosen").innerHTML = "Futter";
        } else {
            document.getElementById("chosen").innerHTML = "Schneeball";
        }
        document.getElementById("snowballs").innerHTML = "" + leftSnowballs;
        document.getElementById("seeds").innerHTML = "" + leftSeeds;
        document.getElementById("score").innerHTML = "" + score;
    }

    function clickHandler(_event: MouseEvent): void {
        let mouseXrelative: number = _event.clientX / (crc2.canvas.width - 1);
        let mouseYrelative: number = _event.clientY / (crc2.canvas.height - 1);

        if (feeding) {
            if (leftSeeds != 0) {
                if (feedingArray.length < maxSeeds) {
                    let tempArray: Seed[] = [];
                    for (let i: number = 10; i > 0; i--) {
                        if (i == 10) {
                            tempArray.push(new Seed(new Vector(mouseXrelative, mouseYrelative), true));
                        } else {
                            tempArray.push(new Seed(new Vector((mouseXrelative - 0.025) + (Math.random() / 20), (mouseYrelative - 0.025) + (Math.random() / 20)), false));
                        }
                    }
                    leftSeeds -= 10;
                    feedingArray.push(tempArray);
                } else {
                    console.log("so genug gefüttert");
                }
            }
        } else {
            if (leftSnowballs > 0) {
                let tempSnowball: Snowball = new Snowball(new Vector(mouseXrelative, mouseYrelative));
                snowballArray.push(tempSnowball);

                for (let j: number = birdArray.length; j > 0; j--) {
                    if (((birdArray[j - 1].getPosition().x < mouseXrelative + tolerance)
                        && (birdArray[j - 1].getPosition().x > mouseXrelative - tolerance))
                        && ((birdArray[j - 1].getPosition().y < mouseYrelative + tolerance)
                            && (birdArray[j - 1].getPosition().y > mouseYrelative - tolerance))) {

                        birdArray[j - 1].inform()
                    }

                }
                decLeftSnowballs();
            } else {
                console.log("du hast keine Munition mehr");
            }
        }
    }

    function switchMode(_event: KeyboardEvent): void {
        if (_event.code == "Space" && _event.target == document.body) {
            _event.preventDefault();
        }
        if (_event.code == "Space" || _event.code == "KeyS") {
            feeding = !feeding;
        }
    }

    function decLeftSnowballs(): void {
        if (leftSnowballs > 0) {
            leftSnowballs--;
        }
    }

    function askName(): void {
        let person: string = prompt("Hier bitte Name reinkloppen:", "Mustafa Mustermann");
        if (person == null || person == "" || person == " ") {
            askName();
        } else {
            userName = person;
        }
        sendHighscore();
    }
    async function sendHighscore(): Promise<void> {
        if (userName != null) {
            let query: string = "Player=" + userName + "&Score=" + score;
            console.log(url + "?" + query);
            let response: Response = await fetch(url + "?" + query);
            let responseText : string = await response.text();
            console.log(responseText);
        }
    }

    function getHighscoreList():void{

    }
}