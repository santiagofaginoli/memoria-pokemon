import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

// array of card images
const cardImages = [
  { src: "/img/1.jpg", matched: false },
  { src: "/img/2.jpg", matched: false },
  { src: "/img/3.jpg", matched: false },
  { src: "/img/4.jpg", matched: false },
  { src: "/img/5.jpg", matched: false },
  { src: "/img/6.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [contador, setContador] = useState(Number(0));

  const [isActive, setIsActive] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  useEffect(() => {
    let interval = null;
  
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);
  
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };
  
  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };
  const handleReset = () => {
    console.log("paso")
    setTime(0);
  };





  // shuffle cards, duplicate cards to get set of 12, assign random ID to each
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] // 2 lots of card images
      .sort(() => Math.random() - 0.5) // shuffled array
      .map((card) => ({ ...card, id: Math.random() })); // add on random ID number to each card

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    handleReset()

  };

  // handle a user choice, update choice one or two
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    setIsPaused(false)
     // if choiceOne is null (is false), update with setChoiceOne, else update choiceTwo with setChoiceTwo
  };

  // reset game automagically
  useEffect(() => {
    shuffleCards();
  }, []);


  // compare two selected cards
  useEffect(() => {
    
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setContador((prevContador) => Number(prevContador) + 1);
        if (contador ===5) {
          setIsPaused(true)
        }
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices and increase number of turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <div><h1>Hecho por Luciano Vacarini y Lucio Aparicio</h1></div>
      <div style={{justifyContent:"center",display:"flex",marginTop:"10px"}}>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            cardFlipped={
              card === choiceOne || card === choiceTwo || card.matched
            }
            disabled={disabled}
          />
        ))}
      </div>
      <div>
      </div>
    </div>
  );
}

export default App;
