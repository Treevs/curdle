import {useState} from "react";

function Tile(props) {
    return (
        <div className={`tile ${props.color}`} >
            {props.letter}
        </div>
    );
}

function TileRow(props) {
    const formattedTiles = (guess, answer) => {
        const tileArr = [];
        for(let i=0; i<5; i++) {
            let color = ""
            if(guess[i] === answer[i]) {
                color = "green"
            } else {
                for(let j=0; j<5; j++) {
                    if(guess[i] === answer[j]) {
                        color = "yellow"
                    }
                }
            }
            tileArr.push(
                <Tile key={i} color={color} letter={guess[i]}></Tile>
            )
        }
        return tileArr;
    }
    return (
        <div className="tile-row">
            {formattedTiles(props.word, props.answer).map(function (tile) {
                return tile
            })}
        </div>
    );
}

function Tiles(props) {
    return (
        <div>
            <TileRow answer={props.answer} word={props.guesses[0]}/>
            <TileRow answer={props.answer} word={props.guesses[1]}/>
            <TileRow answer={props.answer} word={props.guesses[2]}/>
            <TileRow answer={props.answer} word={props.guesses[3]}/>
            <TileRow answer={props.answer} word={props.guesses[4]}/>
            <TileRow answer={props.answer} word={props.guesses[5]}/>
        </div>
    )
}

function GameBoard() {
    const [answer, setAnswer] = useState("WORDS");
    const [guesses, setGuesses] = useState(Array(6).fill(""));
    const [guess, setGuess] = useState("")
    const [numOfGuesses, setNumOfGuesses] = useState(0)

    const handleGuessInput = (event) => {
        setGuess(event.target.value.toUpperCase())
    }

    const submitGuess = (e) => {
        e.preventDefault()
        const _guesses = guesses
        _guesses[numOfGuesses] = guess
        setNumOfGuesses(numOfGuesses + 1)
        setGuesses(_guesses)
        setGuess("")
    }
    return (
        <div className="game-board">
            <div className="curdle-title">CURDLE</div>
            <Tiles answer={answer} guesses={guesses}/>
            <form onSubmit={submitGuess} className="guessing">
                <input value={guess} type="text" onChange={handleGuessInput}/>
                <button type="submit">submit</button>
            </form>
        </div>
    );
}

export default GameBoard