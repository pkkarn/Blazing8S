import Card from './Card.js'
import cardMapping from './cardMapping.js';

export default class Player {
    constructor(username) {
        this.username = username;
        this.cards = [];
        this.next = null;
        this.prev = null;
        this.status = 0
        this.init()
       
    }

    ramdomInt(min, max) {
        return Math.floor(Math.random(min)*max) + min
    }

    active() {
        this.status = 1
        setTimeout(() => {
            this.status = 0;
        }, 10000)
    }

    init() {
        for(let i = 0; i < 4; i++) {
            let randomCardCode = this.ramdomInt(1,14);
            let randomCardColorCode = this.ramdomInt(0, 3)

            this.cardPush(randomCardCode, randomCardColorCode)
        }
    }

    cardPush(code, color) {
        let newCard = new Card(code, color)
        this.cards.push(newCard)
    }

    removedCard(index) {
        this.cards = this.cards.filter((i, ind) => ind !== index) // index
    }
}