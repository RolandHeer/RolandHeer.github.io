let ButtonZaehler: number = 0;
let ZaehlerMax: number = 10;
let DieZahl: number = 0;
let stepsClassName: number = 0;

console.log("Noch is es nicht ganz soweit");

    console.log("")
    console.log("////////////////HIER KOMMEN UNSINNIGE RECHNUNGEN//////////////////")
    console.log("")
    console.log(derErsteString + derZweiteString);
    console.log(derErsteString + dieZweiteNummer);
    console.log(dieErsteNummer + derZweiteString);
    console.log(dieErsteNummer + dieZweiteNummer);
    console.log("")
    console.log("///////////////ENDE DER UNSINNIGE RECHNUNGEN//////////////////")
    console.log("")
}

function ZaehlerBis() {
    let zaehler: number = 0;
    while (zaehler <= ZaehlerMax) {
        console.log("" + zaehler);
        zaehler++;
    }
}

function Clicker() {
    Zaehler();
    let changedText: string = "" + DieZahl;
    document.getElementById("zahl").innerHTML = changedText;
}

function Zaehler() {
    DieZahl++;
}

function ChangeClassName() {
    let standardText_I: string = "die Klasse hat sich geaendert in ";
    let standardText_II: string = "wenn du s nicht glaubst guck im html Code nach";

    switch (stepsClassName) {   //Der switch ist sehr praktisch wenn man nicht alles mit ifs machen will  ¯\_(ツ)_/¯
        case 0: stepsClassName++;
            document.getElementById("Klassenwandler").className = "dieErsteVerwandlung";
            console.log(standardText_I + document.getElementById("Klassenwandler").className + standardText_II);
            break;
        case 1: stepsClassName++;
            document.getElementById("Klassenwandler").className = "dieZweiteVerwandlung";
            console.log(standardText_I + document.getElementById("Klassenwandler").className + standardText_II); break;
        case 2: stepsClassName++;
            document.getElementById("Klassenwandler").className = "dieDritteVerwandlung";
            console.log(standardText_I + document.getElementById("Klassenwandler").className + standardText_II); break;
        case 3: stepsClassName++;
            document.getElementById("Klassenwandler").className = "dieVierteVerwandlung";
            console.log(standardText_I + document.getElementById("Klassenwandler").className + standardText_II); break;
        case 4: stepsClassName = 0;
            document.getElementById("Klassenwandler").className = "dieLetzteVerwandlung";
            console.log(standardText_I + document.getElementById("Klassenwandler").className + standardText_II); break;

        default: console.log("hier ist wohl etwas schief gegangen (・・;)")
    }
}
