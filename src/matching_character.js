window.initGame = (React, assetsUrl) => {
  const { useState } = React;

  // Check if MatchingCharacter is already defined
  if (typeof MatchingCharacter === 'undefined') {
    const MatchingCharacter = ({ assetsUrl }) => {
      const assets = [
        { id: 1, src: `${assetsUrl}/Pikachiu.png` },
        { id: 2, src: `${assetsUrl}/Squirtle.png` },
        { id: 3, src: `${assetsUrl}/Bulbasaur.png` },
        { id: 4, src: `${assetsUrl}/Charmander.png` },
        { id: 5, src: `${assetsUrl}/Pokeball.png` },
      ];

      // Create pairs and shuffle
      const createGameBoard = () => {
        const pairs = assets.flatMap(asset => [asset, asset]);
        while (pairs.length < 10) {
          pairs.push(assets[Math.floor(Math.random() * assets.length)]);
        }
        return shuffleArray(pairs);
      };

      const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };

      // Initialize the matching game
      const [characters, setCharacters] = useState(createGameBoard());
      const [flippedCards, setFlippedCards] = useState(Array(10).fill(false));
      const [firstCardIndex, setFirstCardIndex] = useState(null);
      const [canFlip, setCanFlip] = useState(true);
      const [message, setMessage] = useState("");

      const handleCardClick = (index) => {
        // Your existing handleCardClick logic here...
      };

      return React.createElement(
        'div',
        { className: "matching-character" },
        React.createElement('h2', null, "Matching Character Game"),
        message && React.createElement('p', { className: "success-message" }, message),
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
  } else {
    console.warn("MatchingCharacter is already defined");
  }
};

console.log('Matching Character game script loaded');
