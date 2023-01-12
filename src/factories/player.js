export default function player(name, board, isComputer) {
  const attacks = [];
  const lastAttacks = [];
  const attack = (x, y) => {
    if (isComputer) {
      while (true) {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        if (lastAttacks[lastAttacks.length - 1] === true) {
          x = attacks[attacks.length - 1].x + 1;
          y = attacks[attacks.length - 1].y;
          if (x > 9 || attacks.find((obj) => obj.x == x && obj.y == y)) {
            lastAttacks.push(false);
            continue;
          }
        }
        if (attacks.find((obj) => obj.x == x && obj.y == y)) continue;
        attacks.push({ x: x, y: y });
        const hit = board.receiveAttack(x, y);
        lastAttacks.push(hit);
        return hit;
      }
    }
    return board.receiveAttack(x, y);
  };
  return { name, board, attacks, attack };
}
