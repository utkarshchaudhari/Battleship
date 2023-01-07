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
  const player1 = new player('Player', computerGameBoard, false);
  const player2 = new player('Computer', playerGameBoard, true);
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

  for (let i = 5; i > 0; i--) computerGameBoard.placeShip(new ship(i));

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

  computerBoard.childNodes.forEach((child) =>
    child.addEventListener('click', () => {
      const x = child.getAttribute('data-x');
      const y = child.getAttribute('data-y');
      if (child.classList.contains('hit') || child.classList.contains('missed'))
        return;
      if (player1.attack(x, y)) {
        child.classList.add('hit');
        if (computerGameBoard.allshipsSunk()) {
          document.getElementById('modal').classList.add('active');
          document.getElementById('overlay').classList.add('active');
          document.querySelector('.game__status').textContent = 'You Won';
        }
      } else {
        child.classList.add('missed');
      }

      if (player2.attack()) {
        const x = player2.attacks.slice(-1)[0].x;
        const y = player2.attacks.slice(-1)[0].y;
        const elem = [...playerBoard.childNodes].find(
          (child) => child.dataset.x == x && child.dataset.y == y
        );
        elem.classList.add('hit');
        if (playerGameBoard.allshipsSunk()) {
          document.getElementById('modal').classList.add('active');
          document.getElementById('overlay').classList.add('active');
          document.querySelector('.game__status').textContent = 'You Lost';
        }
      } else {
        const x = player2.attacks.slice(-1)[0].x;
        const y = player2.attacks.slice(-1)[0].y;
        const elem = [...playerBoard.childNodes].find(
          (child) => child.dataset.x == x && child.dataset.y == y
        );
        elem.classList.add('missed');
      }
    })
  );
}

setupGrid();
game();

document.querySelector('.play__btn').addEventListener('click', () => {
  document.querySelectorAll('.grid').forEach((grid) => grid.remove());
  setupGrid();
  game();
  document.getElementById('modal').classList.remove('active');
  document.getElementById('overlay').classList.remove('active');
});
