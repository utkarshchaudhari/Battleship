import gameBoard from './src/factories/gameBoard.js';
import player from './src/factories/player.js';
import ship from './src/factories/ship.js';
const playerBoard = document.querySelector('.friendly__wrappper .game-board');
const computerBoard = document.querySelector('.enemy__wrapper .game-board');

function setupGrid() {
  let j = 0;
  while (j !== 10) {
    for (let i = 0; i < 10; i++) {
      let firstDiv = document.createElement('div');
      let secondDiv = document.createElement('div');
      firstDiv.classList.add('grid');
      firstDiv.setAttribute('data-x', `${i}`);
      firstDiv.setAttribute('data-y', `${j}`);
      secondDiv.classList.add('grid');
      secondDiv.setAttribute('data-x', `${i}`);
      secondDiv.setAttribute('data-y', `${j}`);
      playerBoard.appendChild(firstDiv);
      computerBoard.appendChild(secondDiv);
    }
    j++;
  }
}

function game() {
  const playerGameBoard = new gameBoard();
  const computerGameBoard = new gameBoard();
  const pShip5 = new ship(5);
  const pShip4 = new ship(4);
  const pShip3 = new ship(3);
  const pShip2 = new ship(2);
  const pShip1 = new ship(1);
  playerGameBoard.placeShip(pShip1, 0, 0);
  playerGameBoard.placeShip(pShip2, 3, 3);
  playerGameBoard.placeShip(pShip3, 7, 9);
  playerGameBoard.placeShip(pShip4, 4, 6);
  playerGameBoard.placeShip(pShip5, 2, 1);
  const cShip5 = new ship(5);
  const cShip4 = new ship(4);
  const cShip3 = new ship(3);
  const cShip2 = new ship(2);
  const cShip1 = new ship(1);
  computerGameBoard.placeShip(cShip1, 0, 0);
  computerGameBoard.placeShip(cShip2, 3, 3);
  computerGameBoard.placeShip(cShip3, 7, 9);
  computerGameBoard.placeShip(cShip4, 4, 6);
  computerGameBoard.placeShip(cShip5, 2, 1);

  playerGameBoard.ships.forEach((ship) =>
    showShip(ship, [...playerBoard.childNodes])
  );
  computerGameBoard.ships.forEach((ship) =>
    showShip(ship, [...computerBoard.childNodes])
  );

  function showShip(ship, nodes) {
    let x = ship.x;
    const y = ship.y;

    for (let i = 0; i < ship.length; i++) {
      const element = nodes.find(
        (child) => child.dataset.x == x && child.dataset.y == y
      );
      element.classList.add('active');
      x++;
    }
  }
}

setupGrid();
game();
