import React, {Component} from 'react';
import GameSquare from './gameSquare';
import Timer from './timer';

let colorArray = 'square-0, square-1, square-2, square-3, square-4, square-5, square-6, square-7, square-8, square-9';
const arrCopy = colorArray.slice();

colorArray = colorArray.toLowerCase().split(', ');

let chanceCount = 0;

class Game extends Component {
    constructor(){
        super();

        this.restart = this.restart.bind(this);
        this.resetTime = null;

        this.checkMatch = this.checkMatch.bind(this);

        this.state = this.cleanState();

        this.state.deck = this.shuffleDeck();

        setInterval(() => {
            this.restart();
        }, 300000);
    }

    cleanState() {
        return {
            deck: this.shuffleDeck(),
            pairsA: [],
            pairsB: [],
            moves: 0,
            selected: [],
            endMsg: 'Card Memory Game',
            start: Date.now()
        };
    }

    gameBoard () {
        return (
            <div id='gameBoard'> {
                this.state.deck.map((card, i) => {
                    return (
                        <GameSquare
                            className={card}
                            handleClick={this.clickHandler.bind(this, i)}
                            index={i}
                            id={i}
                            isSelected={this.state.selected.includes(i)}
                            key={i}
                            didMatch={this.state.pairsA.includes(i) || this.state.pairsB.includes(i)}
                        />
                    )
                }, this)
            }
            </div>
        )
    }

    clickHandler(cid) {
        if(this.state.selected.includes(cid) || this.resetTime) {
            return;
        }

        if(this.state.selected.length >= 1) {
            this.resetTime = setTimeout(() => {
                this.checkMatch();
            }, 1500);
        }

        this.state.selected.push(cid);

        this.setState({
            selected: this.state.selected
        })
    }

    checkMatch() {
        chanceCount++;
        let moves = this.state.moves;
        let pairsA = this.state.pairsA;
        let pairsB = this.state.pairsB;

        const matchSelected = this.state.selected.map((id) => {
            return this.state.deck[id];
        });

        if(matchSelected[0] === matchSelected[1]) {
            if(chanceCount%2){
                pairsA = pairsA.concat(this.state.selected);
            } else {
                pairsB = pairsB.concat(this.state.selected);
            }

        }

        this.setState({
            selected: [],
            moves,
            pairsA,
            pairsB
        });

        this.resetTime = null;

        if((this.state.pairsA.length + this.state.pairsB.length) === 16) {
            const winner = (this.state.pairsA.length > this.state.pairsB.length) ? 'Player 1' : 'Player 2';
            this.setState({
                endMsg: `You got them all!! ${winner} is the winner!!`
            });
        }
    }

    render(){
        const gameboard = this.gameBoard();
        let playerA;
        let playerB;
        if((this.state.pairsA.length + this.state.pairsB.length) !== 16) {
            playerA = (chanceCount%2) ? '' : 'blink_me';
            playerB = (chanceCount%2) ? 'blink_me' : '';
        }

        return (
            <div>
                <div className='endMsg'>{ this.state.endMsg }</div>
                <div className='control-panel'>
                    <div className='score'>
                        <span className={playerA}>Player 1 - {this.state.pairsA.length / 2}</span>
                    </div>
                    <div className='score'>
                        <span className={playerB}>Player 2 - {this.state.pairsB.length / 2}</span>
                    </div>
                    <div className='score control-panel__pointer'>
                        <span onClick={this.restart}>Reset</span>
                    </div>
                    <div className='score'>
                        <span><Timer start={this.state.start}/></span>
                    </div>
                </div>
                {gameboard}
            </div>
        );
    }

    pickCards() {
        const deck = [];
        let colorArrayCopy = colorArray.slice();
        let i = 0;

        while (i < 8) {
            let j = 0;
            const randomNumber = this.randomNumber(colorArrayCopy);
            const newCard = colorArrayCopy.splice(randomNumber, 1)[0];

            while (j < 2) {
                deck.push(newCard);
                j++;
            }
            i++;
        }
        return deck;
    }

    shuffleDeck() {
        let deck = this.pickCards();

        for(let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const tempVal = deck[i];
            deck[i] = deck[j];
            deck[j] = tempVal;
        }
        return deck;
    }

    randomNumber(arr) {
        const ourArray = arr;
        const min = 0;
        const max = ourArray.length - 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    restart() {
        this.setState(this.cleanState());
    }
}

export default Game;