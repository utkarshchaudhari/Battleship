import gameBoard from './src/factories/gameBoard.js';
import player from './src/factories/player.js';
import ship from './src/factories/ship.js';
const welcomeBoard = document.querySelector('.welcome_modal .game-board');
const playerBoard = document.querySelector('.friendly__wrappper .game-board');
const computerBoard = document.querySelector('.enemy__wrapper .game-board');

function setupGrid() {
  let j = 0;
  while (j !== 10) {
    for (let i = 0; i < 10; i++) {
      let firstDiv = document.createElement('div');
      let secondDiv = document.createElement('div');
      let thirdDiv = document.createElement('div');
      firstDiv.classList.add('grid');
      firstDiv.setAttribute('data-x', `${i}`);
      firstDiv.setAttribute('data-y', `${j}`);
      secondDiv.classList.add('grid');
      secondDiv.setAttribute('data-x', `${i}`);
      secondDiv.setAttribute('data-y', `${j}`);
      thirdDiv.classList.add('grid');
      thirdDiv.setAttribute('data-x', `${i}`);
      thirdDiv.setAttribute('data-y', `${j}`);
      playerBoard.appendChild(firstDiv);
      computerBoard.appendChild(secondDiv);
      welcomeBoard.appendChild(thirdDiv);
    }
    j++;
  }
}

function game() {
  const playerGameBoard = new gameBoard();
  const computerGameBoard = new gameBoard();
  const player1 = new player('Player', computerGameBoard, false);
  const player2 = new player('Computer', playerGameBoard, true);

  const welcomeGrid = [
    ...document.querySelector('.welcome.game-board').childNodes,
  ];

  let j = 5;
  const placedShips = [];
  welcomeGrid.forEach((grid) => {
    grid.addEventListener('mouseover', () => {
      let x = grid.dataset.x;
      let y = grid.dataset.y;
      const index = welcomeGrid.indexOf(grid);
      if (Number(x) + j > 10) return;
      const shipGrids = welcomeGrid.slice(index, index + j);
      shipGrids.forEach((grid) => grid.classList.add('green'));
      grid.addEventListener('mouseout', () => {
        shipGrids.forEach((grid) => grid.classList.remove('green'));
      });
      grid.addEventListener('click', () => {
        if (j <= 0) return;
        if (shipGrids.some((grid) => placedShips.includes(grid))) return;

        playerGameBoard.placeShip(new ship(j), Number(x), Number(y));
        shipGrids.forEach((grid) => grid.classList.add('active'));
        playerGameBoard.ships.forEach((ship) =>
          showShip(ship, [...playerBoard.childNodes])
        );
        if (j == 1) {
          document.getElementById('welcome_modal').classList.add('inactive');
          document.getElementById('overlay').classList.remove('active');
        }
        placedShips.push(...shipGrids);
        if (Number(x) + j == 10)
          placedShips.push(...welcomeGrid.slice(index - 1, index));
        if (Number(x) + j <= 10 && Number(x) != 0) {
          placedShips.push(...welcomeGrid.slice(index - 1, index));
          placedShips.push(...welcomeGrid.slice(index + j, index + j + 1));
        }
        if (Number(x) == 0) {
          placedShips.push(...welcomeGrid.slice(index + j, index + j + 1));
        }
        j--;
      });
    });
  });

  for (let i = 5; i > 0; i--) computerGameBoard.placeShip(new ship(i));
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
  document.getElementById('welcome_modal').classList.remove('inactive');
});
