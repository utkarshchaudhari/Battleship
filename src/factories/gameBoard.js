export default function gameBoard() {
  const ships = [];
  const missedAttacks = [];
  const undefinedCoord = [];
  const placeShip = (ship, x, y) => {
    if (x === undefined && y === undefined) {
      while (true) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        if (undefinedCoord.find((obj) => obj.x == x && obj.y == y)) continue;
        undefinedCoord.push({ x: x, y: y });
        break;
      }
    }
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
