// This would be stored in the 'src' folder of the GitHub repository
// whack-a-mole.js
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

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
    
    const [flipCards, setFlipCards] = useState(Array(10).fill(false));
    const [firstCardIndex, setFirstCardIndex] = useState(null);
    const [score, setScore] = useState(0);

    const handleCardClick = (index) => {
      if (flippedCards[index] || firstCardIndex !== null) return;

      const newFlipCards = [...flipCards];
      newFlippedCards[index] = true;
      setFlippedCards(newFlipCards);

      if (firstCardIndex === null) {
        setFirstCardIndex(index);
      } else {
        if (characters[firstCardIndex].id === characters[index].id) {
          setScore(score + 1);
        } else {
          setTimeout(() => {
            newFlipCards[firstCardIndex] = false;
            newFlipCards[index] = false;
            setFlipCards(newFlipCards);
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
            flippedCards[index] && React.createElement('img', { src: character.src, alt: "Character" })
          )
        )
      )
    );
  };

  return () => React.createElement(MatchingCharacter, { assetsUrl: assetsUrl });
};

console.log('Matching Character game script loaded');
