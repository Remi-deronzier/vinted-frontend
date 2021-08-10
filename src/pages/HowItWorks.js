import { useEffect } from "react";

import SnakeGame from "../Components/SnakeGame";

import "./HowItWorks.css";

const HowItWorks = () => {
  useEffect(() => {
    document.title = "À propos";
  }, []);

  return (
    <div className="easter-egg-container">
      <p className="p-congratulations">Félicitations 🎉!</p>
      <p className="p-congratulations">Tu as trouvé l'Easter Egg</p>
      <div className="game-instructions">
        <p className="game-instructions-headline">
          Pour pouvoir jouer au jeu du serpent, il faut :
        </p>
        <ul>
          <li>- Être sur un ordinateur</li>
          <li>- Être sur un écran dont la largeur fait plus de 992 px</li>
        </ul>
      </div>
      <div className="container-fake-game">
        <div className="fake-game">
          <div className="fake-snake"></div>
          <p>Le jeu du serpent</p>
          <div className="fake-apple"></div>
        </div>
      </div>
      <SnakeGame />
    </div>
  );
};

export default HowItWorks;
