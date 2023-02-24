import { useState, useEffect } from 'react';
import uuid from 'react-uuid';
import './App.css';
import SingleCard from './components/SingleCard';
//create array of cards outside of component - so they don't need to 
//be recreated everytime the component is reevaluated. Plus, they won't change so we don't need to use useState
const cardImages = [
  {"src": "/img/helmet-1.png",  "matched": false },
  {"src": "/img/potion-1.png", "matched": false},
  {"src": "/img/ring-1.png", "matched": false},
  {"src": "/img/scroll-1.png", "matched": false},
  {"src": "/img/shield-1.png", "matched":false },
  {"src": "/img/sword-1.png", "matched": false}
]



function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const shuffleCards = () => {
    //duplicate each card once
    const shuffledCards = [...cardImages, ...cardImages]
    //sort metod - a function for each item in the array, number less than 0 - order of the two items is the smae, more is swapped
    .sort(() => Math.random()- 0.5)
    //function for each item inside new sorted array and add on an id property on each project
    .map((card) => ({...card, id: uuid() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  useEffect(() => {
    shuffleCards();
  }, [])

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true);
        if(choiceOne.src === choiceTwo.src) {
          setCards(prevCards => {
            return prevCards.map((card)=> {
              if(card.src === choiceOne.src) {
                return {...card, matched: true}
              } else {
                return card;
              }
            })
          })
          resetTurns();
        } else {
          setTimeout(() => resetTurns(), 1000 )
        }
  }
}, [choiceOne, choiceTwo]);
console.log(cards);

  //reset turns 
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  return (
    <div className="App">
      <h1>Magic Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card =>(
          <SingleCard 
            key = {uuid()} 
            card = {card}
            handleChoice = {handleChoice}
            flipped = {card === choiceOne || card === choiceTwo || card.matched }
            disabled = {disabled}
            ></SingleCard>
        ))}
      </div>
      <p> Turns: {turns} </p>
    </div>
  );
}

export default App;
