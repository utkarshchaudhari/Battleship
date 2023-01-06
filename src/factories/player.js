export default function player(name, board, isComputer) {
  const attacks = [];
  const attack = (x, y) => {
    if (isComputer) {
      while (true) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        if (attacks.find((obj) => obj.x == x && obj.y == y)) continue;
        attacks.push({ x: x, y: y });
        break;
      }
    }
    return board.receiveAttack(x, y);
  };
  return { name, board, attacks, attack };
}
