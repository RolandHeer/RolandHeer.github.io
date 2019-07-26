interface Card {
    color: string;
    value: number;
    special: boolean;
    path: string;
}

//////// HTML IDs UND CO \\\\\\\
let sectionIDs: string[] = ["Gegner", "Spieler", "Nachziehstapel", "Ablagestapel"];

let gameState: number = 0;
//////// GAME STATES \\\\\\\\
//  0  =  Vorbereitung
//  1  =  Spieler
//  2  =  Computer
//  3  =  Gewonnen


let cardValues: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9/*, 10, 11, 12*/]
///////// CARD VALUES \\\\\\\\\
//  0  =  Z
//  1  =  A
//  2  =  H
//  3  =  L
//  4  =  E
//  5  =  N
//  6  =  W
//  7  =  E
//  8  =  R
//  9  =  T
// 10  =  Aussetzen
// 11  =  2x Ziehen
// 12  =  Kartentausch

let cardColours: string[] = ["red", "yellow", "green", "blue"];

///////HandkartenAnzahl\\\\\\
let count: number = 6;

////Ablagestapel und Nachziehstapel\\\\
let cardDeck: Card[] = [];
let discardPile: Card[] = [];

////Handkarten Gegner und Spieler\\\\
let hand: Card[] = [];
let handPc: Card[] = [];


window.onload = function () {
    console.log("done loading");
    main();
}

function main() {
    ////Spielvorbereitung\\\\
    createCardDeck();
    shuffle(cardDeck);
    dealCards(count);

    updateHtml();

    incGameState(1);
    ////Spiel\\\\
    /*
    while (gameState != 3) {

        ///hier darf der Spieler
        if (gameState == 1) {

        }

        ///hier darf der Computer
        if (gameState == 2) {

        }
    }
    */
}

function createCardDeck() {
    for (let i: number = 0; i < cardColours.length; i++) {
        for (let j: number = 0; j < cardValues.length; j++) {
            let tempSpecial: boolean;
            if (cardValues[j] > 9) {
                tempSpecial = true;
            } else {
                tempSpecial = false;
            }

            let tempPath: string = "imgs/" + cardValues[j] + cardColours[i] + ".png";

            let tempCard: Card = {
                color: cardColours[i],
                value: cardValues[j],
                special: tempSpecial,
                path: tempPath,
            };

            cardDeck.push(tempCard);
        }
    }
}

function shuffle(Cards: Card[]): Card[] {
    Cards.sort(function (a, b) { return 0.5 - Math.random() });
    return Cards;
}

function dealCards(count: number) {
    for (let i: number = 0; i < count * 2; i++) {
        handPc.push(cardDeck[0]);
        cardDeck.splice(0, 1);
        i++;
        hand.push(cardDeck[0]);
        cardDeck.splice(0, 1);
    }
}

function incGameState(c: number) {
    if (gameState + c >= 0 || gameState + c <= 3) {
        gameState += c;
    } else {
        console.log("hier stimmt was dolle nicht der gameState kann nicht " + gameState + c + " sein");
    }

}

function updateHtml() {
    clearSections();
    generateHandCardsHtml();
}

function clearSections() {
    for (let i: number = 0; i < sectionIDs.length; i++) {
        let tempSection: HTMLElement = document.getElementById(sectionIDs[i]);
        while (tempSection.firstChild) {
            tempSection.removeChild(tempSection.firstChild);
        }
    }
}

function generateHandCardsHtml() {
    for (let i: number = 0; i < handPc.length; i++) {
        generateCardHtml(handPc[i], (100 / (handPc.length + 1)) * (i + 1), "Gegner");
    }
    for (let i: number = 0; i < hand.length; i++) {
        generateCardHtml(hand[i], (100 / (hand.length + 1)) * (i + 1), "Spieler");
    }
}

function generateCardHtml(card: Card, position: number, type: string) {
    if (type == "Gegner" || type == "Spieler") {
        let cardContainer: HTMLElement = document.createElement("div");
        cardContainer.setAttribute("id", card.value + card.color);
        cardContainer.style.position = "absolute";
        switch (card.color) {
            case "red":
                cardContainer.style.backgroundColor = "#f54747"
                break;
            case "yellow":
                cardContainer.style.backgroundColor = "#f5d847"
                break;
            case "green":
                cardContainer.style.backgroundColor = "#3e8f1e"
                break;
            case "blue":
                cardContainer.style.backgroundColor = "#1e468f"
                break;
            default:
                console.log("hier stimmt nu was nich es gibt nur die vier Farben");

        }
        if (type == "Gegner") {
            cardContainer.style.width = "9em";
        } else {
            cardContainer.style.width = "12em";
        }
        cardContainer.style.height = "100%";
        cardContainer.style.left = position + "%";
        cardContainer.style.borderStyle = "solid";
        if (type == "Gegner") {
            cardContainer.style.borderWidth = "5px";
        } else {
            cardContainer.style.borderWidth = "7px";
        }
        cardContainer.style.borderColor = "#fff";
        cardContainer.style.borderRadius = "1em";
        document.getElementById(type).appendChild(cardContainer);

        let cardValue1: HTMLElement = document.createElement("p");
        cardValue1.innerHTML = "" + card.value;
        cardValue1.style.position = "absolute";
        cardValue1.style.top = "-1em";
        cardValue1.style.left = "0.2em";
        cardContainer.appendChild(cardValue1);

        let cardValue2: HTMLElement = document.createElement("p");
        cardValue2.innerHTML = "" + card.value;
        cardValue2.style.position = "absolute";
        cardValue2.style.bottom = "-1em";
        cardValue2.style.right = "0.2em";
        cardValue2.style.transform = "rotate(180deg)";
        cardContainer.appendChild(cardValue2);

        let cardValue3: HTMLElement = document.createElement("p");
        cardValue3.innerHTML = "" + card.value;
        cardValue3.style.position = "absolute";
        if (type == "Gegner") {
            cardValue3.style.fontSize = "12em";
        } else {
            cardValue3.style.fontSize = "16em";
        }
        cardValue3.style.top = "-0.95em";
        if (type == "Gegner") {
            cardValue3.style.left = "0.12em";
        } else {
            cardValue3.style.left = "0.13em";
        }
        cardContainer.appendChild(cardValue3);
    }

}

function printArray(Cards: Card[]) {
    for (let i: number = 0; i < Cards.length; i++) {
        console.log("Karte: " + Cards[i].value + Cards[i].color);
    }
}

