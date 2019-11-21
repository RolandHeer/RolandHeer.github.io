let ButtonZaehler = 0;
let ZaehlerMax = 10;
let DieZahl = 0;
let stepsClassName = 0;
let validator = false;
console.log("Noch is es nicht ganz soweit");
console.log("");
window.onload = function () {
    console.log("So, jetzt ist s geladen! - Viel Spass");
    LadeFunktion();
    UnsinnigeRechnungen();
    document.getElementById("DIV_I").addEventListener("click", Clicker);
    document.getElementById("DIV_III").addEventListener("click", ChangeClassName);
    document.getElementById("ParaMaker").addEventListener("click", addElements);
    NeuerButton();
    console.log("" + Addierer(5, 6));
    console.log("");
};
function NeuerButton() {
    let newButton = document.createElement("button");
    let position = document.getElementById("body");
    position.appendChild(newButton);
    newButton.id = "neuerButtonTS";
    newButton.innerHTML = "DER NEUE BUTTON";
    newButton.addEventListener("click", changeName);
}
function LadeFunktion() {
    console.log("");
    console.log("////////////////DIE LADEFUNKTION WURDE INITIIERT//////////////////");
    console.log("");
    console.log("Vielen Dank dass Sie den Zaehler aktiviert haben");
    ZaehlerBis();
    console.log("Wie Sie gesehen haben zaehlt dieser auf " + ZaehlerMax + " - lol");
    console.log("");
    console.log("////////////////DAS WAR DIE LADEFUNKTION//////////////////");
    console.log("");
}
function UnsinnigeRechnungen() {
    let derErsteString = "Die Antwort ";
    let derZweiteString = "ist gut";
    let dieErsteNummer = 4711;
    let dieZweiteNummer = 42;
    console.log("");
    console.log("////////////////HIER KOMMEN UNSINNIGE RECHNUNGEN//////////////////");
    console.log("");
    console.log(derErsteString + derZweiteString);
    console.log(derErsteString + dieZweiteNummer);
    console.log(dieErsteNummer + derZweiteString);
    console.log(dieErsteNummer + dieZweiteNummer);
    console.log("");
    console.log("///////////////ENDE DER UNSINNIGE RECHNUNGEN//////////////////");
    console.log("");
}
function addElements() {
    addElement("DIV_II");
    addElement("DIV_IV");
}
function addElement(ID) {
    let newPara = document.createElement("p");
    let position = document.getElementById(ID);
    position.appendChild(newPara);
    newPara.innerHTML = "Das ist ja ein neuer Paragraf durch TS!!!";
}
function changeName() {
    if (validator == false) {
        document.getElementById("neuerButtonTS").innerHTML = "Neuerer Button";
        validator = true;
    }
    else {
        let Meldung = document.createElement("p");
        let position = document.getElementById("body");
        position.appendChild(Meldung);
        Meldung.className = "Meldung";
        Meldung.innerHTML = "!!Du hast schonmal eine Namensaenderung durchgefuehrt...!!";
    }
}
function ZaehlerBis() {
    let zaehler = 0;
    while (zaehler <= ZaehlerMax) {
        console.log("" + zaehler);
        zaehler++;
    }
}
function Clicker() {
    Zaehler();
    let changedText = "" + DieZahl;
    document.getElementById("zahl").innerHTML = changedText;
}
function Zaehler() {
    DieZahl++;
}
function ChangeClassName() {
    let standardText_I = "die Klasse hat sich geaendert in ";
    let standardText_II = "wenn du s nicht glaubst guck im html Code nach";
    switch (stepsClassName) { //Der switch ist sehr praktisch wenn man nicht alles mit ifs machen will  ¯\_(ツ)_/¯
        case 0:
            stepsClassName++;
            document.getElementById("Klassenwandler").className = "dieErsteVerwandlung";
            console.log(standardText_I + document.getElementById("Klassenwandler").className + standardText_II);
            break;
        case 1:
            stepsClassName++;
            document.getElementById("Klassenwandler").className = "dieZweiteVerwandlung";
            console.log(standardText_I + document.getElementById("Klassenwandler").className + standardText_II);
            break;
        case 2:
            stepsClassName++;
            document.getElementById("Klassenwandler").className = "dieDritteVerwandlung";
            console.log(standardText_I + document.getElementById("Klassenwandler").className + standardText_II);
            break;
        case 3:
            stepsClassName++;
            document.getElementById("Klassenwandler").className = "dieVierteVerwandlung";
            console.log(standardText_I + document.getElementById("Klassenwandler").className + standardText_II);
            break;
        case 4:
            stepsClassName = 0;
            document.getElementById("Klassenwandler").className = "dieLetzteVerwandlung";
            console.log(standardText_I + document.getElementById("Klassenwandler").className + standardText_II);
            break;
        default: console.log("hier ist wohl etwas schief gegangen (・・;)");
    }
}
function Addierer(value_I, value_II) {
    let addedValues = value_I + value_II;
    console.log("///////////Dieser Wert wurde von einer Separaten Funktion erstellt und wurde anschliessend returned////////");
    return addedValues;
}
//# sourceMappingURL=script.js.map