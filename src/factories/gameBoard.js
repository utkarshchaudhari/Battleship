export default function gameBoard() {
  const ships = [];
  const missedAttacks = [];
  const placeShip = (ship, x, y) => {
    ship.x = x;
    ship.y = y;
    ships.push(ship);
  };
  const receiveAttack = (x, y) => {
    const shipFound = ships.find((ship) => ship.x === x && ship.y === y);
    shipFound ? ship.hit() : missedAttacks.push({ x: x, y: y });
  };

  const allshipsSunk = () => {
    return ships.every((ship) => ship.isSunk());
  };

  return { ships, missedAttacks, placeShip, receiveAttack, allshipsSunk };
}
