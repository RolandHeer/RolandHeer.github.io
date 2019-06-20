// ------- Variablen -------- //
let saveImageSrc;
let monsterHolder = "monsterHoldingCell"; // ID für das Haupt-Element, in welchem die Monster sich befinden werden. Wird vielleicht mehrfach in dem Skript gebraucht, deshalb einmalig definitiert.
let playerName = "Spielername"; // Ein paar globale Variablen, welche den Spieler darstellen.
let playerXP = 0; // Stellt die gesammelte Erfahrung des Spielers dar.                                                                     ////////////////////////////////wichtig, die playerXp darf nicht null sein... sonst kann man nicht den neuen wert aufaddieren
let playerLvl = 1;
let playerXPperLevel = 624; // Da es nur einen Spieler gibt, ergibt sich noch nicht viel Sinn darin, für den Spieler ein interface (im Sinne der Programmierung) zu erstellen.
let playerItems = "Kurzschwert";
let schonGewonnen = false;
// Mehrere Arrays, welche jeweils Bauteile für Namen oder Eigenschaften der Monster beinhalten.
let prefix = ["Wald-", "Seuchen-", "Uralte(s) ", "Gift-", "Brennende(s) ", "Kniescheibenzertrümmernde(s) ", "furchtlose(s)", "blutrünstige(s)", "Schlangen-", "hopsende(s)", "Eisverkaufende(s)"]; // length = 6, da 6 Einträge. Von 0-5.
let monsterName = ["Ratte", "Ed von Schleck", "Ungeziefer", "Kommulitonin", "Beuteltier", "Eichhörnchen", "Spinne", "Kaninchen"]; // length = 3, da 3 Einträge. Von 0-2.
let suffix = [" des Verderbens", " aus der Hölle", " der Lethalität", " mit Rheuma", " der Redundanz", " der Zerberstung", " der Apokalypse", " des Todes", " aus Baden", " des Rolandus", " aus der Truhe"]; // length = 6, da hier 6 Einträge sind. Von 0-5.
let monsterModifers = ["Ist nervig", "Linkshänder", "Bier-Connoisseur", "Verfehlt häufig", "Prokrastiniert", "Müde", "Verwirrt", "Wasserscheu", "Bipolar", "Hat Schnupfen", "Verläuft sich oft"]; // Eine Reihe von zufälligen "Verstärkern" für das Monster.
let Items = ["Stock", "Käse", "Pfanne", "Baked Beanz", "Schnitzel", "Zigarettenstummel", "Pantoffel", "Türklinke", "Aschenbecher"]; //Was das jeweilige Monster für ein Utensil bei sich trägt
let Bildquellen = ["Ratte.png", "Ed.jpg", "Ungeziefer.png", "Kommulitonin.jpg", "Beuteltier.gif", "Eichhörnchen.png", "Spinne.png", "Kaninchen.png"];
let PushArray = [];
let monsterArray = [];
// ----------- Funktionen ----------- //
window.onload = function () {
    document.getElementById("monsterSpawner").addEventListener("click", generateMonster, false);
    document.getElementById("fightAll").addEventListener("click", fightAllMonsters);
    document.getElementById("fightAllWeakest").addEventListener("click", fightAllWeakMonsters);
    document.getElementById("fightWeakest").addEventListener("click", fightWeakestMonster);
    updatePlayerLevel("nichts");
    document.getElementById("fightSame").addEventListener("click", fightSame);
    document.getElementById("Arraypusher").addEventListener("click", pusher);
};
function generateMonster() {
    let tempRandom = getRNGNumber(3) + 1;
    if (tempRandom == 1) {
        console.log("");
        console.log("Sieh mal! es ist ein neues Monster gespawnt!");
    }
    else {
        console.log("Sieh mal! es sind " + tempRandom + " neue Monster gespawnt!");
    }
    for (let i = 0; i < tempRandom; i++) {
        let newMonsterName = generateMonsterName(); // Eigens-gebaute Funktion, welche einen string zurück gibt.
        let newMonsterHP = generateMonsterHitPoints(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
        let newMonsterXP = generateMonsterXP(); // Eigens-gebaute Funktion, welche eine Zahl zurück gibt.
        let newMonsterLvl = generateMonsterLvl(newMonsterXP);
        let newMonsterModifier = generateMonsterModifer(); // Eigens-gebaute Funktion, welche ein string-Array zurück gibt.
        let newMonsterItem = generateMonsterItem();
        let newImageSource = saveImageSrc;
        let newMonster = {
            monsterName: newMonsterName,
            monsterHealthPoints: newMonsterHP,
            monsterExperience: newMonsterXP,
            monsterLvl: newMonsterLvl,
            monsterModifier: newMonsterModifier,
            Item: newMonsterItem,
            Bildpfad: newImageSource,
        };
        monsterArray.push(newMonster); // Monster wird erst in diesem Schritt zu dem Array hinzugefügt 
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
    let monsterHoldingDiv = document.getElementById(monsterHolder);
    while (monsterHoldingDiv.firstChild) {
        monsterHoldingDiv.removeChild(monsterHoldingDiv.firstChild);
    }
}
function monsterGenerateHTMLAll() {
    for (let i = 1; i <= monsterArray.length; i++) {
        monsterGenerateHTML(i);
    }
}
// Generiert HTML-Elemente, welche dann einem Element untergeordnet werden. Erzeugt ebenfalls einen Event-Listener auf dem Button.
function monsterGenerateHTML(count) {
    let holdingDiv = document.createElement("div"); // Erstelle ein neues HTML-Element vom typ <div>. Es ist jedoch noch nicht zu sehen!
    holdingDiv.setAttribute("id", "monster" + count); // Die ID jedes neu-erstellten Monsters entspricht der aktuellen Array-Länge.
    holdingDiv.setAttribute("class", "monster"); // Klasse für Visuals.
    document.getElementById(monsterHolder).appendChild(holdingDiv); // Das HTML-Element muss erst noch zu einem Objekt hinzugefügt werden, in diesem Fall mit der id "monsterHoldingCell"
    let monsterName = document.createElement("p"); // Generiere einen <p>
    monsterName.innerHTML = monsterArray[count - 1].monsterName; // Inhalt des <p>: Monster-Name des letzten Monsters im Array.
    holdingDiv.appendChild(monsterName); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterMod = document.createElement("p"); // Generiere einen <p>
    monsterMod.innerHTML = monsterArray[count - 1].monsterModifier[0] + " & " + monsterArray[count - 1].monsterModifier[1]; // Inhalt des <p>: Monster-Modifizierer null und eins
    holdingDiv.appendChild(monsterMod); // Füge das <p> zum HTML-Dokument hinzu, indem es dem holding-Div angefügt wird.
    let monsterHealth = document.createElement("p");
    monsterHealth.innerHTML = "Health: " + monsterArray[count - 1].monsterHealthPoints;
    holdingDiv.appendChild(monsterHealth);
    let monsterXP = document.createElement("p");
    monsterXP.innerHTML = "XP: " + monsterArray[count - 1].monsterExperience;
    holdingDiv.appendChild(monsterXP);
    let monsterLevel = document.createElement("p");
    monsterLevel.innerHTML = "Lvl: " + monsterArray[count - 1].monsterLvl;
    holdingDiv.appendChild(monsterLevel);
    let imgDiv = document.createElement("div"); //Neues Div, um Bilder uniformer zu gestalten.
    imgDiv.setAttribute("class", "imgHolder");
    holdingDiv.appendChild(imgDiv);
    let monsterImg = document.createElement("img"); // Erstelle ein <img>-Element
    monsterImg.setAttribute("src", monsterArray[count - 1].Bildpfad); // Der Pfad für das Bild muss über setAttribute festgelegt werden. Der Bildpfad kann natürlich auch anders aussehen.
    monsterImg.setAttribute("alt", "Schreckliches Monster"); // Das alt für das Bild wird hier festgelegt.
    imgDiv.appendChild(monsterImg); // Füge das Bild zu dem holding-div hinzu (<div>, welche ein paar Zeilen zuvor erstellt worden ist)
    let monsterItem = document.createElement("p");
    monsterItem.innerHTML = "vorsicht! es/sie hat ein " + monsterArray[count - 1].Item;
    holdingDiv.appendChild(monsterItem);
    let monsterBtn = document.createElement("BUTTON"); // Erstelle ein <button>-Element
    monsterBtn.innerHTML = "Monster bekämpfen!"; // Verändere den Inhalt des HTML-Elementes. Der genaue Text ist dabei euch überlassen.
    holdingDiv.appendChild(monsterBtn); // Füge den Button zu dem holding-div hinzu.
    let monsterCount = count; // Die aktuelle Anzahl vorhandener Monster, zudem auch die neue Zahl für das Monster-Array.
    monsterBtn.addEventListener(// Füge dem Monster eine Funktion hinzu.
    'click', function () {
        fightMonster(monsterCount); // Wenn das Monster erstellt wird erhält die Funktion einen Parameter, welcher der aktuellen Anzahl entspricht.
    }, false); // Ignoriert das false.
}
function getRNGNumber(_maxNumber) {
    return Math.floor(Math.random() * _maxNumber);
}
function generateMonsterName() {
    let generatedMonsterName = ""; // Erstelle einen leeren String für das Monster
    // Monster-Vorname
    // Mathematik! Hier wird eine zufällig-generierte Zahl benötigt.
    let rngNumber = getRNGNumber(prefix.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Anfang) zu generieren.
    generatedMonsterName = prefix[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    // Monster-Mittelname
    rngNumber = getRNGNumber(monsterName.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Mitte) zu generieren.
    generatedMonsterName += monsterName[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.                //////////fehler war, dass ein best. Wert als Auswahl für monstername genommen wurde
    generateNewImageSource(rngNumber);
    // Monster-Titel
    rngNumber = getRNGNumber(suffix.length); // Der Rückgabewert der Funktion wird hier verwendet um den entsprechenden Teil des Namens (hier: Ende) zu generieren.
    generatedMonsterName += suffix[rngNumber]; // Füge den Monsternamen zusammen: nimm aus dem entsprechenden Array mit der zufallsgenerierten Zahl den entsprechenden Eintrag.
    return generatedMonsterName;
}
// Wird für die Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterHitPoints() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 10) + 1 zurück.
    let tempMonsterHP = 1 + getRNGNumber(10);
    return tempMonsterHP;
}
// Wird für die Erstellung der Monster-Lebenspunkte aufgerufen.
// Liefert eine variierende Zahl zurück.
function generateMonsterXP() {
    // Diese Funktion gibt eine zufällige ganze Zahl (zwischen 0 und 350) + 100 zurück.
    let tempMonsterXP = 250 + getRNGNumber(700);
    return tempMonsterXP;
}
function generateMonsterLvl(newMonsterXP) {
    return Math.floor(((newMonsterXP - 250) / (750 / 11)));
}
// Wird für die Erstellung der Monster-Modifizierer aufgerufen.
// Liefert ein Array mit zwei Einträgen zurück.
function generateMonsterModifer() {
    let tempMonsterMod = []; // Initialisiere ein leeres Array (verhindert Folge-Fehler)
    tempMonsterMod[0] = monsterModifers[getRNGNumber(monsterModifers.length)]; // Setze Schublade 0 des Arrays auf einen Wert.
    tempMonsterMod[1] = monsterModifers[getRNGNumber(monsterModifers.length)]; // Setze Schublade 1 des Arrays auf einen Wert.
    return tempMonsterMod; // Gebe das hier zusammengesetzte Array wieder zurück.
}
function generateMonsterItem() {
    let tempMonsterItem;
    tempMonsterItem = Items[getRNGNumber(Items.length)];
    return tempMonsterItem;
}
function generateNewImageSource(MonsterName) {
    if (Bildquellen.length >= monsterName.length) {
        saveImageSrc = "imgs/" + Bildquellen[MonsterName];
    }
    else {
        saveImageSrc = "imgs/error.png";
    }
}
//////   KAMPFKLASSEN   \\\\\\
function fightAllMonsters() {
    for (let i = monsterArray.length; i > 0; i--) {
        fightMonster(i);
    }
}
function fightAllWeakMonsters() {
    for (let i = monsterArray.length; i > 0; i--) {
        if (playerLvl > monsterArray[i - 1].monsterLvl) {
            fightMonster(i);
        }
    }
}
function fightWeakestMonster() {
    let tempWeakest = monsterArray.length;
    for (let i = monsterArray.length; i > 0; i--) {
        if (monsterArray[tempWeakest - 1].monsterLvl > monsterArray[i - 1].monsterLvl)
            tempWeakest = i;
    }
    fightMonster(tempWeakest);
}
function fightSame() {
    for (let i = monsterArray.length; i > 0; i--) {
        if (playerLvl == monsterArray[i - 1].monsterLvl) {
            fightMonster(i);
        }
    }
}
function fightMonster(_index) {
    if (monsterArray.length > 0) {
        if (playerLvl > monsterArray[_index - 1].monsterLvl) {
            console.log("Du bekommst des Monsters ITEM! -> " + monsterArray[_index - 1].Item);
            updatePlayerXP(monsterArray[_index - 1].monsterExperience);
            updatePlayerItems(monsterArray[_index - 1].Item);
            updatePlayerLevel(monsterArray[_index - 1].Item);
            monsterArray.splice(_index - 1, 1);
            updateHTML();
        }
        else if (playerLvl == monsterArray[_index - 1].monsterLvl) {
            console.log("huch da hat ja jemand das gleiche Level");
            if (Math.random() > 0.4) {
                console.log("puh da hast du ja nochmal Glück gehabt und gewonnen");
                console.log("Du bekommst des Monsters ITEM! -> " + monsterArray[_index - 1].Item);
                updatePlayerXP(monsterArray[_index - 1].monsterExperience);
                updatePlayerItems(monsterArray[_index - 1].Item);
                updatePlayerLevel(monsterArray[_index - 1].Item);
                monsterArray.splice(_index - 1, 1);
                updateHTML();
            }
            else {
                console.log("du hast zwar verloren, aber ihr habt euch geeinigt, dass du deine Items behalten darfst");
                updatePlayerXP((monsterArray[_index - 1].monsterExperience) * (-1));
                updatePlayerLevel("nichts");
            }
        }
        else {
            console.log("du hast leider verloren   ┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻ ");
            updatePlayerXP((monsterArray[_index - 1].monsterExperience) * (-1));
            updatePlayerLevel("nichts");
        }
    }
}
// Aufgerufen, um das HTML-Element, welches das Spieler-Level darstellt, zu erneuern.
function updatePlayerLevel(neuesItem) {
    playerLvl = (Math.floor(playerXP / playerXPperLevel)) + 1;
    if (playerLvl >= 20 && schonGewonnen == false) {
        alert("Du hasch gwonna' !");
        schonGewonnen = true;
    }
    document.getElementById("xpCounter").innerHTML = "Player-Level: " + playerLvl + " (XP: " + playerXP + " / " + playerXPperLevel * (playerLvl) + ")     Items: " + playerItems; // Baue den String für die Spieler-Info zusammen          //////////////////////////zeigt jetzt nicht mehr an, wieviel XP benötigt werden für einen Level aufstieg, sondern, bei wieviel XP der Level erreicht wird\\\\\\\\\\\\\\\\
    console.log("Spieler " + playerName + " hat nun Level " + playerLvl + "außerdem hat er ein(e) " + neuesItem + " bekommen!"); // Spieler-Level in der Konsole.
}
function updatePlayerXP(tempXP) {
    if (playerXP + tempXP > 0) {
        playerXP += tempXP;
    }
    else {
        playerXP = 0;
    }
}
//fügt demn Spieler neue Items hinzu
function updatePlayerItems(neuesItem) {
    playerItems += ", " + neuesItem;
}
function getMonsterCount() {
    return monsterArray.length;
}
// funktion die dinge in n Array pusht
function pusher() {
    PushArray.push(Math.random());
    console.log(PushArray);
}
//# sourceMappingURL=62-TS-Example.js.map