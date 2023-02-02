import Player from './Player.js'
import Card from './Card.js'

/**
This code is the implementation of the BlazingBoard class in JavaScript. The class is used to represent a BlazingBoard game,
where players can play with cards. The class uses two other classes, Player and Card, to handle the players and the cards.
**/
class BlazingBoard {
    constructor(players) {
        // this is the first player in the linked list of players
        this.firstPlayer = null; // 0 <-> 1 -> 2 - 3 next = null
        // this is the last player in the linked list of players
        this.lastPlayer = null;
        //  this is the current player that is playing
        this.activePlayer = null;
        // this determines the direction of the next move
        this.moveType = 'next'
        
        //this is the current card that is in play
        this.activeCard = new Card(this.randomInt(1,14), this.randomInt(0,4));
        this.initPlayers(players);
    }

    // eturns a random number between min and max
    randomInt(min, max) {
        return Math.floor(Math.random(min)*max) + min
    }
    
    
    // swaps cards between two players
    swapCards(firstPlayer, secondPlayer) {
        let cardFirst = firstPlayer.cards;
        let cardSecond = secondPlayer.cards;
        secondPlayer.cards = cardFirst
        firstPlayer.cards = cardSecond
    }

    // adds one card to all players except the active player
    addOneCardToOthers() {
        let currPlayer = this.firstPlayer

        while(currPlayer) {
            if(currPlayer.username !== this.activePlayer.username) {
                let code = this.randomInt(1,13)
                let color = this.randomInt(0,4)
                currPlayer.cardPush(code, color)
            }
            currPlayer = currPlayer.next;
        }
    }

    // moves to the next player
    pass() {
        this.nextMove()
    }

    //  fetches a random card for the active player
    fetchCard() {
        let code = this.randomInt(1,14)
        let color = this.randomInt(0,4)
        this.activePlayer.cardPush(code, color)
    }
    
    // sets the current card in play and performs the necessary actions depending on the card
    setCard(card, pos, choice) {
        // reverse Card
        if(card.code === 14) {
            this.activeCard = card;
            // reverse and swap card with next person
            this.activePlayer.removedCard(pos)
            this.swapCards(this.activePlayer, this.nextPlayer())
            this.nextMove()
            return;
        }

        if(card.code === 8) {
            this.activePlayer.removedCard(pos)
            let card = new Card(8, choice)
            this.activeCard = card;
            this.nextMove()
            return;
        }

        // if(card.code === 8) {
        //     this.activeCard = card;
        //     return;
        // } // define card to choose
        // if card color is same or code is same;
        if((card.color === this.activeCard.color) || (card.code === this.activeCard.code)) {
            this.activeCard = card;
            // Remove card if its shuffled
            this.activePlayer.removedCard(pos)

            // Skip one player in current direction
            if(card.code === 11) {
                this.nextMove()
            }

            // change direction
            if(card.code === 12) {
                this.moveType = 'prev'
            }


            if(card.code === 13) {
                this.addOneCardToOthers()
                // this.pushCardInsideEveryoneExceptActive Player
            } 

            this.nextMove()
        }
    }

    
    // initializes the players in the linked list
    initPlayers(players) {
        players.forEach(player => {
            this.addPlayer(player);
        })
    }

    // adds a player to the linked list of players
    addPlayer(player) {
        let newPlayer = new Player(player);
        if(!this.firstPlayer) {
            this.firstPlayer = newPlayer;
            this.lastPlayer = newPlayer;

            this.status = 1

            this.activePlayer = this.firstPlayer
        } else {
            newPlayer.prev = this.lastPlayer
            this.lastPlayer.next = newPlayer;
            this.lastPlayer = newPlayer;
        }
    }

    // returns a player by the username
    getPlayer(username) {
        if(this.firstPlayer.username === username) return this.firstPlayer
        if(this.lastPlayer.username === username) return this.lastPlayer

        let curr = this.firstPlayer;

        while(curr.next) {
            if(curr.username === username) return curr;
            curr = curr.next
        }

        return null
    }

    
    // returns the next player in the linked list
    nextPlayer() {
        let nextPlayer = null
        if(this.moveType === 'next') {
            if(this.activePlayer.next) {
                nextPlayer = this.activePlayer.next
            } else {
                nextPlayer = this.firstPlayer
            }
        } else if(this.moveType === 'prev') {
            if(this.activePlayer.prev) {
                nextPlayer = this.activePlayer.prev;
            } else {
                nextPlayer = this.lastPlayer
            }
        }

        return nextPlayer
    }

    // sets the next player as the active player
    nextMove() {
        this.activePlayer.status = 0;
        this.activePlayer = this.nextPlayer()
        this.activePlayer.status = 1
    }


    /**
     * - deckFetch Card;
     * - cardRemove from Player List
     * - Special Card Handling
     * - Reverse move enable
     */
}

export default BlazingBoard
