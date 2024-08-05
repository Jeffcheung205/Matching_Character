window.initGame = (React, assetsUrl) => {
  const { useState } = React;

  const MatchingCharacter = ({ assetsUrl }) => {
    const initialCharacters = [
      { id: 1, src: `${assetsUrl}/Pikachiu.png` },
      { id: 1, src: `${assetsUrl}/Pikachiu.png` },
      { id: 2, src: `${assetsUrl}/Squirtle.png` },
      { id: 2, src: `${assetsUrl}/Squirtle.png` },
      { id: 3, src: `${assetsUrl}/Bulbasaur.png` },
      { id: 3, src: `${assetsUrl}/Bulbasaur.png` },
    ];
    
    const [characters, setCharacters] = useState(initialCharacters);
    const [flippedCards, setFlippedCards] = useState(Array(initialCharacters.length).fill(false));
    const [firstCardIndex, setFirstCardIndex] = useState(null);
    const [canFlip, setCanFlip] = useState(true);
    const [score, setScore] = useState(0);

  
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const handleCardClick = (index) => {
      if (!canFlip || flippedCards[index]) return;

      const newFlippedCards = [...flippedCards];
      newFlippedCards[index] = true; 
      setFlippedCards(newFlippedCards);

      if (firstCardIndex === null) {
        setFirstCardIndex(index);
      } else {
        setCanFlip(false);
        if (characters[firstCardIndex].id === characters[index].id) {
          setScore(score + 1);
          setFirstCardIndex(null);
          setCanFlip(true);
  
          if (score + 1 === initialCharacters.length) {
            alert("All Cards sucessfully matched!");
            const shuffledCharacters = shuffleArray([...initialCharacters]);
            setCharacters(shuffledCharacters);
            setFlippedCards(Array(initialCharacters.length).fill(false));
            setScore(0);
          }
        } else {
          setTimeout(() => {
            newFlippedCards[firstCardIndex] = false;
            newFlippedCards[index] = false;
            setFlippedCards(newFlippedCards);
            setFirstCardIndex(null);
            setCanFlip(true);
          }, 1000);
        }
      }
    };

    return React.createElement(
      'div',
      { className: "matching-character" },
      React.createElement('h2', null, "Matching Character Game"),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement(
        'div',
        { className: "game-board" },
        characters.map((character, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: `character ${flippedCards[index] ? 'flipped' : ''}`,
              onClick: () => handleCardClick(index)
            },
            React.createElement('div', { className: 'card' }, 
              React.createElement('div', { className: 'card-inner' },
                React.createElement('div', { className: 'card-front' }, "?"),
                React.createElement('div', { className: 'card-back' },
                  React.createElement('img', { src: character.src, alt: "Character" })
                )
              )
            )
          )
        )
      )
    );
  };

  return () => React.createElement(MatchingCharacter, { assetsUrl: assetsUrl });
};

console.log('Matching Character game script loaded');



