const playerBoard = document.querySelector('.friendly__wrappper .game-board');
const computerBoard = document.querySelector('.enemy__wrapper .game-board');

function setupGrid() {
  for (let i = 0; i < 100; i++) {
    let firstDiv = document.createElement('div');
    let secondDiv = document.createElement('div');
    firstDiv.classList.add('grid');
    secondDiv.classList.add('grid');
    playerBoard.appendChild(firstDiv);
    computerBoard.appendChild(secondDiv);
  }
}

setupGrid();
