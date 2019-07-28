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

//  4  =  WarteKonstante nach normaler Karte
//  5  =  WarteKonstante nach special Karte


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
let count: number = 5;

////Ablagestapel und Nachziehstapel\\\\
let cardDeck: Card[] = [];
let discardPile: Card[] = [];

let lastThreeDiscard: Card[] = [];

////Handkarten Gegner und Spieler\\\\
let hand: Card[] = [];
let handPc: Card[] = [];


window.onload = function () {
    console.log("done loading");
    StartGame();
}

function StartGame() {
    ////Spielvorbereitung\\\\
    createCardDeck();
    shuffle(cardDeck);
    dealCards(count);
    initializeDiscard();

    checkLastDiscard();

    updateHtml();

    incGameState(1);
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

function shuffle(cards: Card[]): Card[] {
    cards.sort(function (a, b) { return 0.5 - Math.random() });
    return cards;
}

function dealCards(count: number) {
    for (let i: number = 0; i < count * 2; i++) {
        hand.push(cardDeck[0]);
        cardDeck.splice(0, 1);
        i++;
        handPc.push(cardDeck[0]);
        cardDeck.splice(0, 1);
    }
}

function initializeDiscard() {
    discardPile.push(cardDeck[cardDeck.length - 1]);
    cardDeck.splice(cardDeck.length - 1, 1);
}

function checkLastDiscard() {
    if (discardPile.length > 1) {
        if (discardPile.length > 2) {
            lastThreeDiscard[0] = discardPile[discardPile.length - 3];
        }
        lastThreeDiscard[1] = discardPile[discardPile.length - 2];
    }
    lastThreeDiscard[2] = discardPile[discardPile.length - 1];
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
    for (let i: number = 0; i < lastThreeDiscard.length; i++) {
        if (discardPile.length > 2) {

        } else if (discardPile.length > 1) {
            if (i == 0) {
                i++;
            }

        } else {
            if (i == 0) {
                i += 2;
            }
        }
        generateCardHtml(lastThreeDiscard[i], (100 / (lastThreeDiscard.length + 1)) * (i + 1), "Last");
    }



    generateCardHtml(cardDeck[cardDeck.length - 1], 232, "Talon");
}

function generateCardHtml(card: Card, position: number, type: string) {

    document.getElementById("uber").innerHTML = "" + cardDeck.length;

    if (type == "Gegner" || type == "Spieler" || type == "Last" || type == "Talon") {

        let cardContainer: HTMLElement = document.createElement("div");
        cardContainer.setAttribute("id", card.value + card.color);
        cardContainer.style.position = "absolute";
        if (type != "Spieler") {
            cardContainer.style.width = "9em";
        } else {
            cardContainer.style.width = "12em";
        }
        if (type == "Last" || type == "Talon") {
            cardContainer.style.height = "14.7em";
        } else {
            cardContainer.style.height = "100%";
        }
        if (type == "Last" || type == "Talon") {
            cardContainer.style.top = position / 4 + "%";
            cardContainer.style.left = "28%";
        } else {
            cardContainer.style.left = position + "%";
        }
        if (type != "Spieler") {
            cardContainer.style.borderWidth = "5px";
        } else {
            cardContainer.style.borderWidth = "7px";
        }
        document.getElementById(type).appendChild(cardContainer);


        if (type == "Gegner" || type == "Talon") {

            cardContainer.setAttribute("class", "beige");

            if (type == "Talon") {
                cardContainer.style.borderColor = "#fff";
                console.log("lols");
            } else {
                cardContainer.style.borderColor = "#ddd";
                console.log("hihi");
            }

            if (type == "Talon") {
                cardContainer.addEventListener(
                    'click', function () {
                        startRound(card, false);
                    }, false);
            }
        } else {
            switch (card.color) {
                case "red":
                    cardContainer.setAttribute("class", "red");
                    break;
                case "yellow":
                    cardContainer.setAttribute("class", "yellow");
                    break;
                case "green":
                    cardContainer.setAttribute("class", "green");
                    break;
                case "blue":
                    cardContainer.setAttribute("class", "blue");
                    break;
                default:
                    console.log("hier stimmt nu was nich es gibt nur die vier Farben");

            }

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
            if (type != "Spieler") {
                cardValue3.style.fontSize = "12em";
            } else {
                cardValue3.style.fontSize = "16em";
            }
            cardValue3.style.top = "-0.95em";
            if (type != "Spieler") {
                cardValue3.style.left = "0.12em";
            } else {
                cardValue3.style.left = "0.13em";
            }
            cardContainer.appendChild(cardValue3);

            if (type == "Spieler") {
                cardContainer.addEventListener(
                    'click', function () {
                        startRound(card, true);
                    }, false);
            }
        }
    }
}

function startRound(card: Card, play: boolean) {

    if (gameState == 3) {
        alert("das Spiel ist rum!");
        console.log("aber es ist doch rum");
        return;
    }

    /////    Spieler    \\\\\\
    while (gameState == 1) {
        if (play) {
            if (validateDraw(card)) {
                hand = playCard(card, hand);
                if (!card.special) {
                    gameState = 2;
                }
                if (hand.length < 1) {
                    gameState = 3;
                }
                updateHtml();
            } else {
                return;
            }
        } else {
            drawCard(true);
            gameState = 2;
            updateHtml();
        }
    }

    /////Computergegner\\\\\\
    while (gameState == 2) {
        if (getPlayable(handPc) >= 0) {
            handPc = playCard(handPc[getPlayable(handPc)], handPc)
            if (!lastThreeDiscard[2].special) {
                gameState = 4;
            } else {
                gameState = 5;
            }
            if (handPc.length < 1) {
                gameState = 3;
            }
            setTimeout(switchGameState, 1000);
            setTimeout(updateHtml, 1000);
        } else {
            drawCard(false);
            gameState = 4;
            setTimeout(switchGameState, 1000);
            setTimeout(updateHtml, 1000);
        }
    }

    if (gameState == 3) {
        if (hand.length < 1) {
            alert("du hast gewonnen!")
        } else {
            setTimeout(lose, 1000)
            gameState = 3;
        }
    }
}

function validateDraw(card: Card): boolean {
    if (card.color == discardPile[discardPile.length - 1].color || card.value == discardPile[discardPile.length - 1].value) {
        console.log("Jaaaa das Klappt");
        return true;
    } else {
        console.log("Also so wird das nix... bitte probier s nochmal mit ner anderen Karte oder zieh eine neue!")
        return false;
    }
}

function getPlayable(cards: Card[]): number {
    for (let i: number = 0; i < cards.length; i++) {
        if (cards[i].color == lastThreeDiscard[2].color) {
            return i;
        }
    }
    for (let i: number = 0; i < cards.length; i++) {
        if (cards[i].value == lastThreeDiscard[2].value) {
            return i;
        }
    }
    return -1;
}

function playCard(card: Card, cards: Card[]) {
    discardPile.push(cards[findCardInArray(card, cards)]);
    checkLastDiscard();
    cards.splice(findCardInArray(card, cards), 1);
    return cards;
}

function findCardInArray(card: Card, cards: Card[]): number {
    for (let i: number = 0; i < cards.length; i++) {
        if (card.color == cards[i].color && card.value == cards[i].value) {
            return i;
        }
    }
    return 4711;
}

function drawCard(player: boolean) {
    if (player) {
        hand.push(cardDeck[cardDeck.length - 1]);
        cardDeck.splice(cardDeck.length - 1, 1);
        if (cardDeck.length < 1) {
            reshuffle();
            checkLastDiscard();
        }
    } else {
        handPc.push(cardDeck[cardDeck.length - 1]);
        cardDeck.splice(cardDeck.length - 1, 1);
        if (cardDeck.length < 1) {
            reshuffle();
            checkLastDiscard();
        }
    }
}

function reshuffle() {
    let tempDeck: Card[] = [];
    cardDeck = tempDeck;
    if (discardPile.length > 3) {
        for (let i: number = 0; i < discardPile.length - 3; i++) {
            tempDeck.push(discardPile[0]);
            discardPile.splice(0, 1);
        }
        cardDeck = shuffle(tempDeck);
    } else {
        console.log("hier werden eindeutig zu viele Karten gehortet... da mach ich nicht mehr mit");
    }
}

function switchGameState() {
    if (gameState != 3) {
        if (gameState == 1 || gameState == 5) {
            gameState = 2;
        } else {
            gameState = 1;
        }
    }
}

function lose() {
    alert("you get nothing, you loose!");
}

function printArray(Cards: Card[]) {
    for (let i: number = 0; i < Cards.length; i++) {
        console.log("Karte: " + Cards[i].value + Cards[i].color);
    }
}

