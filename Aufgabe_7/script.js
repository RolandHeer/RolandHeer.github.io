let ButtonZaehler = 0;
let ZaehlerMax = 10;
let DieZahl = 0;
let stepsClassName = 0;
console.log("Noch is es nicht ganz soweit");
console.log("");
window.onload = function () {
    console.log("So, jetzt ist s geladen! - Viel Spass");
    LadeFunktion();
    UnsinnigeRechnungen();
    document.getElementById("DIV_I").addEventListener("click", Clicker);
    document.getElementById("DIV_III").addEventListener("click", ChangeClassName);
    document.getElementById("ParaMaker").addEventListener("click", addElements);
};
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
    let derErsteString = "Die Rechnung ";
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
//# sourceMappingURL=script.js.map