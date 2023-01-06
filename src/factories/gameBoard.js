export default function gameBoard() {
  const ships = [];
  const missedAttacks = [];
  const placeShip = (ship, x, y) => {
    ship.x = x;
    ship.y = y;
    ships.push(ship);
  };
  const receiveAttack = (x, y) => {
    const shipFound = ships.find(checkShip);

    function checkShip(ship) {
      let xCord = x;
      if (xCord >= ship.x && xCord < ship.x + ship.length) {
        xCord = ship.x;
      }
      return ship.x == xCord && ship.y == y;
    }

    if (shipFound !== undefined) {
      shipFound.hit();
      return true;
    } else {
      missedAttacks.push({ x: x, y: y });
      return false;
    }
  };

  const allshipsSunk = () => {
    return ships.every((ship) => ship.isSunk());
  };

  return { ships, missedAttacks, placeShip, receiveAttack, allshipsSunk };
}
