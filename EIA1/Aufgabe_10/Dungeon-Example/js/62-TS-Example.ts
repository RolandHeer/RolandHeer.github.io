namespace Aufgabe10 {
    interface Monster {
        monsterName: string; // Name des Monsters
        monsterInitHealthPoints: number; // Lebenspunkte
        monsterHealthPoints: number; // Lebenspunkte
        monsterInitExperience: number; // Erfahrungspunkte bei besiegen des Monsters
        monsterExperience: number; // Erfahrungspunkte bei besiegen des Monsters
        monsterLvl: number;
        monsterModifier: string[]; // Monster-Verstärker. Diese sind in diesem Fall nur Text! (Da hier einfacher Zufall für die Auswahl genutzt wird, kann der gleiche Eintrag auch doppelt vorkommen)
        Bildpfad: string;
        Item: string;
    }


    // ------- Variablen -------- //
    let saveImageSrc: string;

    let monsterHolder: string = "monsterHoldingCell";                                  // ID für das Haupt-Element, in welchem die Monster sich befinden werden. Wird vielleicht mehrfach in dem Skript gebraucht, deshalb einmalig definitiert.

    let playerName: string = "Spielername";                                            // Ein paar globale Variablen, welche den Spieler darstellen.
    let playerXP: number = 0;                                                              // Stellt die gesammelte Erfahrung des Spielers dar.                                                                     ////////////////////////////////wichtig, die playerXp darf nicht null sein... sonst kann man nicht den neuen wert aufaddieren
    let playerLvl: number = 1;
    let playerXPperLevel: number = 367;                                                // Da es nur einen Spieler gibt, ergibt sich noch nicht viel Sinn darin, für den Spieler ein interface (im Sinne der Programmierung) zu erstellen.
    let playerItems: string[] = ["Kurzschwert"];
    let schonGewonnen: boolean = false;

    // Alle möglichen Variablen für die Monster
    let prefix: string[] = ["Wald-", "Seuchen-", "Uralte(s) ", "Gift-", "Brennende(s) ", "Kniescheibenzertrümmernde(s) ", "furchtlose(s)", "blutrünstige(s)", "Schlangen-", "hopsende(s)", "Eisverkaufende(s)"]; // length = 6, da 6 Einträge. Von 0-5.
    let monsterName: string[] = ["Ratte", "Ed von Schleck", "Ungeziefer", "Kommulitonin", "Beuteltier", "Eichhörnchen", "Spinne", "Kaninchen"]; // length = 3, da 3 Einträge. Von 0-2.
    let suffix: string[] = [" des Verderbens", " aus der Hölle", " der Lethalität", " mit Rheuma", " der Redundanz", " der Zerberstung", " der Apokalypse", " des Todes", " aus Baden", " des Rolandus", " aus der Truhe"]; // length = 6, da hier 6 Einträge sind. Von 0-5.

    let monsterModifers: string[] = ["Ist nervig", "Linkshänder", "Bier-Connoisseur", "Verfehlt häufig", "Prokrastiniert", "Müde", "Verwirrt", "Wasserscheu", "Bipolar", "Hat Schnupfen", "Verläuft sich oft"]; // Eine Reihe von zufälligen "Verstärkern" für das Monster.

    let Items: string[] = ["Stock", "Käse", "Pfanne", "Baked Beanz", "Schnitzel", "Zigarettenstummel", "Pantoffel", "Türklinke", "Aschenbecher"];                       //Was das jeweilige Monster für ein Utensil bei sich trägt

    let Bildquellen: string[] = ["Ratte.png", "Ed.jpg", "Ungeziefer.png", "Kommulitonin.jpg", "Beuteltier.gif", "Eichhörnchen.png", "Spinne.png", "Kaninchen.png"]

    let PushArray: number[] = [];

    let monsterArray: Monster[] = [];

    let monsterLvlBase: number = 50;
    let monsterLvlDifferenz: number = 456;
    let maxMonsterlvl: number = 10;

    let monsterHpBase: number = 2;
    let mosnterHpDifferenz: number = 3;

    // ----------- Funktionen ----------- //

    window.onload = function () {
        document.getElementById("monsterSpawner").addEventListener("click", generateMonster, false);
        document.getElementById("fightAll").addEventListener("click", fightAllMonsters);
        document.getElementById("fightAllWeakest").addEventListener("click", fightAllWeakMonsters);
        document.getElementById("fightWeakest").addEventListener("click", fightWeakestMonster);
        updatePlayerLevel();
        document.getElementById("fightSame").addEventListener("click", fightSame);
        document.getElementById("Arraypusher").addEventListener("click", pusher)
    }

    function generateMonster() {

        let tempRandom: number = getRNGNumber(3) + 1;

        if (tempRandom == 1) {
            console.log("")
            console.log("Sieh mal! es ist ein neues Monster gespawnt!");
        } else {
            console.log("Sieh mal! es sind " + tempRandom + " neue Monster gespawnt!");
        }

        for (let i: number = 0; i < tempRandom; i++) {
            let newMonsterName: string = generateMonsterName();                // Eigens-gebaute Funktion, welche einen string zurück gibt.
            let newMonsterXP: number = generateMonsterXP();                    // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
            let newMonsterLvl: number = generateMonsterLvl(newMonsterXP);
            let newMonsterHP: number = generateMonsterHitPoints(newMonsterLvl);             // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
            let newMonsterModifier: string[] = generateMonsterModifer();       // Eigens-gebaute Funktion, welche ein string-Array zurück gibt.
            let newMonsterItem: string = generateMonsterItem();
            let newImageSource: string = saveImageSrc;

            let newMonster: Monster = {                                        // Monster wird erstellt.
                monsterName: newMonsterName,
                monsterInitHealthPoints: newMonsterHP,
                monsterHealthPoints: newMonsterHP,
                monsterInitExperience: newMonsterXP,
                monsterExperience: newMonsterXP,
                monsterLvl: newMonsterLvl,
                monsterModifier: newMonsterModifier,
                Item: newMonsterItem,
                Bildpfad: newImageSource,
            };

            monsterArray.push(newMonster);                                      // Monster wird erst in diesem Schritt zu dem Array hinzugefügt 

        }
        updateHTML();
    }

    function updateHTML() {
        clearMonsterCell();
        monsterGenerateHTMLAll();

        console.log("Die Aktuelle Monsteranzahl ist: " + getMonsterCount());
    }

    function clearMonsterCell() {
        console.log("");
        let monsterHoldingDiv: HTMLElement = document.getElementById(monsterHolder);
        while (monsterHoldingDiv.firstChild) {
            monsterHoldingDiv.removeChild(monsterHoldingDiv.firstChild);

        }
    }

    function monsterGenerateHTMLAll() {
        for (let i: number = 1; i <= monsterArray.length; i++) {
            monsterGenerateHTML(i);
        }
    }

    // Generiert HTML-Elemente, welche dann einem Element untergeordnet werden. Erzeugt ebenfalls einen Event-Listener auf dem Button.
    function monsterGenerateHTML(count: number) {
        let holdingDiv: HTMLElement = document.createElement("div");       // Erstelle ein neues HTML-Element vom typ <div>. Es ist jedoch noch nicht zu sehen!
        holdingDiv.setAttribute("id", "monster" + count);     // Die ID jedes neu-erstellten Monsters entspricht der aktuellen Array-Länge.
        holdingDiv.setAttribute("class", "monster");                        // Klasse für Visuals.
        document.getElementById(monsterHolder).appendChild(holdingDiv);     // Das HTML-Element muss erst noch zu einem Objekt hinzugefügt werden, in diesem Fall mit der id "monsterHoldingCell"

        let monsterName: HTMLElement = document.createElement("p");        // Generiere einen <p>
        monsterName.innerHTML = monsterArray[count - 1].monsterName;                     // Inhalt des <p>: Monster-Name des letzten Monsters im Array.
        holdingDiv.appendChild(monsterName);                                // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.

        let monsterMod: HTMLElement = document.createElement("p");        // Generiere einen <p>
        monsterMod.innerHTML = monsterArray[count - 1].monsterModifier[0] + " & " + monsterArray[count - 1].monsterModifier[1]; // Inhalt des <p>: Monster-Modifizierer null und eins
        holdingDiv.appendChild(monsterMod);                                // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.

        let monsterXP: HTMLElement = document.createElement("p");
        monsterXP.innerHTML = "XP: " + monsterArray[count - 1].monsterExperience;
        holdingDiv.appendChild(monsterXP);

        let monsterLevel: HTMLElement = document.createElement("p");
        monsterLevel.innerHTML = "Lvl: " + monsterArray[count - 1].monsterLvl;
        holdingDiv.appendChild(monsterLevel);

        let HpContainer: HTMLElement = document.createElement("div");
        HpContainer.setAttribute("id", "HpContainer" + count);
        HpContainer.setAttribute("class", "HpContainer");
        HpContainer.style.width = "100%";
        holdingDiv.appendChild(HpContainer);

        let health: HTMLElement = document.createElement("p");
        health.innerHTML = "Health: " + monsterArray[count - 1].monsterHealthPoints + " / " + monsterArray[count - 1].monsterInitHealthPoints;
        HpContainer.appendChild(health);

        let LifeBarContainer: HTMLElement = document.createElement("div");
        LifeBarContainer.style.backgroundColor = "#777";
        LifeBarContainer.style.height = "1em";
        LifeBarContainer.style.width = "90%";
        LifeBarContainer.style.position = "relative";
        LifeBarContainer.style.left = "5%";
        HpContainer.appendChild(LifeBarContainer);

        let LifeBar: HTMLElement = document.createElement("div");
        let tempHealth: number = (monsterArray[count - 1].monsterHealthPoints / monsterArray[count - 1].monsterInitHealthPoints) * 100;
        if (tempHealth < 60) {
            LifeBar.style.backgroundColor = "#ff961e";
            console.log("orange");
        }
        else {
            LifeBar.style.backgroundColor = "#63ed81";
            console.log("grün");

        }
        if (tempHealth < 30) {
            LifeBar.style.backgroundColor = "#a51239";
            console.log("rot");

        }
        let tempHealthString: string = tempHealth + "%";

        LifeBar.style.position = "absolute";
        LifeBar.style.width = tempHealthString;
        LifeBar.style.height = "1em";
        LifeBarContainer.appendChild(LifeBar);

        let imgDiv: HTMLElement = document.createElement("div");            //Neues Div, um Bilder uniformer zu gestalten.
        imgDiv.setAttribute("class", "imgHolder");
        holdingDiv.appendChild(imgDiv);

        let monsterImg: HTMLElement = document.createElement("img");       // Erstelle ein <img>-Element
        monsterImg.setAttribute("src", monsterArray[count - 1].Bildpfad);                 // Der Pfad für das Bild muss über setAttribute festgelegt werden. Der Bildpfad kann natürlich auch anders aussehen.
        monsterImg.setAttribute("alt", "Schreckliches Monster");            // Das alt für das Bild wird hier festgelegt.
        imgDiv.appendChild(monsterImg);                                 // Füge das Bild zu dem holding-div hinzu (<div>, welche ein paar Zeilen zuvor erstellt worden ist)

        let monsterItem: HTMLElement = document.createElement("p");
        monsterItem.innerHTML = "vorsicht! es/sie hat ein " + monsterArray[count - 1].Item;
        holdingDiv.appendChild(monsterItem);

        let monsterBtn: HTMLElement = document.createElement("BUTTON");    // Erstelle ein <button>-Element
        monsterBtn.innerHTML = "Monster bekämpfen!";                        // Verändere den Inhalt des HTML-Elementes. Der genaue Text ist dabei euch überlassen.
        holdingDiv.appendChild(monsterBtn);                                 // Füge den Button zu dem holding-div hinzu.

        let monsterCount: number = count;                    // Die aktuelle Anzahl vorhandener Monster, zudem auch die neue Zahl für das Monster-Array.

        monsterBtn.addEventListener(                                        // Füge dem Monster eine Funktion hinzu.
            'click', function () {                                           // Wird bei Maus-Click ausgelöst.
                fightMonster(monsterCount);                                 // Wenn das Monster erstellt wird erhält die Funktion einen Parameter, welcher der aktuellen Anzahl entspricht.
            }, false);                                                      // Ignoriert das false.
    }

    function getRNGNumber(_maxNumber: number): number {
        return Math.floor(Math.random() * _maxNumber)
    }

    function generateMonsterName(): string {
        let generatedMonsterName: string = ""; // Erstelle einen leeren String für das Monster

        // Monster-Vorname
        // Mathematik! Hier wird eine zufällig-generierte Zahl benötigt.
        let rngNumber: number = getRNGNumber(prefix.length);               // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Anfang) zu generieren.
        generatedMonsterName = prefix[rngNumber];                           // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.

        // Monster-Mittelname
        rngNumber = getRNGNumber(monsterName.length);                       // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Mitte) zu generieren.
        generatedMonsterName += monsterName[rngNumber];                             // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.                //////////fehler war, dass ein best. Wert als Auswahl für monstername genommen wurde
        generateNewImageSource(rngNumber);

        // Monster-Titel
        rngNumber = getRNGNumber(suffix.length);                            // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Ende) zu generieren.
        generatedMonsterName += suffix[rngNumber];                          // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.

        return generatedMonsterName;
    }


    // Wird für die Monster-Lebenspunkte aufgerufen.
    // Liefert eine variierende Zahl zurück.
    function generateMonsterHitPoints(tempLvl: number): number {
        return Math.round(((tempLvl / 2) * (getRNGNumber(mosnterHpDifferenz) + 1)) + monsterHpBase);
    }


    // Wird für die Erstellung der Monster-Lebenspunkte aufgerufen.
    function generateMonsterXP(): number {
        let tempMonsterXP: number = monsterLvlBase + getRNGNumber(monsterLvlDifferenz);
        return tempMonsterXP;
    }

    function generateMonsterLvl(newMonsterXP: number): number {
        return Math.floor(((newMonsterXP - monsterLvlBase) / (monsterLvlDifferenz / (maxMonsterlvl + 1))));
    }


    // Wird für die Erstellung der Monster-Modifizierer aufgerufen.
    // Liefert ein Array mit zwei Einträgen zurück.
    function generateMonsterModifer(): string[] {
        let tempMonsterMod: string[] = [];                                         // Initialisiere ein leeres Array (verhindert Folge-Fehler)
        tempMonsterMod[0] = monsterModifers[getRNGNumber(monsterModifers.length)];  // Setze Schublade 0 des Arrays auf einen Wert.
        tempMonsterMod[1] = monsterModifers[getRNGNumber(monsterModifers.length)];  // Setze Schublade 1 des Arrays auf einen Wert.
        return tempMonsterMod;                                                      // Gebe das hier zusammengesetzte Array wieder zurück.
    }

    function generateMonsterItem(): string {
        let tempMonsterItem: string;
        tempMonsterItem = Items[getRNGNumber(Items.length)];

        return tempMonsterItem;
    }

    function generateNewImageSource(MonsterName: number) {
        if (Bildquellen.length >= monsterName.length) {
            saveImageSrc = "imgs/" + Bildquellen[MonsterName];
        } else {
            saveImageSrc = "imgs/error.png";
        }

    }

    //////   KAMPFKLASSEN   \\\\\\

    function fightAllMonsters() {
        for (let i: number = monsterArray.length; i > 0; i--) {
            fightMonster(i);
        }
    }

    function fightAllWeakMonsters() {
        for (let i: number = monsterArray.length; i > 0; i--) {
            if (playerLvl > monsterArray[i - 1].monsterLvl) {
                fightMonster(i);
            }
        }
    }

    function fightWeakestMonster() {
        let tempWeakest: number = monsterArray.length;
        for (let i: number = monsterArray.length; i > 0; i--) {
            if (monsterArray[tempWeakest - 1].monsterLvl > monsterArray[i - 1].monsterLvl)
                tempWeakest = i;
        }
        console.log("weakest has lvl " + monsterArray[tempWeakest - 1].monsterLvl);
        if (playerLvl > monsterArray[tempWeakest - 1].monsterLvl) {
            fightMonster(tempWeakest);
        }
    }

    function fightSame() {
        for (let i: number = monsterArray.length; i > 0; i--) {
            if (playerLvl == monsterArray[i - 1].monsterLvl) {
                fightMonster(i);
            }
        }
    }

    function fightMonster(_index: number) {
        if (monsterArray.length > 0) {
            if (playerLvl > monsterArray[_index - 1].monsterLvl) {
                updatePlayerXP(Math.floor(monsterArray[_index - 1].monsterInitExperience / monsterArray[_index - 1].monsterHealthPoints));
                monsterArray[_index - 1].monsterExperience = Math.floor(monsterArray[_index - 1].monsterInitExperience / monsterArray[_index - 1].monsterHealthPoints);

                monsterArray[_index - 1].monsterHealthPoints += -1;

                if (monsterArray[_index - 1].monsterHealthPoints <= 0) {
                    console.log("DES MONSTERS ITEM: " + monsterArray[_index - 1].Item)
                    updatePlayerItems(monsterArray[_index - 1].Item);
                    monsterArray.splice(_index - 1, 1);
                }
                updatePlayerLevel();
                updateHTML();
            } else if (playerLvl == monsterArray[_index - 1].monsterLvl) {
                console.log("huch da hat ja jemand das gleiche Level");
                if (Math.random() > 0.4) {
                    updatePlayerXP(Math.floor(monsterArray[_index - 1].monsterInitExperience / monsterArray[_index - 1].monsterHealthPoints));
                    monsterArray[_index - 1].monsterExperience = Math.floor(monsterArray[_index - 1].monsterInitExperience / monsterArray[_index - 1].monsterHealthPoints);

                    monsterArray[_index - 1].monsterHealthPoints += -1;

                    if (monsterArray[_index - 1].monsterHealthPoints <= 0) {
                        console.log("DES MONSTERS ITEM: " + monsterArray[_index - 1].Item)
                        updatePlayerItems(monsterArray[_index - 1].Item);
                        monsterArray.splice(_index - 1, 1);
                    }
                    updatePlayerLevel();
                    updateHTML();
                } else {
                    console.log("du hast zwar verloren, aber ihr habt euch geeinigt, dass du deine Items behalten darfst");
                    updatePlayerXP((monsterArray[_index - 1].monsterExperience) * (-1));
                    updatePlayerLevel();
                }
            } else {
                console.log("du hast leider verloren   ┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻ ");
                updatePlayerXP((monsterArray[_index - 1].monsterExperience) * (-1));
                updatePlayerLevel();
            }
        }
    }


    // Aufgerufen, um das HTML-Element, welches das Spieler-Level darstellt, zu erneuern.
    function updatePlayerLevel() {
        playerLvl = (Math.floor(playerXP / playerXPperLevel)) + 1;
        if (playerLvl >= 20 && schonGewonnen == false) {
            alert("Du hasch gwonna' !");
            schonGewonnen = true;
        }
        document.getElementById("xpCounter").innerHTML = "Player-Level: " + playerLvl + " (XP: " + playerXP + " / " + playerXPperLevel * (playerLvl) + ")";       // Baue den String für die Spieler-Info zusammen          //////////////////////////zeigt jetzt nicht mehr an, wieviel XP benötigt werden für einen Level aufstieg, sondern, bei wieviel XP der Level erreicht wird\\\\\\\\\\\\\\\\
        document.getElementById("items").innerHTML = "" + getItemsAsString();
        console.log("Spieler " + playerName + " hat nun Level " + playerLvl);        // Spieler-Level in der Konsole.
    }

    function updatePlayerXP(tempXP: number) {
        if (playerXP + tempXP > 0) {
            playerXP += tempXP;
        } else {
            playerXP = 0;
            let tempItems: string[] = ["Du hast leider alle Items verloren"];
            playerItems = tempItems;
        }
    }

    //fügt demn Spieler neue Items hinzu
    function updatePlayerItems(neuesItem: string) {
        if (playerItems.length == 1 && playerItems[0] != "Kurzschwert") {
            playerItems[0] = neuesItem;
        }
        console.log("ich pushe jetzt " + neuesItem);
        playerItems.push(neuesItem);
    }

    function getItemsAsString(): string {
        let tempItemstring: string = "";

        for (let i: number = 0; i < playerItems.length; i++) {
            tempItemstring += playerItems[i]
            if (i != playerItems.length - 1) {
                tempItemstring += ", "
            }
        }
        return tempItemstring;
    }

    function getMonsterCount(): number {
        return monsterArray.length;
    }

    // funktion die dinge in n Array pusht
    function pusher() {
        PushArray.push(Math.random());
        console.log(PushArray);
    }
}