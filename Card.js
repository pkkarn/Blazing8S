import cardMapping from './cardMapping.js'
export default class Card {

    /**
     * 0 - red
     * 1 - blue
     * 2 - yellow
     * 3 - green
     */
    constructor(code, color) {
        this.code = code
        this.value = cardMapping[code];
        this.color = color;
    }
}