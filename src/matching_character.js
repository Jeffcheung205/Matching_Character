// This would be stored in the 'src' folder of the GitHub repository
// matching_character.js
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const MatchingCharacter = ({ assetsUrl }) => {
    const [characters] = useState([
      { id: 1, src: `${assetsUrl}/Pikachiu.png` },
      { id: 2, src: `${assetsUrl}/Squirtle.png` },
      { id: 1, src: `${assetsUrl}/Pikachiu.png` }, // Duplicate for matching
      { id: 2, src: `${assetsUrl}/Squirtle.png` }, // Duplicate for matching
      { id: 3, src: `${assetsUrl}/Bulbasaur.png` },
      { id: 3, src: `${assetsUrl}/Bulbasaur.png` }, // Duplicate for matching
    ]);
    
    const [flippedCards, setFlippedCards] = useState(Array(6).fill(false)); // Changed to 6 to match the characters
    const [firstCardIndex, setFirstCardIndex] = useState(null);
    const [score, setScore] = useState(0);

    const handleCardClick = (index) => {
      if (flippedCards[index] || firstCardIndex !== null) return;

      const newFlippedCards = [...flippedCards];
      newFlippedCards[index] = true; // Fix here
      setFlippedCards(newFlippedCards);

      if (firstCardIndex === null) {
        setFirstCardIndex(index);
      } else {
        if (characters[firstCardIndex].id === characters[index].id) {
          setScore(score + 1);
        } else {
          setTimeout(() => {
            newFlippedCards[firstCardIndex] = false;
            newFlippedCards[index] = false;
            setFlippedCards(newFlippedCards);
          }, 1000);
        }
        setFirstCardIndex(null);
      }
    };

    return React.createElement(
      'div',
      { className: "matching-character" },
      React.createElement('h2', null, "Matching Character Game"),
      React.createElement(
        'div',
        { className: "game-board" },
        characters.map((character, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: "character",
              onClick: () => handleCardClick(index)
            },
            flippedCards[index] && React.createElement('img', { src: character.src, alt: "Character" })
          )
        )
      )
    );
  };

  return () => React.createElement(MatchingCharacter, { assetsUrl: assetsUrl });
};

console.log('Matching Character game script loaded');
