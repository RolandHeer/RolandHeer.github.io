namespace Chronolog {
    window.addEventListener("load", setup);
    let timeArray: Event[] = [];
    let errorCode: number = -4711;

    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;

    let canvas2: HTMLCanvasElement;
    let crcOverlay: CanvasRenderingContext2D;

    let isRunning: boolean = false;

    let currentYear: number = -3100;
    let distMultiplier: number = 120;
    let smoothYear: number = currentYear * distMultiplier;
    let smoothnes: number = 30;
    let velocity: number = 1;
    let fps: number = 100;
    let overlap: number = 80;
    let constCountdownTime: number = 1 * fps;
    let countdownFade: number = constCountdownTime;
    let countdownSpeed: number = 1;
    let eventEasementTimer: number = 0;
    let LockInTime: number = 2 * fps;
    let effectTimer: number = 0;

    ////  COLORS  \\\\
    let lightColor: string = "#a2def2";
    let darkerColor: string = "#578a9c";


    //// GRAPHICS \\\\
    let fail = new Image();
    fail.src = "../img/fail.png";

    let lowerSwoosh = new Image();
    lowerSwoosh.src = "../img/lowerSwoosh.png";
    let progressLS: number = 0;
    let smoothProLS: number = 0;
    let speedLS: number = 0.5;

    let middleSwoosh = new Image();
    middleSwoosh.src = "../img/middleSwoosh.png";
    let progressMS: number = 0;
    let smoothProMS: number = 0;
    let speedMS: number = 3;

    let upperSwoosh = new Image();
    upperSwoosh.src = "../img/upperSwoosh.png";
    let progressUS: number = 0;
    let smoothProUS: number = 0;
    let speedUS: number = 8;

    let smoothnesSwooshes: number = 30;
    let mainSwooshSpeed: number = 100;

    let init = new Image();
    init.src = "../img/init.png";

    let austroImg = new Image();
    austroImg.src = "../img/austrasia.png";

    let egyptImg = new Image();
    egyptImg.src = "../img/egypt.png";

    let maritimeImg = new Image();
    maritimeImg.src = "../img/maritimeSilkRoute.png";

    let SneferuImg = new Image();
    SneferuImg.src = "../img/fail.png";

    let khufuImg = new Image();
    khufuImg.src = "../img/khufu.png";

    let minoanImg = new Image();
    minoanImg.src = "../img/minoan.png";

    let uluburunImg = new Image();
    uluburunImg.src = "../img/uluburun.png";

    let canalImg = new Image();
    canalImg.src = "../img/canal.png";

    let triereImg = new Image();
    triereImg.src = "../img/triere.png";

    let salamisImg = new Image();
    salamisImg.src = "../img/salamis.png";

    ////  SOUNDS  \\\\
    let failSound: HTMLAudioElement = new Audio("../sound/fail.wav");
    failSound.volume = 0;
    let ocean: HTMLAudioElement = new Audio("../sound/ocean.wav");
    ocean.loop = true;
    let austroSound: HTMLAudioElement = new Audio("../sound/0_austro.wav");
    austroSound.loop = true;
    austroSound.volume = 0;
    let egyptSound: HTMLAudioElement = new Audio("../sound/1_egypt.mp3");
    egyptSound.loop = true;
    egyptSound.volume = 0;
    let khufuSound: HTMLAudioElement = new Audio("../sound/3_khufu.mp3");
    khufuSound.loop = true;
    khufuSound.volume = 0;
    let maritimeSound: HTMLAudioElement = new Audio("../sound/2_maritime.wav");
    maritimeSound.loop = true;
    maritimeSound.volume = 0;
    let uluburunSound: HTMLAudioElement = new Audio("../sound/uluburun.mp3");
    uluburunSound.loop = true;
    uluburunSound.volume = 0;
    let canalSound: HTMLAudioElement = new Audio("../sound/canal.mp3");
    canalSound.loop = true;
    canalSound.volume = 0;
    let triereSound: HTMLAudioElement = new Audio("../sound/triere.wav");
    triereSound.loop = true;
    triereSound.volume = 0;
    let salamiSound: HTMLAudioElement = new Audio("../sound/salami.wav");
    salamiSound.loop = true;
    salamiSound.volume = 0;
    let minoanSound: HTMLAudioElement = new Audio("../sound/minoan.wav");
    minoanSound.loop = true;
    minoanSound.volume = 0;



    //// DESCRIPT \\\\
    let austroString: string = "Die wohl ersten meertauglichen Segelschiffe wurden von den Austronesiern (heutiges Taiwan) gebaut. Zu den Schiffen gehörten Katamarane, Auslegekanus und Krebsscherensegler. <br> Mit diesen Schiffen konnten sie weite Strecken auch auf dem offenen Meer zurück legen, was zu der Austronesischen Expansion (ca. 3000 - 1500 v.Chr.) führen sollte.";
    let egyptString: string = "3000 vor Christus lernten die alten Ägypter Holzplanken in einen Schiffsrumpf zu fertigen. Sie verwendeten dazu gewobene Riemen um die Einzelplanken zusammen zu binden. Da sich Holz im Wasser aufsaugt und ausdehnt wurde das Schiff trotz dieser unüblichen Art und Weise dicht.";
    let khufuString: string = "Um 2500 vor Christus ließ sich der damalige Pharao „Khufu“ mit seinem Schiff am Fuße der Großen Pyramide von Giza begragen. Das Schiff wurde erst knappe 4500 Jahre später wieder entdeck. <br>Es gilt als das älteste, größte und besterhaltenste Schiff aus der Antike. Es misst 43,6 Meter in der Länge und 5,9 in der Breite.";
    let maritimeString: string = "In etwa 1500 vor Christus bildete sich aus dem Gewürzhandel der Austronesier die ersten Handelsrouten. Diese weitreichenden Handelsbeziehungen sorgten für einen großen Sprung in der Schiffbaustechnologie. <br>Die Chinesische „Dschunke“ entstand unter anderem durch diese Entwicklung.";
    let uluburunString: string = "Dieses Schiff gilt als das älteste entdeckte Schiffswrack der Welt. Es sank vor rund 3000 Jahren vor der türkischen Küste, am Kapp von Ulubrun. <br> Das Handelsschiff war unterwegs auf einer 1.700 Meile langen Handelsrute. Der Grund für sein Untergang ist bis heute nicht geklärt. <br> Eine originalgetreue Replika ist derzeit in Marmaris zu bewundern.";
    let minoanString: string = "Gegen Ende des vierten Jahrhunderts vor Christus blühte die Zivilisation auf Kreta auf. Überall auf der Insel entwickelten sich Zentren des Handels und des Handwerks. <br> Die Minoaner handelten mit ihrer Wahre weit über die Grenzen der Insel hinaus und gelten als die ersten „professionellen“ Händler auf See.";
    let canalString: string = "Rund 600 vor Christus beginnnen unter Pharao Necho II die Arbeiten an einem Kanal der das östliche Nildelta mit dem Roten Meer verbinden soll. Zu welcher Zeit der Kanal fertig gestellt wurde ist nicht überliefert. Der Kanal wurde 767 nach Christus aus strategischen Gründen geschlossen. <br> 770 nach Christus ließ Al-Mansur den Kanal, als Maßnahme gegen seine Feinde in Medina, schließen.";
    let triereString: string = "Die erste Aufzeichnung einer Triere stammen aus mitte des sechsten Jahrhunderts v.Chr. <br>Diese Schiffe waren meist um die 37m lang und zeichneten sich zusätzlich zum Segel durch die drei namensgebenden Ruderdecks aus.";
    let salamiString: string = "Die Schlacht um Salamis war, auch wenn der Name anderes vermuten lässt, keine Streiterei am Abendtisch. Tatsächlich handelt es sich hierbei um die wohl bedeutenste Seeschlacht im Mittelmeerraum. Obwohl die Persen mit (nach eigenen Aufzeichnungen) 1107 Trieren den 271 griechischen Trieren zahlenmäßig weit überlegen war, entscheideten die Griechen die Schlacht für sich und beendeten somit das persische Expansionsstreben.";

    let blendTxt: number = 0;
    let blendspeed: number = 0.01;

    function setup(): void {
        defineValues();
        createEvents();
        renderInitScreen();
        window.addEventListener("keydown", keyHandler);
    }

    function update(): void {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas2.width = window.innerWidth;
        canvas2.height = window.innerHeight;
        updateSmoothYear();
        updateSmoothSwooshes();
        eventEasement();
        renderScreen();
    }

    function updateSmoothYear(): void {
        if (smoothYear < currentYear * distMultiplier) {
            smoothYear += ((currentYear * distMultiplier) - smoothYear) / smoothnes;
        } else if (smoothYear > currentYear * distMultiplier) {
            smoothYear -= (smoothYear - (currentYear * distMultiplier)) / smoothnes;
        }
        crc2.resetTransform();
        crc2.translate(-smoothYear, 0);
    }

    function defineValues(): void {
        canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        canvas2 = document.querySelectorAll("canvas")[1];
        crcOverlay = canvas2.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas2.width = window.innerWidth;
        canvas2.height = window.innerHeight;
    }

    function createEvents(): void {
        timeArray.push(new Event(-3100, "Austronesische Schiffe", austroString, austroImg, austroSound, crc2, distMultiplier));
        timeArray.push(new Event(-3000, "Ägyptische Frachtschiffe", egyptString, egyptImg, egyptSound, crc2, distMultiplier));
        timeArray.push(new Event(-2500, "Pharao Khufus Schiff", khufuString, khufuImg, khufuSound, crc2, distMultiplier));
        timeArray.push(new Event(-2000, "Die ersten Händler", minoanString, minoanImg, minoanSound, crc2, distMultiplier));
        timeArray.push(new Event(-1500, "The Maritime Silk Route", maritimeString, maritimeImg, maritimeSound, crc2, distMultiplier));
        timeArray.push(new Event(-1300, "Das Ulubrun Wrack", uluburunString, uluburunImg, uluburunSound, crc2, distMultiplier));
        timeArray.push(new Event(-600, "Canal of the Pharaos", canalString, canalImg, canalSound, crc2, distMultiplier));
        timeArray.push(new Event(-542, "Schlachtschiffe", triereString, triereImg, triereSound, crc2, distMultiplier));
        timeArray.push(new Event(-480, "Battle of Salamis", salamiString, salamisImg, salamiSound, crc2, distMultiplier));
    }

    function renderInitScreen(): void {
        crcOverlay.drawImage(init, 0, 0, canvas2.width, (canvas2.width / 16) * 9);
    }

    function eventEasement() {
        let tempYear: number = errorCode;
        eventEasementTimer++;
        if (eventEasementTimer == LockInTime) {
            for (let i: number = 0; i < timeArray.length; i++) {
                if (timeArray[i].getYear() > currentYear - 7 && timeArray[i].getYear() < currentYear + 3) {
                //if (timeArray[i].getYear() == currentYear - 1 || timeArray[i].getYear() == currentYear + 1) {
                    tempYear = timeArray[i].getYear();
                }
            }
        }
        if (tempYear != errorCode) {
            currentYear = tempYear;
        }
    }

    function renderScreen(): void {
        renderBackground();
        renderEvents();
        renderOverlays();
        renderSwooshes();
        renderTimeline();
        manageAudio();
    }

    function renderBackground(): void {
        crc2.fillStyle = "#000000";
        crc2.fillRect(smoothYear, 0, canvas.width, canvas.height);
        crc2.save();
        crc2.resetTransform();
        crc2.rotate(180 * Math.PI / 180);
        crc2.translate(-canvas.width, -canvas.height);
        crc2.drawImage(lowerSwoosh, smoothProLS * mainSwooshSpeed, 0, canvas.width * 3, canvas.height);
        crc2.drawImage(lowerSwoosh, (smoothProLS * mainSwooshSpeed) - canvas.width * 3, 0, canvas.width * 3, canvas.height);
        crc2.drawImage(lowerSwoosh, (smoothProLS * mainSwooshSpeed) - (canvas.width * 3 * 2), 0, canvas.width * 3, canvas.height);
        crc2.drawImage(lowerSwoosh, (smoothProLS * mainSwooshSpeed) + canvas.width * 3, 0, canvas.width * 3, canvas.height);
        crc2.drawImage(lowerSwoosh, (smoothProLS * mainSwooshSpeed) + (canvas.width * 3 * 2), 0, canvas.width * 3, canvas.height);

        crc2.restore();
    }

    function renderEvents(): void {
        crc2.globalCompositeOperation = "screen";
        for (let i: number = 0; i < timeArray.length; i++) {
            if (timeArray[i].getYear() - overlap < currentYear && timeArray[i].getYear() + overlap > currentYear) {
                timeArray[i].renderEvent();
            }
        }

        crc2.globalCompositeOperation = "source-over";
    }

    function renderOverlays(): void {
        if (currentYear < 0) {
            document.getElementById("year").innerHTML = (currentYear * (-1)) + " v. Chr.";
        } else {
            document.getElementById("year").innerHTML = "" + currentYear;
        }

        let tempDisplay: boolean = false;
        for (let i: number = 0; i < timeArray.length; i++) {
            if (timeArray[i].getYear() == Math.round(smoothYear / distMultiplier)) {

                if (countdownFade == constCountdownTime) {
                    countdownFade -= countdownSpeed;
                } else if (countdownFade < constCountdownTime && countdownFade > 0) {
                    countdownFade -= countdownSpeed;
                }
                if (countdownFade == 0) {
                    document.getElementById("headline").innerHTML = timeArray[i].getTitle();
                    document.getElementById("description").innerHTML = timeArray[i].getDescript();
                    if (!tempDisplay) {
                        tempDisplay = true;
                        if (blendTxt < 1) {
                            blendTxt += blendspeed;
                        }
                    }
                }
            }
        }
        if (!tempDisplay && countdownFade == 0) {
            countdownFade = constCountdownTime;
        }
        if (!tempDisplay && blendTxt > 0) {
            if (blendTxt > 0) {
                blendTxt -= blendspeed * 5;
            }
            document.getElementById("fading").style.opacity = blendTxt + "";
        } else if (blendTxt > 0) {
            document.getElementById("fading").style.opacity = blendTxt + "";
        }
    }

    function renderSwooshes(): void {
        crcOverlay.clearRect(0, 0, canvas2.width, canvas2.height);
        crc2.save();
        crc2.resetTransform();
        crc2.rotate(180 * Math.PI / 180);
        crc2.translate(-canvas.width, -canvas.height);
        crcOverlay.clearRect(0, 0, canvas2.width, canvas2.height);

        crc2.drawImage(middleSwoosh, smoothProMS * mainSwooshSpeed, 0, canvas.width * 3, canvas.height);
        crc2.drawImage(middleSwoosh, (smoothProMS * mainSwooshSpeed) - canvas.width * 3, 0, canvas.width * 3, canvas.height);
        crc2.drawImage(middleSwoosh, (smoothProMS * mainSwooshSpeed) - (canvas.width * 3 * 2), 0, canvas.width * 3, canvas.height);
        crc2.drawImage(middleSwoosh, (smoothProMS * mainSwooshSpeed) + canvas.width * 3, 0, canvas.width * 3, canvas.height);
        crc2.drawImage(middleSwoosh, (smoothProMS * mainSwooshSpeed) + (canvas.width * 3 * 2), 0, canvas.width * 3, canvas.height);

        crc2.drawImage(upperSwoosh, smoothProUS * mainSwooshSpeed, 0, canvas.width * 3, canvas.height);
        crc2.drawImage(upperSwoosh, (smoothProUS * mainSwooshSpeed) - canvas.width * 3, 0, canvas.width * 3, canvas.height);
        crc2.drawImage(upperSwoosh, (smoothProUS * mainSwooshSpeed) - (canvas.width * 3 * 2), 0, canvas.width * 3, canvas.height);
        crc2.drawImage(upperSwoosh, (smoothProUS * mainSwooshSpeed) + canvas.width * 3, 0, canvas.width * 3, canvas.height);
        crc2.drawImage(upperSwoosh, (smoothProUS * mainSwooshSpeed) + (canvas.width * 3 * 2), 0, canvas.width * 3, canvas.height);
        crc2.restore();
    }

    function renderTimeline(): void {
        crcOverlay.save();
        let tempOffset: number = (currentYear - timeArray[0].getYear()) / (timeArray[timeArray.length - 1].getYear() - timeArray[0].getYear());
        let grad: CanvasGradient = crcOverlay.createLinearGradient(5, 0, canvas2.width - 10, 0);
        if (tempOffset == 0) {
            grad.addColorStop(0, lightColor);
            grad.addColorStop(1, darkerColor);
        } else if (tempOffset == 1) {
            grad.addColorStop(0, darkerColor);
            grad.addColorStop(tempOffset, lightColor);
        } else {
            grad.addColorStop(0, darkerColor);
            grad.addColorStop(tempOffset, lightColor);
            grad.addColorStop(1, darkerColor);
        }
        crcOverlay.fillStyle = grad;
        crcOverlay.strokeStyle = grad;
        crcOverlay.lineWidth = 1;
        for (let i: number = 0; i < timeArray.length; i++) {
            crcOverlay.beginPath();
            crcOverlay.moveTo(5 + ((timeArray[i].getYear() - timeArray[0].getYear()) / (timeArray[timeArray.length - 1].getYear() - timeArray[0].getYear()) * (canvas2.width - 10)), canvas2.height - 5.5);
            crcOverlay.lineTo(5 + ((timeArray[i].getYear() - timeArray[0].getYear()) / (timeArray[timeArray.length - 1].getYear() - timeArray[0].getYear()) * (canvas2.width - 10)), canvas2.height - 3);
            crcOverlay.stroke();
            crcOverlay.closePath();
        }
        crcOverlay.strokeStyle = "none";
        crcOverlay.fillRect(5, canvas2.height - 5.25, canvas2.width - 10, 1.5);
        crcOverlay.beginPath();
        crcOverlay.ellipse(5 + (tempOffset * (canvas2.width - 10)), canvas2.height - 4.5, 1.5, 1.5, 0, 0, 2 * Math.PI);
        crcOverlay.fill();
        crcOverlay.closePath();
        crcOverlay.beginPath();
        crcOverlay.moveTo(5 + (tempOffset * (canvas2.width - 10)), canvas2.height - 6);
        crcOverlay.lineTo(5 + (tempOffset * (canvas2.width - 10)), canvas2.height - 3);
        crcOverlay.lineTo((tempOffset * (canvas2.width - 10)) - (((currentYear * distMultiplier) - smoothYear) / 50), canvas2.height - 4.5);
        crcOverlay.fill();
        crcOverlay.shadowBlur = 7;
        crcOverlay.shadowColor = "#FFFFFF";
        crcOverlay.shadowBlur = 3;
        crcOverlay.shadowColor = "#FFFFFF";
        crcOverlay.restore();


        for (let i: number = 0; i < timeArray.length; i++) {
            if (timeArray[i].getYear() * 10 == Math.round((smoothYear / distMultiplier) * 10)) {
                effectTimer++;
                let tempEffect: number = (effectTimer - 10);
                if (tempEffect < 0) {
                    tempEffect = 0;
                }
                if (tempEffect < 45) {
                    crcOverlay.strokeStyle = lightColor;
                    crcOverlay.lineWidth = tempEffect * 5;
                    crcOverlay.globalAlpha = (45 - tempEffect) / 200;
                    crcOverlay.beginPath();
                    crcOverlay.arc(5 + (tempOffset * (canvas2.width - 10)), canvas2.height - 4.5, tempEffect * 40, 0, 2 * Math.PI);
                    crcOverlay.stroke();
                    crcOverlay.closePath();
                    crcOverlay.lineWidth = tempEffect * 2;
                    crcOverlay.beginPath();
                    crcOverlay.arc(5 + (tempOffset * (canvas2.width - 10)), canvas2.height - 4.5, tempEffect * 40, 0, 2 * Math.PI);
                    crcOverlay.stroke();
                    crcOverlay.closePath();
                }
            }
        }
        crcOverlay.globalAlpha = 1;
    }

    function manageAudio() {
        let testUp: number = getNearestUp();
        let testDown: number = getNearestDown();
        let tempUp: Event = new Event(4711, "404 - Page not Found", "Hier scheint ein massiver Fehler vorgefallen zu sein, der nächste freie Mitarbeiter steht Ihnen in Bälde zur Verfügung", fail, failSound, crc2, distMultiplier);
        tempUp = timeArray[getNearestUp()];
        let tempDown: Event = new Event(4711, "404 - Page not Found", "Hier scheint ein massiver Fehler vorgefallen zu sein, der nächste freie Mitarbeiter steht Ihnen in Bälde zur Verfügung", fail, failSound, crc2, distMultiplier);
        tempDown = timeArray[getNearestDown()];
        let tempVol: number = 0;
        let tempVolUp: number = 0;
        let tempVolDown: number = 0;

        if (eventIsNow() == errorCode) {
            let tempDist: number = Math.abs(tempUp.getYear() - tempDown.getYear());
            if (testUp != errorCode) {
                if (((3 * (1 - (Math.abs(tempUp.getYear() - currentYear) / tempDist))) - 2) < 0) {
                    tempUp.getSound().volume = 0;
                    tempVolUp = 0;
                } else {
                    tempUp.getSound().volume = ((3 * (1 - (Math.abs(tempUp.getYear() - currentYear) / tempDist))) - 2);
                    tempVolUp = ((3 * (1 - (Math.abs(tempUp.getYear() - currentYear) / tempDist))) - 2);
                }
            }
            if (testDown != errorCode) {
                if (((3 * (1 - (Math.abs(tempDown.getYear() - currentYear) / tempDist))) - 2) < 0) {
                    tempDown.getSound().volume = 0;
                    tempVolDown = 0;
                } else {
                    tempDown.getSound().volume = ((3 * (1 - (Math.abs(tempDown.getYear() - currentYear) / tempDist))) - 2);
                    tempVolDown = ((3 * (1 - (Math.abs(tempDown.getYear() - currentYear) / tempDist))) - 2);
                }
            }
        } else {
            timeArray[eventIsNow()].getSound().volume = 1;
            tempVol = 1;
        }
        if ((1 - tempVol - tempVolUp - tempVolDown) * 3 > 1) {
            ocean.volume = 1;
        } else {
            ocean.volume = (1 - tempVol - tempVolUp - tempVolDown) * 3;
        }
    }

    function startAudio(): void {
        failSound.play();
        ocean.play();
        austroSound.play();
        egyptSound.play();
        khufuSound.play();
        maritimeSound.play();
        uluburunSound.play();
        minoanSound.play();
        canalSound.play();
        triereSound.play();
        salamiSound.play();
    }

    function eventIsNow(): number {
        for (let i: number = 0; i < timeArray.length; i++) {
            if (timeArray[i].getYear() == currentYear) {
                return i;
            }
        }
        return errorCode;
    }

    function getNearestUp(): number {
        for (let i: number = 0; i < timeArray.length; i++) {
            if (timeArray[i].getYear() > currentYear) {
                return i;
            }
        }
        return errorCode;
    }

    function getNearestDown(): number {
        for (let i: number = timeArray.length - 1; i >= 0; i--) {
            if (timeArray[i].getYear() < currentYear) {
                return i;
            }
        }
        return errorCode;
    }

    function updateSwooshProgress(_forward: boolean): void {
        if (_forward) {
            progressLS += speedLS;
            progressMS += speedMS;
            progressUS += speedUS;
        } else {
            progressLS -= speedLS;
            progressMS -= speedMS;
            progressUS -= speedUS;
        }
        if (smoothProLS > 5760 / mainSwooshSpeed) {
            progressLS = Math.round(smoothProLS - (5760 / mainSwooshSpeed));
            smoothProLS = smoothProLS - (5760 / mainSwooshSpeed);
        }
        if (smoothProMS > 5760 / mainSwooshSpeed) {
            progressMS = Math.round(smoothProMS - (5760 / mainSwooshSpeed));
            smoothProMS = smoothProMS - (5760 / mainSwooshSpeed);
        }
        if (smoothProUS > 5760 / mainSwooshSpeed) {
            progressUS = Math.round(smoothProUS - (5760 / mainSwooshSpeed));
            smoothProUS = smoothProUS - (5760 / mainSwooshSpeed);
        }

        if (smoothProLS < -5760 / mainSwooshSpeed) {
            progressLS = Math.round((5760 / mainSwooshSpeed) - smoothProLS);
            smoothProLS = (5760 / mainSwooshSpeed) - smoothProLS;
        }
        if (smoothProMS < -5760 / mainSwooshSpeed) {
            progressMS = Math.round((5760 / mainSwooshSpeed) - smoothProMS);
            smoothProMS = (5760 / mainSwooshSpeed) - smoothProMS;
        }
        if (smoothProUS < -5760 / mainSwooshSpeed) {
            progressUS = Math.round((5760 / mainSwooshSpeed) - smoothProUS);
            smoothProUS = (5760 / mainSwooshSpeed) - smoothProUS;
        }
    }

    function updateSmoothSwooshes(): void {
        if (smoothProLS < progressLS) {
            smoothProLS += (progressLS - smoothProLS) / smoothnesSwooshes;
            smoothProMS += (progressMS - smoothProMS) / smoothnesSwooshes;
            smoothProUS += (progressUS - smoothProUS) / smoothnesSwooshes;
        } else if (smoothProLS > progressLS) {
            smoothProLS -= (smoothProLS - progressLS) / smoothnesSwooshes;
            smoothProMS -= (smoothProMS - progressMS) / smoothnesSwooshes;
            smoothProUS -= (smoothProUS - progressUS) / smoothnesSwooshes;
        }
    }

    function keyHandler(_key: any): void {
        switch (_key.code) {
            case "Space": {
                if (!isRunning) {
                    window.setInterval(update, (1000 / fps));
                    crc2.save();
                    crc2.translate(currentYear * -distMultiplier, 0);
                    window.addEventListener("wheel", wheelHandler);
                    crcOverlay.clearRect(0, 0, canvas2.width, canvas2.height);
                    startAudio();
                }
            }
            default: {
                console.log("unbekannte Tastatureingabe");
            }
        }
    }

    function wheelHandler(_event: any): void {
        if (_event.deltaX > 0) {
            if (currentYear < timeArray[timeArray.length - 1].getYear()) {
                currentYear += velocity
                updateSwooshProgress(true);
                eventEasementTimer = 0;
                effectTimer = 0;
            }
        } else if (_event.deltaX < 0) {
            if (currentYear > timeArray[0].getYear()) {
                currentYear -= velocity;
                updateSwooshProgress(false);
                eventEasementTimer = 0;
                effectTimer = 0;
            }
        } else if (_event.deltaY > 0) {
            if (currentYear > timeArray[0].getYear()) {
                currentYear -= velocity;
                updateSwooshProgress(false);
                eventEasementTimer = 0;
                effectTimer = 0;
            }
        } else if (_event.deltaY < 0) {
            if (currentYear < timeArray[timeArray.length - 1].getYear()) {
                currentYear += velocity
                updateSwooshProgress(true);
                eventEasementTimer = 0;
                effectTimer = 0;
            }
        } else {
            console.log("unbekannte Mauseingabe")
        }
    }
}